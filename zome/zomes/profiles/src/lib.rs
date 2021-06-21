use holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

mod profile;
mod utils;

pub use profile::*;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

entry_defs![Path::entry_def(), profile::Profile::entry_def()];

/** Profiles **/

#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<AgentProfile> {
    profile::create_profile(profile)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchProfilesInput {
    nickname_prefix: String,
}
#[hdk_extern]
pub fn search_profiles(
    search_profiles_input: SearchProfilesInput,
) -> ExternResult<Vec<AgentProfile>> {
    let agent_profiles = profile::search_profiles(search_profiles_input.nickname_prefix)?;

    Ok(agent_profiles)
}

#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKeyB64) -> ExternResult<Option<AgentProfile>> {
    let agent_profile = profile::get_agent_profile(agent_pub_key)?;

    Ok(agent_profile)
}

#[hdk_extern]
pub fn get_my_profile(_: ()) -> ExternResult<Option<AgentProfile>> {
    let agent_info = agent_info()?;

    let agent_profile =
        profile::get_agent_profile(AgentPubKeyB64::from(agent_info.agent_initial_pubkey))?;

    Ok(agent_profile)
}

#[hdk_extern]
pub fn get_all_profiles(_: ()) -> ExternResult<Vec<AgentProfile>> {
    let agent_profiles = profile::get_all_profiles()?;

    Ok(agent_profiles)
}
