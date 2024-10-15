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
