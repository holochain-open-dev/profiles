use hc_zome_profiles_integrity::*;
use hdk::prelude::*;

use crate::search::prefix_path;

/// Creates the profile for the agent executing this call.
#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<Record> {
    let agent_info = agent_info()?;

    let action_hash = create_entry(EntryTypes::Profile(profile.clone()))?;

    let path = prefix_path(profile.nickname.clone())?;

    path.ensure()?;

    let agent_address = agent_info.agent_initial_pubkey;

    create_link(
        path.path_entry_hash()?,
        action_hash.clone(),
        LinkTypes::PathToProfile,
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

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateProfileInput {
    previous_profile_hash: ActionHash,
    updated_profile: Profile,
}

/// Updates the profile for the agent executing this call.
#[hdk_extern]
pub fn update_profile(input: UpdateProfileInput) -> ExternResult<Record> {
    let action_hash = update_entry(input.previous_profile_hash.clone(), &input.updated_profile)?;
    let my_pub_key = agent_info()?.agent_latest_pubkey;

    let maybe_previous_profile_record =
        get(input.previous_profile_hash.clone(), Default::default())?;

    let Some(previous_profile_record) = maybe_previous_profile_record else {
        return Err(wasm_error!(WasmErrorInner::Guest(format!(
            "Could not get the previous profile"
        ))));
    };

    // If we have changed the nickname, remove the previous nickname link and add a new one
    let previous_profile: Profile = previous_profile_record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Previous profile is malformed".to_string()
        )))?;
    if previous_profile
        .nickname
        .ne(&input.updated_profile.nickname)
    {
        let previous_prefix_path = prefix_path(previous_profile.nickname)?;
        let links = get_links(
            GetLinksInputBuilder::try_new(
                previous_prefix_path.path_entry_hash()?,
                LinkTypes::PathToProfile.try_into_filter()?,
            )?
            .build(),
        )?;

        for l in links {
            if let Some(profile_hash) = l.target.into_action_hash() {
                if input.previous_profile_hash.eq(&profile_hash) {
                    delete_link(l.create_link_hash)?;
                }
            }
        }

        let path = prefix_path(input.updated_profile.nickname.clone())?;

        path.ensure()?;

        create_link(
            path.path_entry_hash()?,
            my_pub_key,
            LinkTypes::PathToProfile,
            LinkTag::new(
                input
                    .updated_profile
                    .nickname
                    .to_lowercase()
                    .as_bytes()
                    .to_vec(),
            ),
        )?;
    }

    let record = get(action_hash, GetOptions::default())?
        .ok_or(wasm_error!(WasmErrorInner::Guest("Unreachable".into())))?;

    Ok(record)
}
#[hdk_extern]
pub fn get_original_profile(original_profile_hash: ActionHash) -> ExternResult<Option<Record>> {
    get(original_profile_hash, Default::default())
}

#[hdk_extern]
pub fn get_latest_profile(original_profile_hash: ActionHash) -> ExternResult<Option<Record>> {
    get_latest(original_profile_hash)
}

fn get_latest(action_hash: ActionHash) -> ExternResult<Option<Record>> {
    let details = get_details(action_hash, GetOptions::default())?.ok_or(wasm_error!(
        WasmErrorInner::Guest("Profile not found".into())
    ))?;

    match details {
        Details::Entry(_) => Err(wasm_error!(WasmErrorInner::Guest(
            "Malformed details".into()
        ))),
        Details::Record(record_details) => match record_details.updates.last() {
            Some(update) => get_latest(update.action_address().clone()),
            None => Ok(Some(record_details.record)),
        },
    }
}
