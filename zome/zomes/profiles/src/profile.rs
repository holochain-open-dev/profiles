use crate::utils;
use holo_hash::AgentPubKeyB64;
use hdk::prelude::link::Link;
use hdk::prelude::*;
use std::collections::BTreeMap;
use std::convert::{TryFrom, TryInto};

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

pub fn create_profile(profile: Profile) -> ExternResult<AgentProfile> {
    let agent_info = agent_info()?;

    create_entry(&profile.clone())?;

    let profile_hash = hash_entry(&profile.clone())?;

    let path = prefix_path(profile.nickname.clone());

    path.ensure()?;

    let agent_address: AnyDhtHash = agent_info.agent_initial_pubkey.clone().into();

    create_link(
        path.hash()?,
        profile_hash.clone(),
        link_tag(profile.nickname.as_str().clone())?,
    )?;
    create_link(
        agent_address.into(),
        profile_hash.clone(),
        link_tag("profile")?,
    )?;

    let agent_profile = AgentProfile {
        agent_pub_key: AgentPubKeyB64::from(agent_info.agent_initial_pubkey),
        profile,
    };

    Ok(agent_profile)
}

pub fn search_profiles(nickname_prefix: String) -> ExternResult<Vec<AgentProfile>> {
    if nickname_prefix.len() < 3 {
        return Err(crate::err("Cannot search with a prefix less than 3 characters"));
    }

    let prefix_path = prefix_path(nickname_prefix);

    get_agent_profiles_for_path(prefix_path.hash()?)
}

pub fn get_all_profiles() -> ExternResult<Vec<AgentProfile>> {
    let path = Path::from("all_profiles");

    let children = path.children()?;

    let agent_profiles: Vec<AgentProfile> = children
        .into_inner()
        .into_iter()
        .map(|link| get_agent_profiles_for_path(link.target))
        .collect::<ExternResult<Vec<Vec<AgentProfile>>>>()?
        .into_iter()
        .flatten()
        .collect();

    Ok(agent_profiles)
}

pub fn get_agent_profile(
    wrapped_agent_pub_key: AgentPubKeyB64,
) -> ExternResult<Option<AgentProfile>> {
    let agent_pub_key = AgentPubKey::from(wrapped_agent_pub_key.clone());

    let agent_address: AnyDhtHash = agent_pub_key.into();

    let links = get_links(agent_address.into(), Some(link_tag("profile")?))?;

    let inner_links = links.into_inner();

    if inner_links.len() == 0 {
        return Ok(None);
    }

    let link = inner_links[0].clone();

    let profile: Profile = utils::try_get_and_convert(link.target)?;

    let agent_profile = AgentProfile {
        agent_pub_key: wrapped_agent_pub_key,
        profile,
    };

    Ok(Some(agent_profile))
}

/** Private helpers */

fn prefix_path(nickname: String) -> Path {
    let (prefix, _) = nickname.as_str().split_at(3);

    Path::from(format!("all_profiles.{}", prefix))
}

fn get_agent_profiles_for_path(path_hash: EntryHash) -> ExternResult<Vec<AgentProfile>> {
    let links = get_links(path_hash, None)?;

    links
        .into_inner()
        .into_iter()
        .map(get_agent_profile_from_link)
        .collect()
}

fn get_agent_profile_from_link(link: Link) -> ExternResult<AgentProfile> {
    let profile_hash = link.target;

    let element =
        get(profile_hash, GetOptions::default())?.ok_or(crate::err("could not get profile"))?;

    let author = element.header().author().clone();

    let profile: Profile = utils::try_from_element(element)?;

    let agent_profile = AgentProfile {
        agent_pub_key: AgentPubKeyB64::from(author),
        profile,
    };

    Ok(agent_profile)
}

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
struct StringLinkTag(String);
pub fn link_tag(tag: &str) -> ExternResult<LinkTag> {
    let sb: SerializedBytes = StringLinkTag(tag.into()).try_into()?;
    Ok(LinkTag(sb.bytes().clone()))
}
