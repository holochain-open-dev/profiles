extern crate hc_utils;

use hc_utils::WrappedAgentPubKey;
use hdk3::prelude::*;

mod profile;
mod utils;

use profile::{AgentProfile, Profile};

pub fn error<T>(reason: &str) -> ExternResult<T> {
    Err(HdkError::Wasm(WasmError::Zome(String::from(reason))))
}

entry_defs![Path::entry_def(), profile::Profile::entry_def()];

/** Calendar events **/

#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<AgentProfile> {
    profile::create_profile(profile)
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct GetAllProfilesOutput(Vec<AgentProfile>);
#[hdk_extern]
pub fn get_all_profiles(_: ()) -> ExternResult<GetAllProfilesOutput> {
    let agent_profiles = profile::get_all_profiles()?;

    Ok(GetAllProfilesOutput(agent_profiles))
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct GetAgentProfileOutput(Option<AgentProfile>);
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: WrappedAgentPubKey) -> ExternResult<GetAgentProfileOutput> {
    let agent_profile = profile::get_agent_profile(agent_pub_key)?;

    Ok(GetAgentProfileOutput(agent_profile))
}

#[hdk_extern]
pub fn get_my_profile(_: ()) -> ExternResult<GetAgentProfileOutput> {
    let agent_info = agent_info!()?;

    let agent_profile =
        profile::get_agent_profile(WrappedAgentPubKey(agent_info.agent_initial_pubkey))?;

    Ok(GetAgentProfileOutput(agent_profile))
}
