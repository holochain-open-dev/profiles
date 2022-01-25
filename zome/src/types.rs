use std::collections::BTreeMap;

use hdk::prelude::holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

#[hdk_entry(id = "profile", visibility = "public")]
#[derive(Clone)]
pub struct Profile {
    pub nickname: String,
    pub fields: BTreeMap<String, String>,
}

// Used as a return type of all functions
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct AgentProfile {
    pub agent_pub_key: AgentPubKeyB64,
    pub profile: Profile,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchProfilesInput {
    pub nickname_prefix: String,
}
