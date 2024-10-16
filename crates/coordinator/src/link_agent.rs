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

fn linking_agents_path() -> Path {
    Path::from("linking_agents")
}

fn secret_from_passcode(passcode: Vec<u8>) -> CapSecret {
    let mut secret: CapSecretBytes = [0; CAP_SECRET_BYTES];

    for i in 0..passcode.len() {
        secret[i] = passcode[i];
    }

    for i in passcode.len()..(CAP_SECRET_BYTES - passcode.len()) {
        secret[i] = 0;
    }

    CapSecret::from(secret)
}

#[hdk_extern]
pub fn prepare_link_agent(passcode: Vec<u8>) -> ExternResult<()> {
    let mut functions = BTreeSet::new();
    functions.insert((
        zome_info()?.name,
        FunctionName("receive_request_link_agent".into()),
    ));
    let access = CapAccess::Transferable {
        secret: secret_from_passcode(passcode),
    };
    let cap_grant_entry: CapGrantEntry = CapGrantEntry::new(
        String::from("link-agents"), // A string by which to later query for saved grants.
        access,
        GrantedFunctions::Listed(functions),
    );

    create(CreateInput::new(
        EntryDefLocation::CapGrant,
        EntryVisibility::Private,
        Entry::CapGrant(cap_grant_entry),
        ChainTopOrdering::Relaxed,
    ))?;

    let linking_agents_path = linking_agents_path();

    create_link_relaxed(
        linking_agents_path.path_entry_hash()?,
        agent_info()?.agent_latest_pubkey,
        LinkTypes::LinkingAgents,
        (),
    )?;

    Ok(())
}

#[hdk_extern]
pub fn get_linking_agents() -> ExternResult<Vec<Link>> {
    let linking_agents_path = linking_agents_path();
    get_links(
        GetLinksInputBuilder::try_new(
            linking_agents_path.path_entry_hash()?,
            LinkTypes::LinkingAgents,
        )?
        .build(),
    )
}

fn query_link_agents_cap_grants() -> ExternResult<Vec<Record>> {
    let filter = ChainQueryFilter::new()
        .entry_type(EntryType::CapGrant)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    let mut link_agents_cap_grants = Vec::new();

    for record in records {
        let Some(entry) = record.entry().as_option() else {
            continue;
        };
        let Entry::CapGrant(cap_grant) = entry else {
            continue;
        };
        if cap_grant.tag.as_str() == "link-agents" {
            link_agents_cap_grants.push(record)
        }
    }

    Ok(link_agents_cap_grants)
}

#[hdk_extern]
pub fn clear_link_agent() -> ExternResult<()> {
    let link_agent_cap_grants = query_link_agents_cap_grants()?;

    for record in link_agent_cap_grants {
        delete(DeleteInput {
            deletes_action_hash: record.action_address().clone(),
            chain_top_ordering: ChainTopOrdering::Relaxed,
        })?;
    }
    let my_pub_key = agent_info()?.agent_latest_pubkey;

    let links = get_linking_agents(())?;
    for link in links {
        if link.author.eq(&my_pub_key) {
            delete_link_relaxed(link.create_link_hash)?;
        }
    }

    Ok(())
}

fn delete_link_relaxed(address: ActionHash) -> ExternResult<()> {
    HDK.with(|h| {
        h.borrow()
            .delete_link(DeleteLinkInput::new(address, ChainTopOrdering::Relaxed))
    })?;

    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RequestLinkAgentInput {
    recipient: AgentPubKey,
    recipient_passcode: Vec<u8>,
    requestor_passcode: Vec<u8>,
}

#[hdk_extern]
pub fn request_link_agent(input: RequestLinkAgentInput) -> ExternResult<()> {
    let response = call_remote(
        input.recipient,
        zome_info()?.name,
        "receive_request_link_agent".into(),
        Some(secret_from_passcode(input.recipient_passcode)),
        input.requestor_passcode,
    )?;

    match response {
        ZomeCallResponse::Ok(_) => Ok(()),
        _ => Err(wasm_error!(WasmErrorInner::Guest(format!("{response:?}")))),
    }
}

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct RequestLinkAgentSignal {
    from: AgentPubKey,
    requestor_passcode: Vec<u8>,
}

const TTL_LIVE_AGENTS_CAP_GRANTS: i64 = 1000 * 1000 * 60; // 1 minute

#[hdk_extern]
pub fn receive_request_link_agent(requestor_passcode: Vec<u8>) -> ExternResult<()> {
    let link_agents_cap_grants = query_link_agents_cap_grants()?;
    let now = sys_time()?;

    let recent_enough_cap_grant = link_agents_cap_grants.iter().find(|r| {
        now.as_micros() - r.action().timestamp().as_micros() < TTL_LIVE_AGENTS_CAP_GRANTS
    });

    let Some(_) = recent_enough_cap_grant else {
        clear_link_agent(())?;
        return Err(wasm_error!(WasmErrorInner::Guest(format!(
            "Timed out cap grant"
        ))));
    };

    let call_info = call_info()?;

    let request_link_agent_signal = RequestLinkAgentSignal {
        from: call_info.provenance,
        requestor_passcode,
    };

    emit_signal(request_link_agent_signal)?;
    Ok(())
}
pub fn create_link_relaxed<T, E>(
    base_address: impl Into<AnyLinkableHash>,
    target_address: impl Into<AnyLinkableHash>,
    link_type: T,
    tag: impl Into<LinkTag>,
) -> ExternResult<()>
where
    ScopedLinkType: TryFrom<T, Error = E>,
    WasmError: From<E>,
{
    let ScopedLinkType {
        zome_index,
        zome_type: link_type,
    } = link_type.try_into()?;
    HDK.with(|h| {
        h.borrow().create_link(CreateLinkInput::new(
            base_address.into(),
            target_address.into(),
            zome_index,
            link_type,
            tag.into(),
            ChainTopOrdering::Relaxed,
        ))
    })?;

    Ok(())
}
