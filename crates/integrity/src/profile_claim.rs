use hdi::prelude::*;
use profiles_types::ProfileClaim;

use crate::{LinkTypes, UnitEntryTypes};

pub fn validate_create_profile_claim(
    action: EntryCreationAction,
    profile_claim: ProfileClaim,
) -> ExternResult<ValidateCallbackResult> {
    let filter = ChainFilter::new(action.prev_action().clone()).include_cached_entries();
    let activity = must_get_agent_activity(action.author().clone(), filter)?;

    if let Some(_) = activity
        .iter()
        .find(|activity| activity.action.hashed.hash.eq(&profile_claim.profile_hash))
    {
        // This is the agent that created the Profile
        return Ok(ValidateCallbackResult::Invalid(format!(
            "The author of the Profile can't create a ProfileClaim for that Profile"
        )));
    }

    let profile_claim_entry_type: EntryType = UnitEntryTypes::ProfileClaim.try_into()?;

    let profile_claim_creates: Vec<Create> = activity
        .iter()
        .filter_map(|activity| match &activity.action.hashed.content {
            Action::Create(create) => Some(create.clone()),
            _ => None,
        })
        .filter(|create| create.entry_type.eq(&profile_claim_entry_type))
        .collect();

    if profile_claim_creates.len() > 1 {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Only one ProfileClaim is allowed for a given source chain",
        )));
    }

    // Get the CreateLink for the agent_to_profile_create_link_hash, and verify it's a link from the agent public key of the author to the ProfileClaim profile_hash

    let create_link_hash = profile_claim.agent_to_profile_create_link_hash;

    let record = must_get_valid_record(create_link_hash)?;

    let link_action = record.action().clone();

    let Action::CreateLink(create_link) = link_action.clone() else {
        return Ok(ValidateCallbackResult::Invalid(format!("The agent_to_profile_create_link_hash references a record that does not contain a CreateLink action")));
    };
    let Some(link_type) = LinkTypes::from_type(create_link.zome_index, create_link.link_type)?
    else {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Invalid LinkType: not a profiles link type"
        )));
    };

    let LinkTypes::AgentToProfile = link_type else {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "agent_to_profile_create_link_hash link is not of type AgentToProfile"
        )));
    };

    let base_address = create_link.base_address;

    let Some(agent) = base_address.into_agent_pub_key() else {
        return Ok(ValidateCallbackResult::Invalid(
            "No AgentPubKey associated with the base of the AgentToProfile link".to_string(),
        ));
    };

    if agent.ne(action.author()) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "The author of the ProfileClaim is not the base for the AgentToProfile link"
        )));
    }

    let Some(profile_hash) = create_link.target_address.into_action_hash() else {
        return Ok(ValidateCallbackResult::Invalid(
            "No ActionHash associated with the target of the AgentToProfile link".to_string(),
        ));
    };

    if profile_hash.ne(&profile_claim.profile_hash) {
        return Ok(ValidateCallbackResult::Invalid(
            "The profile_hash in the ProfileClaim is not the target of the AgentToProfile link"
                .to_string(),
        ));
    }

    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_profile_claim(
    _action: Update,
    _profile_claim: ProfileClaim,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "ProfileClaims cannot be updated",
    )))
}
pub fn validate_delete_profile_claim(_action: Delete) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "ProfileClaims cannot be deleted",
    )))
}
