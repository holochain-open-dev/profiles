use hc_zome_profiles_integrity::LinkTypes;
use hdk::prelude::*;

use crate::search::get_agent_profile;

#[hdk_extern]
pub fn link_agent_with_my_profile(agent_pub_key: AgentPubKey) -> ExternResult<()> {
    let my_profile_links = get_agent_profile(agent_info()?.agent_latest_pubkey)?;

    if my_profile_links.len() != 1 {
        return Err(wasm_error!(WasmErrorInner::Guest(format!(
            "Can't fetch my profile"
        ))));
    }

    let profile_link = my_profile_links[0].clone();
    let Some(profile_hash) = profile_link.target.into_action_hash() else {
        return Err(wasm_error!(WasmErrorInner::Guest(format!(
            "Profile link does not have an ActionHash as its target"
        ))));
    };

    create_link(agent_pub_key, profile_hash, LinkTypes::AgentToProfile, ())?;

    Ok(())
}

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
#[serde(tag = "type")]
pub enum SignalPayload {}

#[hdk_extern]
pub fn recv_remote_signal(signal: ExternIO) -> ExternResult<()> {
    let signal_payload: SignalPayload = signal
        .decode()
        .map_err(|err| wasm_error!(WasmErrorInner::Guest(err.into())))?;

    emit_signal(signal_payload)?;
    Ok(())
}

#[hdk_extern]
pub fn create_link_agent_cap_grant() -> ExternResult<()> {
    let mut functions = BTreeSet::new();
    functions.insert((zome_info()?.name, FunctionName("recv_remote_signal".into())));
    let cap_grant_entry: CapGrantEntry = CapGrantEntry::new(
        String::from("link-agents"), // A string by which to later query for saved grants.
        ().into(), // Unrestricted access means any external agent can call the extern
        GrantedFunctions::Listed(functions),
    );

    create(CreateInput::new(
        EntryDefLocation::CapGrant,
        EntryVisibility::Private,
        Entry::CapGrant(cap_grant_entry),
        ChainTopOrdering::default(),
    ))?;
    Ok(())
}

#[hdk_extern]
pub fn clear_all_link_agents_cap_grants() -> ExternResult<()> {
    let filter = ChainQueryFilter::new()
        .entry_type(EntryType::CapGrant)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    for record in records {
        let Some(entry) = record.entry().as_option() else {
            continue;
        };
        let Entry::CapGrant(cap_grant) = entry else {
            continue;
        };
        if cap_grant.tag.as_str() == "link-agents" {
            delete(DeleteInput {
                deletes_action_hash: record.action_address().clone(),
                chain_top_ordering: ChainTopOrdering::Relaxed,
            })?;
        }
    }

    Ok(())
}
