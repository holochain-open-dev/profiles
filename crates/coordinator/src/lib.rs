//! ## hc_zome_profiles_coordinator
//!
//! Profiles zome for any Holochain app.
//!
//! If you need to manage profiles (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome and its integrity counterpart "hc_zome_profiles_integrity" in your DNA.
//!
//! Read about how to include both this zome and its frontend module in your application [here](https://holochain-open-dev.github.io/profiles).

use hdk::prelude::*;

use hc_zome_profiles_integrity::*;

/// Creates the profile for the agent executing this call.
#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<Record> {
    let agent_info = agent_info()?;

    let action_hash = create_entry(EntryTypes::Profile(profile.clone()))?;

    let path = prefix_path(profile.nickname.clone())?;

    path.ensure()?;

    let agent_address = agent_info.agent_initial_pubkey.clone();

    create_link(
        path.path_entry_hash()?,
        agent_address.clone(),
        LinkTypes::PathToAgent,
        LinkTag::new(profile.nickname.to_lowercase().as_bytes().to_vec()),
    )?;
    create_link(
        agent_address,
        action_hash.clone(),
        LinkTypes::AgentToProfile,
        (),
    )?;

    let record = get(action_hash, GetOptions::default())?
        .ok_or(wasm_error!(WasmErrorInner::Guest("Unreachable".into())))?;

    Ok(record)
}

/// Updates the profile for the agent executing this call.
#[hdk_extern]
pub fn update_profile(profile: Profile) -> ExternResult<Record> {
    let previous_profile_record = crate::get_agent_profile(agent_info()?.agent_latest_pubkey)?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "I haven't created a profile yet".into(),
        )))?;

    let action_hash = update_entry(previous_profile_record.action_address().clone(), &profile)?;
    let my_pub_key = agent_info()?.agent_latest_pubkey;

    // If we have changed the nickname, remove the previous nickname link and add a new one
    let previous_profile: Profile = previous_profile_record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Previous profile is malformed".to_string()
        )))?;
    if previous_profile.nickname.ne(&profile.nickname) {
        let previous_prefix_path = prefix_path(previous_profile.nickname)?;
        let links = get_links(
            previous_prefix_path.path_entry_hash()?,
            LinkTypes::PathToAgent,
            None,
        )?;

        for l in links {
            if my_pub_key.eq(&AgentPubKey::from(EntryHash::from(l.target))) {
                delete_link(l.create_link_hash)?;
            }
        }

        let path = prefix_path(profile.nickname.clone())?;

        path.ensure()?;

        create_link(
            path.path_entry_hash()?,
            my_pub_key,
            LinkTypes::PathToAgent,
            LinkTag::new(profile.nickname.to_lowercase().as_bytes().to_vec()),
        )?;
    }

    let record = get(action_hash, GetOptions::default())?
        .ok_or(wasm_error!(WasmErrorInner::Guest("Unreachable".into())))?;

    Ok(record)
}

/// Input for the `search_agents` zome function.
///
/// The nickname prefix must be of at least 3 characters.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchProfilesInput {
    pub nickname_filter: String,
}
/// From a search input of at least 3 characters, returns all the agents whose nickname starts with that prefix.
#[hdk_extern]
pub fn search_agents(search_profiles_input: SearchProfilesInput) -> ExternResult<Vec<AgentPubKey>> {
    if search_profiles_input.nickname_filter.len() < 3 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot search with a prefix less than 3 characters".into(),
        )));
    }

    let prefix_path = prefix_path(search_profiles_input.nickname_filter.clone())?;
    let links = get_links(
        prefix_path.path_entry_hash()?,
        LinkTypes::PathToAgent,
        Some(LinkTag::new(
            search_profiles_input
                .nickname_filter
                .to_lowercase()
                .as_bytes()
                .to_vec(),
        )),
    )?;

    let agents = links
        .into_iter()
        .map(|l| AgentPubKey::from(EntryHash::from(l.target)))
        .collect();

    Ok(agents)
}

/// Returns the profile for the given agent, if they have created it.
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKey) -> ExternResult<Option<Record>> {
    let links = get_links(agent_pub_key, LinkTypes::AgentToProfile, None)?;

    if links.len() == 0 {
        return Ok(None);
    }

    let link = links[0].clone();

    let profile = get_latest(link.target.into())?;

    Ok(Some(profile))
}

fn get_latest(action_hash: ActionHash) -> ExternResult<Record> {
    let details = get_details(action_hash, GetOptions::default())?.ok_or(wasm_error!(
        WasmErrorInner::Guest("Profile not found".into())
    ))?;

    match details {
        Details::Entry(_) => Err(wasm_error!(WasmErrorInner::Guest(
            "Malformed details".into()
        ))),
        Details::Record(element_details) => match element_details.updates.last() {
            Some(update) => get_latest(update.action_address().clone()),
            None => Ok(element_details.record),
        },
    }
}

/// Gets all the profiles that have been created in the network.
///
/// Careful! This will not be very performant in large networks.
/// In the future a cursor type functionality will be added to make this function performant.
#[hdk_extern]
pub fn get_all_agents(_: ()) -> ExternResult<Vec<AgentPubKey>> {
    let path = Path::from("all_profiles").typed(LinkTypes::PrefixPath)?;

    let children = path.children_paths()?;

    let get_links_input: Vec<GetLinksInput> = children
        .into_iter()
        .map(|path| {
            Ok(GetLinksInput::new(
                path.path_entry_hash()?.into(),
                LinkTypes::PathToAgent.try_into_filter()?,
                None,
            ))
        })
        .collect::<ExternResult<Vec<GetLinksInput>>>()?;

    let links = HDK
        .with(|h| h.borrow().get_links(get_links_input))?
        .into_iter()
        .flatten()
        .collect::<Vec<Link>>();

    let agents = links
        .into_iter()
        .map(|l| AgentPubKey::from(EntryHash::from(l.target)))
        .collect();

    Ok(agents)
}

/** Helpers*/

fn prefix_path(nickname: String) -> ExternResult<TypedPath> {
    // conver to lowercase for path for ease of search
    let lower_nickname = nickname.to_lowercase();
    let (prefix, _) = lower_nickname.as_str().split_at(3);

    Path::from(format!("all_profiles.{}", prefix)).typed(LinkTypes::PrefixPath)
}
