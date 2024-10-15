use hc_zome_profiles_integrity::*;
use hdk::prelude::*;

/// From a nickname filter of at least 3 characters, returns all the profiles whose nickname starts with that prefix
/// Ignores the nickname case, will return upper or lower case nicknames that match
#[hdk_extern]
pub fn search_profiles(nickname_filter: String) -> ExternResult<Vec<ActionHash>> {
    if nickname_filter.len() < 3 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot search with a prefix less than 3 characters".into(),
        )));
    }

    let prefix_path = prefix_path(nickname_filter.clone())?;
    let links = get_links(
        GetLinksInputBuilder::try_new(
            prefix_path.path_entry_hash()?,
            LinkTypes::PathToProfile.try_into_filter()?,
        )?
        .tag_prefix(LinkTag::new(
            nickname_filter.to_lowercase().as_bytes().to_vec(),
        ))
        .build(),
    )?;

    let action_hashes = links
        .into_iter()
        .filter_map(|link| link.target.into_action_hash())
        .collect();

    Ok(action_hashes)
}

/// Returns the links targeting the profiles for the given agent, must be one or 0
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKey) -> ExternResult<Vec<Link>> {
    get_links(
        GetLinksInputBuilder::try_new(agent_pub_key, LinkTypes::AgentToProfile.try_into_filter()?)?
            .build(),
    )
}

/// Gets all the agents that have created a profile in this DHT.
#[hdk_extern]
pub fn get_all_profiles(_: ()) -> ExternResult<Vec<Link>> {
    let path = Path::from("all_profiles").typed(LinkTypes::PrefixPath)?;

    let children = path.children_paths()?;

    let get_links_input: Vec<GetLinksInput> = children
        .into_iter()
        .map(|path| {
            Ok(GetLinksInputBuilder::try_new(
                path.path_entry_hash()?,
                LinkTypes::PathToProfile.try_into_filter()?,
            )?
            .build())
        })
        .collect::<ExternResult<Vec<GetLinksInput>>>()?;

    let links = HDK
        .with(|h| h.borrow().get_links(get_links_input))?
        .into_iter()
        .flatten()
        .collect::<Vec<Link>>();

    Ok(links)
}

/** Helpers*/

pub fn prefix_path(nickname: String) -> ExternResult<TypedPath> {
    // conver to lowercase for path for ease of search
    let lower_nickname = nickname.to_lowercase();
    let prefix: String = lower_nickname.chars().take(3).collect();

    Path::from(format!("all_profiles.{}", prefix)).typed(LinkTypes::PrefixPath)
}
