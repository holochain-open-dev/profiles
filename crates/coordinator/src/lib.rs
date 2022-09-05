//! ## hc_zome_profiles
//!
//! Profiles zome for any Holochain app.
//!
//! If you need to manage profiles (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome in your DNA.
//!
//! Read about how to include both this zome and its frontend module in your application [here](https://holochain-open-dev.github.io/profiles).

use hdk::prelude::*;

mod handlers;

use hc_zome_profiles_coordinator_types::*;
use hc_zome_profiles_integrity_types::*;

/// Creates the profile for the agent executing this call.
#[hdk_extern]
pub fn create_profile(profile: Profile) -> ExternResult<Record> {
    handlers::create_profile(profile)
}

/// Updates the profile for the agent executing this call.
#[hdk_extern]
pub fn update_profile(profile: Profile) -> ExternResult<Record> {
    handlers::update_profile(profile)
}

/// From a search input of at least 3 characters, returns all the agents whose nickname starts with that prefix.
#[hdk_extern]
pub fn search_profiles(search_profiles_input: SearchProfilesInput) -> ExternResult<Vec<Record>> {
    let agent_profiles = handlers::search_profiles(search_profiles_input.nickname_prefix)?;

    Ok(agent_profiles)
}

/// Returns the profile for the given agent, if they have created it.
#[hdk_extern]
pub fn get_agent_profile(agent_pub_key: AgentPubKey) -> ExternResult<Option<Record>> {
    let agent_profile = handlers::get_agent_profile(agent_pub_key)?;

    Ok(agent_profile)
}

/// Returns the profiles for the given agents if they have created them.
///
/// Use this function if you need to get the profile for multiple agents at the same time,
/// as it will be more performant than doing multiple `get_agent_profile`.
#[hdk_extern]
pub fn get_agents_profiles(agent_pub_keys: Vec<AgentPubKey>) -> ExternResult<Vec<Record>> {
    let agent_profiles = handlers::get_agents_profiles(agent_pub_keys)?;

    Ok(agent_profiles)
}

/// Gets the profile for the agent calling this function, if they have created it.
#[hdk_extern]
pub fn get_my_profile(_: ()) -> ExternResult<Option<Record>> {
    let agent_profile = handlers::get_my_profile(())?;

    Ok(agent_profile)
}

/// Gets all the profiles that have been created in the network.
///
/// Careful! This will not be very performant in large networks.
/// In the future a cursor type functionality will be added to make this function performant.
#[hdk_extern]
pub fn get_all_profiles(_: ()) -> ExternResult<Vec<Record>> {
    let agent_profiles = handlers::get_all_profiles()?;

    Ok(agent_profiles)
}
