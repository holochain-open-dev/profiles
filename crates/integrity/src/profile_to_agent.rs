use hdi::prelude::*;
use profiles_types::validate_profile_for_agent_with_zome_index;

pub fn validate_create_link_profile_to_agent(
    action_hash: ActionHash,
    action: CreateLink,
    base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    let _agent = target_address
        .into_agent_pub_key()
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "No AgentPubKey associated with the base of an AgentToProfile link".to_string()
        )))?;
    // Check the entry type for the given action hash
    let profile_hash =
        base_address
            .into_action_hash()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "No action hash associated with link".to_string()
            )))?;
    let record = must_get_valid_record(profile_hash.clone())?;
    let _profile: crate::Profile = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;

    let result = validate_profile_for_agent_with_zome_index(
        action.author.clone(),
        action_hash,
        profile_hash,
        zome_info()?.id,
    )?;
    let ValidateCallbackResult::Valid = result else {
        return Ok(result);
    };

    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_profile_to_agent(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "AgentToProfile links cannot be deleted",
    )))
}
