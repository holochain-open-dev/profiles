use std::collections::BTreeMap;

use hdi::prelude::*;

use linked_devices_types::*;

use crate::linked_devices::linked_devices_integrity_zome_name;

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

pub fn validate_create_profile(
    _action: EntryCreationAction,
    profile: Profile,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_update_profile(
    action_hash: ActionHash,
    action: Update,
    _profile: Profile,
) -> ExternResult<ValidateCallbackResult> {
    let create_record = must_get_valid_record(action.original_action_address.clone())?;

    if action.author.eq(create_record.action().author()) {
        return Ok(ValidateCallbackResult::Valid);
    }

    if let Some(linked_devices_integrity_zome_name) = linked_devices_integrity_zome_name() {
        validate_agents_have_linked_devices(
            &action.author,
            &action_hash,
            create_record.action().author(),
            &action.original_action_address,
            linked_devices_integrity_zome_name,
        )
    } else {
        Ok(ValidateCallbackResult::Invalid(String::from(
            "Profiles can only be updated by the agent that created them",
        )))
    }
}
pub fn validate_delete_profile(_action: Delete) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "Profiles cannot be deleted",
    )))
}
