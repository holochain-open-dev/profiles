use hdi::prelude::*;

pub fn validate_create_link_linking_agents(
    action: CreateLink,
    base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    let agent = target_address
        .into_agent_pub_key()
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "No AgentPubKey associated with the base of an AgentToProfile link".to_string()
        )))?;
    if agent.ne(&action.author) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "LinkingAgents links can only target the author of the link",
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_linking_agents(
    action: DeleteLink,
    original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    if original_action.author.ne(&action.author) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "LinkingAgents links can be deleted by their own authors",
        )));
    }
    Ok(ValidateCallbackResult::Valid)
}
