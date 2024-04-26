//! ## hc_zome_profiles_coordinator
//!
//! Profiles zome for any Holochain app.
//!
//! If you need to manage profiles (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome and its integrity counterpart [hc_zome_profiles_integrity](https://docs.rs/hc_zome_profiles_integrity) in your DNA.
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

    let agent_address = agent_info.agent_initial_pubkey;

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
            GetLinksInputBuilder::try_new(
                previous_prefix_path.path_entry_hash()?,
                LinkTypes::PathToAgent.try_into_filter()?,
            )?
            .build(),
        )?;

        for l in links {
            if let Ok(pub_key) = AgentPubKey::try_from(l.target) {
                if my_pub_key.eq(&pub_key) {
                    delete_link(l.create_link_hash)?;
                }
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

/// From a nickname filter of at least 3 characters, returns all the agents whose nickname starts with that prefix
/// Ignores the nickname case, will return upper or lower case nicknames that match
#[hdk_extern]
pub fn search_agents(nickname_filter: String) -> ExternResult<Vec<AgentPubKey>> {
    if nickname_filter.len() < 3 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot search with a prefix less than 3 characters".into(),
        )));
    }

    let prefix_path = prefix_path(nickname_filter.clone())?;
    let links = get_links(
        GetLinksInputBuilder::try_new(
            prefix_path.path_entry_hash()?,
            LinkTypes::PathToAgent.try_into_filter()?,
        )?
        .tag_prefix(LinkTag::new(
            nickname_filter.to_lowercase().as_bytes().to_vec(),
        ))
        .build(),
    )?;

    let mut agents: Vec<AgentPubKey> = vec![];

    for link in links {
        if let Ok(pub_key) = AgentPubKey::try_from(link.target) {
            agents.push(pub_key);
        }
    }

    Ok(agents)
}

/// Returns the profile for the given agent, if they have created it.
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKey) -> ExternResult<Option<Record>> {
    let links = get_links(
        GetLinksInputBuilder::try_new(agent_pub_key, LinkTypes::AgentToProfile.try_into_filter()?)?
            .build(),
    )?;

    if links.is_empty() {
        return Ok(None);
    }

    let link = links[0].clone();

    let profile = get_latest(link.target.into_action_hash().ok_or(wasm_error!(
        WasmErrorInner::Guest("Profile link target is not of ActionHash".into())
    ))?)?;

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

/// Gets all the agents that have created a profile in this DHT.
#[hdk_extern]
pub fn get_agents_with_profile(_: ()) -> ExternResult<Vec<Link>> {
    let path = Path::from("all_profiles").typed(LinkTypes::PrefixPath)?;

    let children = path.children_paths()?;

    let get_links_input: Vec<GetLinksInput> = children
        .into_iter()
        .map(|path| {
            Ok(GetLinksInputBuilder::try_new(
                path.path_entry_hash()?,
                LinkTypes::PathToAgent.try_into_filter()?,
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

fn prefix_path(nickname: String) -> ExternResult<TypedPath> {
    // conver to lowercase for path for ease of search
    let lower_nickname = nickname.to_lowercase();
    let prefix: String = lower_nickname.chars().take(3).collect();

    Path::from(format!("all_profiles.{}", prefix)).typed(LinkTypes::PrefixPath)
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum Signal {
    LinkCreated {
        action: SignedActionHashed,
        link_type: LinkTypes,
    },
    LinkDeleted {
        action: SignedActionHashed,
        create_link_action: SignedActionHashed,
        link_type: LinkTypes,
    },
    EntryCreated {
        action: SignedActionHashed,
        app_entry: EntryTypes,
    },
    EntryUpdated {
        action: SignedActionHashed,
        app_entry: EntryTypes,
        original_app_entry: EntryTypes,
    },
    EntryDeleted {
        action: SignedActionHashed,
        original_app_entry: EntryTypes,
    },
}
#[hdk_extern(infallible)]
pub fn post_commit(committed_actions: Vec<SignedActionHashed>) {
    for action in committed_actions {
        if let Err(err) = signal_action(action) {
            error!("Error signaling new action: {:?}", err);
        }
    }
}
fn signal_action(action: SignedActionHashed) -> ExternResult<()> {
    match action.hashed.content.clone() {
        Action::CreateLink(create_link) => {
            if let Ok(Some(link_type)) =
                LinkTypes::from_type(create_link.zome_index, create_link.link_type)
            {
                emit_signal(Signal::LinkCreated { action, link_type })?;
            }
            Ok(())
        }
        Action::DeleteLink(delete_link) => {
            let record =
                get(delete_link.link_add_address, GetOptions::default())?.ok_or(wasm_error!(
                    WasmErrorInner::Guest("Failed to fetch CreateLink action".to_string())
                ))?;
            match record.action() {
                Action::CreateLink(create_link) => {
                    if let Ok(Some(link_type)) =
                        LinkTypes::from_type(create_link.zome_index, create_link.link_type)
                    {
                        emit_signal(Signal::LinkDeleted {
                            action,
                            link_type,
                            create_link_action: record.signed_action,
                        })?;
                    }
                    Ok(())
                }
                _ => Err(wasm_error!(WasmErrorInner::Guest(
                    "Create Link should exist".to_string()
                ))),
            }
        }
        Action::Create(_create) => {
            if let Ok(Some(app_entry)) = get_entry_for_action(&action.hashed.hash) {
                emit_signal(Signal::EntryCreated { action, app_entry })?;
            }
            Ok(())
        }
        Action::Update(update) => {
            if let Ok(Some(app_entry)) = get_entry_for_action(&action.hashed.hash) {
                if let Ok(Some(original_app_entry)) =
                    get_entry_for_action(&update.original_action_address)
                {
                    emit_signal(Signal::EntryUpdated {
                        action,
                        app_entry,
                        original_app_entry,
                    })?;
                }
            }
            Ok(())
        }
        Action::Delete(delete) => {
            if let Ok(Some(original_app_entry)) = get_entry_for_action(&delete.deletes_address) {
                emit_signal(Signal::EntryDeleted {
                    action,
                    original_app_entry,
                })?;
            }
            Ok(())
        }
        _ => Ok(()),
    }
}
fn get_entry_for_action(action_hash: &ActionHash) -> ExternResult<Option<EntryTypes>> {
    let record = match get_details(action_hash.clone(), GetOptions::default())? {
        Some(Details::Record(record_details)) => record_details.record,
        _ => {
            return Ok(None);
        }
    };
    let entry = match record.entry().as_option() {
        Some(entry) => entry,
        None => {
            return Ok(None);
        }
    };
    let (zome_index, entry_index) = match record.action().entry_type() {
        Some(EntryType::App(AppEntryDef {
            zome_index,
            entry_index,
            ..
        })) => (zome_index, entry_index),
        _ => {
            return Ok(None);
        }
    };
    EntryTypes::deserialize_from_type(*zome_index, *entry_index, entry)
}
