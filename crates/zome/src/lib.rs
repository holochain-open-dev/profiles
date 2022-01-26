use hdk::prelude::holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

mod handlers;
mod utils;

use hc_zome_profiles_types::*;

entry_defs![PathEntry::entry_def(), Profile::entry_def()];

/// Creates the profile for the agent executing this call.
#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<AgentProfile> {
    handlers::create_profile(profile)
}

/// Updates the profile for the agent executing this call.
#[hdk_extern]
pub fn update_profile(profile: Profile) -> ExternResult<AgentProfile> {
    handlers::update_profile(profile)
}

/// From a search input of at least 3 characters, returns all the agents whose nickname starts with that prefix.
#[hdk_extern]
pub fn search_profiles(
    search_profiles_input: SearchProfilesInput,
) -> ExternResult<Vec<AgentProfile>> {
    let agent_profiles = handlers::search_profiles(search_profiles_input.nickname_prefix)?;

    Ok(agent_profiles)
}

/// Returns the profile for the given agent, if they have created it.
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKeyB64) -> ExternResult<Option<AgentProfile>> {
    let agent_profile = handlers::get_agent_profile(agent_pub_key)?;

    Ok(agent_profile)
}

/// Returns the profiles for the given agents if they have created them.
/// 
/// Use this function if you need to get the profile for multiple agents at the same time, 
/// as it will be more performant than doing multiple `get_agent_profile`.
#[hdk_extern]
pub fn get_agents_profile(
    agent_pub_keys_b64: Vec<AgentPubKeyB64>,
) -> ExternResult<Vec<AgentProfile>> {
    let agent_profiles = handlers::get_agents_profile(agent_pub_keys_b64)?;

    Ok(agent_profiles)
}

/// Gets the profile for the agent calling this function, if they have created it.
#[hdk_extern]
pub fn get_my_profile(_: ()) -> ExternResult<Option<AgentProfile>> {
    let agent_info = agent_info()?;

    let agent_profile =
        handlers::get_agent_profile(AgentPubKeyB64::from(agent_info.agent_initial_pubkey))?;

    Ok(agent_profile)
}

/// Gets all the profiles that have been created in the network.
/// 
/// Careful! This will not be very performant in large networks.
/// In the future a cursor type functionality will be added to make this function performant.
#[hdk_extern]
pub fn get_all_profiles(_: ()) -> ExternResult<Vec<AgentProfile>> {
    let agent_profiles = handlers::get_all_profiles()?;

    Ok(agent_profiles)
}
