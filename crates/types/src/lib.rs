use hdi::prelude::*;

use std::collections::BTreeMap;

/// Profile entry definition.
///
/// The profile must include at a minimum the nickname of the agent
/// in order to be able to search for agents by nickname.
#[hdk_entry_helper]
#[derive(Clone)]
pub struct Profile {
    pub nickname: String,
    pub fields: BTreeMap<String, String>,
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct ProfileClaim {
    pub profile_hash: ActionHash,
    pub agent_to_profile_create_link_hash: ActionHash,
}

pub const PROFILE_ENTRY_TYPE_INDEX: u8 = 0;
pub const PROFILE_CLAIM_ENTRY_TYPE_INDEX: u8 = 1;

pub fn validate_profile_for_agent(
    agent: AgentPubKey,
    chain_top: ActionHash,
    profile_hash: ActionHash,
    profiles_integrity_zome_name: &ZomeName,
) -> ExternResult<ValidateCallbackResult> {
    let dna_info = dna_info()?;

    let Some(profile_integrity_zome_index) = dna_info
        .zome_names
        .into_iter()
        .position(|z| z.eq(&profiles_integrity_zome_name))
    else {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Unreachable: there is no 'roles' integrity zome in this DNA",
        )));
    };

    validate_profile_for_agent_with_zome_index(
        agent,
        chain_top,
        profile_hash,
        ZomeIndex::new(profile_integrity_zome_index as u8),
    )
}

pub fn validate_profile_for_agent_with_zome_index(
    agent: AgentPubKey,
    chain_top: ActionHash,
    profile_hash: ActionHash,
    profiles_integrity_zome_index: ZomeIndex,
) -> ExternResult<ValidateCallbackResult> {
    let filter = ChainFilter::new(chain_top.clone());
    let activity = must_get_agent_activity(agent.clone(), filter)?;

    if let Some(_) = activity
        .iter()
        .find(|activity| activity.action.hashed.hash.eq(&profile_hash))
    {
        // This is the agent that created the Profile
        return Ok(ValidateCallbackResult::Valid);
    }

    let profile_claim_creates: Vec<Create> = activity
        .iter()
        .filter_map(|activity| match &activity.action.hashed.content {
            Action::Create(create) => Some(create.clone()),
            _ => None,
        })
        .filter(|create| {
            let EntryType::App(app_entry_type) = &create.entry_type else {
                return false;
            };
            app_entry_type.zome_index() == profiles_integrity_zome_index
                && app_entry_type.entry_index().0 == PROFILE_CLAIM_ENTRY_TYPE_INDEX
        })
        .collect();

    if profile_claim_creates.len() == 0 {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "No ProfileClaims were found for this agent",
        )));
    }

    if profile_claim_creates.len() > 1 {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Only one ProfileClaim is allowed for a given source chain",
        )));
    }

    let profile_claim_create = profile_claim_creates[0].clone();
    let entry = must_get_entry(profile_claim_create.entry_hash)?;

    let Ok(profile_claim) = ProfileClaim::try_from(entry.content) else {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Create action did not contain ProfileClaim entry type",
        )));
    };

    if profile_claim.profile_hash.ne(&profile_hash) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Agent's ProfileClaim is for a different profile than the given profile_hash",
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}
