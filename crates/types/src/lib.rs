use std::collections::BTreeMap;

use hdk::prelude::holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

/// Profile entry definition.
///
/// The profile must include at a minimum the nickname of the agent
/// in order to be able to search for agents by nickname.
#[hdk_entry(id = "profile", visibility = "public")]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub nickname: String,
    pub fields: BTreeMap<String, String>,
}

/// Used as a return type of all functions.
#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AgentProfile {
    pub agent_pub_key: AgentPubKeyB64,
    pub profile: Profile,
}

/// Input for the `search_profiles` zome function.
/// 
/// The nickname prefix must be of at least 3 characters.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchProfilesInput {
    pub nickname_prefix: String,
}
