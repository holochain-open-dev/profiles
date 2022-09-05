use hc_zome_profiles_integrity_types::*;
use hc_zome_profiles_integrity::*;
use hdk::{hash_path::path::TypedPath, prelude::*};

pub fn create_profile(profile: Profile) -> ExternResult<Record> {
    let agent_info = agent_info()?;

    let action_hash = create_entry(EntryTypes::Profile(profile.clone()))?;

    let path = prefix_path(profile.nickname.clone())?;

    path.ensure()?;

    let agent_address = agent_info.agent_initial_pubkey.clone();

    create_link(
        path.path_entry_hash()?,
        action_hash.clone(),
        LinkTypes::PathToProfile,
        profile.nickname.as_bytes().to_vec(),
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

pub fn update_profile(profile: Profile) -> ExternResult<Record> {
    let my_profile = crate::get_my_profile(())?.ok_or(wasm_error!(WasmErrorInner::Guest(
        "I haven't created a profile yet".into(),
    )))?;

    let action_hash = update_entry(my_profile.action_address().clone(), &profile)?;

    let path = prefix_path(profile.nickname.clone())?;

    path.ensure()?;

    let record = get(action_hash, GetOptions::default())?
        .ok_or(wasm_error!(WasmErrorInner::Guest("Unreachable".into())))?;

    Ok(record)
}

pub fn get_my_profile(_: ()) -> ExternResult<Option<Record>> {
    let profile_entry_type: EntryType = UnitEntryTypes::Profile.try_into()?;
    let filter = ChainQueryFilter::new()
        .entry_type(profile_entry_type)
        .include_entries(true);
    let all_my_profiles = query(filter)?;

    match all_my_profiles.last() {
        Some(record) => Ok(Some(record.to_owned())),
        None => Ok(None)
    }
}

pub fn search_profiles(nickname_prefix: String) -> ExternResult<Vec<Record>> {
    if nickname_prefix.len() < 3 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot search with a prefix less than 3 characters".into(),
        )));
    }

    let prefix_path = prefix_path(nickname_prefix)?;

    get_agent_profiles_for_path(prefix_path.path_entry_hash()?)
}

pub fn get_all_profiles() -> ExternResult<Vec<Record>> {
    let path = Path::from("all_profiles").typed(LinkTypes::PrefixPath)?;

    let children = path.children_paths()?;

    let get_links_input: Vec<GetLinksInput> = children
        .into_iter()
        .map(|path| {
            Ok(GetLinksInput::new(
                path.path_entry_hash()?.into(),
                LinkTypes::PathToProfile.try_into_filter()?,
                None,
            ))
        })
        .collect::<ExternResult<Vec<GetLinksInput>>>()?;

    let links = HDK
        .with(|h| h.borrow().get_links(get_links_input))?
        .into_iter()
        .flatten()
        .collect::<Vec<Link>>();

    let profiles = links
        .into_iter()
        .map(|link| get_latest(link.target.into()))
        .collect::<ExternResult<Vec<Record>>>()?;

    Ok(profiles)
}

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

pub fn get_agents_profiles(agent_pub_keys: Vec<AgentPubKey>) -> ExternResult<Vec<Record>> {
    let get_links_input: Vec<GetLinksInput> = agent_pub_keys
        .into_iter()
        .map(|agent_pub_key| {
            Ok(GetLinksInput::new(
                agent_pub_key.into(),
                LinkTypes::AgentToProfile.try_into_filter()?,
                None,
            ))
        })
        .collect::<ExternResult<Vec<GetLinksInput>>>()?;

    let links = HDK
        .with(|h| h.borrow().get_links(get_links_input))?
        .into_iter()
        .flatten()
        .collect::<Vec<Link>>();

    let profiles = links
        .into_iter()
        .map(|link| get_latest(link.target.into()))
        .collect::<ExternResult<Vec<Record>>>()?;

    Ok(profiles)
}

/** Private helpers */

fn prefix_path(nickname: String) -> ExternResult<TypedPath> {
    // conver to lowercase for path for ease of search
    let lower_nickname = nickname.to_lowercase();
    let (prefix, _) = lower_nickname.as_str().split_at(3);

    Path::from(format!("all_profiles.{}", prefix)).typed(LinkTypes::PrefixPath)
}

fn get_agent_profiles_for_path(path_hash: EntryHash) -> ExternResult<Vec<Record>> {
    let links = get_links(path_hash, LinkTypes::PathToProfile, None)?;

    let records = links
        .into_iter()
        .map(|link| get_latest(link.target.into()))
        .collect::<ExternResult<Vec<Record>>>()?;

    Ok(records)
}
