use hdi::prelude::*;
use profiles_types::{validate_profile_for_agent_with_zome_index, Profile};

pub fn validate_create_profile(
    _action: EntryCreationAction,
    profile: Profile,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

fn get_original_create_hash(update: &Update) -> ExternResult<ActionHash> {
    let previous_new_entry_action_hash = update.original_action_address.clone();

    let record = must_get_valid_record(previous_new_entry_action_hash.clone())?;

    match record.action() {
        Action::Create(_) => Ok(previous_new_entry_action_hash.clone()),
        Action::Update(update) => get_original_create_hash(update),
        _ => Err(wasm_error!(WasmErrorInner::Guest(format!("UNREACHABLE: an update action does not have a new entry action as its original_action_address"))))
    }
}

pub fn validate_update_profile(
    action_hash: ActionHash,
    action: Update,
    _profile: Profile,
) -> ExternResult<ValidateCallbackResult> {
    let original_create_hash = get_original_create_hash(&action)?;

    let result = validate_profile_for_agent_with_zome_index(
        action.author.clone(),
        action_hash,
        original_create_hash,
        zome_info()?.id,
    )?;
    let ValidateCallbackResult::Valid = result else {
        return Ok(result);
    };

    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_profile(_action: Delete) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "Profiles cannot be deleted",
    )))
}
