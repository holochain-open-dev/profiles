use crate::utils;
use hc_utils::WrappedAgentPubKey;
use hdk3::prelude::link::Link;
use hdk3::prelude::*;
use std::convert::{TryFrom, TryInto};

#[hdk_entry(id = "profile", visibility = "public")]
#[derive(Clone)]
pub struct Profile {
    pub username: String,
}

pub fn create_profile(profile: Profile) -> ExternResult<EntryHash> {
    let agent_info = agent_info!()?;

    create_entry!(profile.clone())?;

    let profile_hash = hash_entry!(profile)?;

    let path = all_profiles_path();

    path.ensure()?;

    let wrapped_agent_pub_key = WrappedAgentPubKey(agent_info.agent_initial_pubkey);

    create_link!(
        path.hash()?,
        profile_hash.clone(),
        pub_key_to_tag(wrapped_agent_pub_key)?
    )?;

    Ok(profile_hash)
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct AgentProfile {
    pub agent_pub_key: WrappedAgentPubKey,
    pub profile: Profile,
}
pub fn get_all_profiles() -> ExternResult<Vec<AgentProfile>> {
    let path = all_profiles_path();

    let links = get_links!(path.hash()?)?;

    links
        .into_inner()
        .into_iter()
        .map(|link| get_agent_profile_from_link(link))
        .collect()
}

pub fn get_agent_profile(agent_pub_key: WrappedAgentPubKey) -> ExternResult<Option<AgentProfile>> {
    let path = all_profiles_path();

    let links = get_links!(path.hash()?, pub_key_to_tag(agent_pub_key)?)?;

    let inner_links = links.into_inner();

    if inner_links.len() == 0 {
        return Ok(None);
    }

    let link = inner_links[0].clone();

    let agent_profile = utils::try_get_and_convert(link.target)?;

    Ok(Some(agent_profile))
}

/** Private helpers */

fn all_profiles_path() -> Path {
    Path::from("all_profiles")
}

fn get_agent_profile_from_link(link: Link) -> ExternResult<AgentProfile> {
    let profile_hash = link.target;

    let profile: Profile = utils::try_get_and_convert(profile_hash)?;
    let agent_pub_key = tag_to_pub_key(link.tag)?;

    let agent_profile = AgentProfile {
        agent_pub_key,
        profile,
    };

    Ok(agent_profile)
}

fn pub_key_to_tag(agent_pub_key: WrappedAgentPubKey) -> ExternResult<LinkTag> {
    let sb: SerializedBytes = agent_pub_key.try_into()?;

    Ok(LinkTag(sb.bytes().clone()))
}

fn tag_to_pub_key(tag: LinkTag) -> ExternResult<WrappedAgentPubKey> {
    let sb = SerializedBytes::from(UnsafeBytes::from(tag.0));

    let pub_key = WrappedAgentPubKey::try_from(sb)?;

    Ok(pub_key)
}
