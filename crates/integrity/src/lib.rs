//! ## hc_zome_profiles_integrity
//!
//! Profiles zome for any Holochain app.
//!
//! If you need to manage profiles (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome and its coordinator counterpart [hc_zome_profiles_coordinator](https://docs.rs/hc_zome_profiles_coordinator) in your DNA.
//!
//! Read about how to include both this zome and its frontend module in your application [here](https://holochain-open-dev.github.io/profiles).

use hdi::prelude::*;

pub use profiles_types::*;

mod agent_to_profile;
mod path_to_profile;
mod prefix_path;
mod profile;
mod profile_claim;
use agent_to_profile::*;
use path_to_profile::*;
use prefix_path::*;
use profile::*;
use profile_claim::*;

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
#[hdk_entry_types]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    Profile(Profile),
    ProfileClaim(ProfileClaim),
}

#[derive(Serialize, Deserialize)]
#[hdk_link_types]
pub enum LinkTypes {
    PrefixPath,
    PathToProfile,
    AgentToProfile,
}

#[hdk_extern]
pub fn genesis_self_check(_data: GenesisSelfCheckData) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_agent_joining(
    _agent_pub_key: AgentPubKey,
    _membrane_proof: &Option<MembraneProof>,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn action_hash(op: &Op) -> &ActionHash {
    match op {
        Op::StoreRecord(StoreRecord { record }) => record.action_address(),
        Op::StoreEntry(StoreEntry { action, .. }) => &action.hashed.hash,
        Op::RegisterUpdate(RegisterUpdate { update, .. }) => &update.hashed.hash,
        Op::RegisterDelete(RegisterDelete { delete, .. }) => &delete.hashed.hash,
        Op::RegisterAgentActivity(RegisterAgentActivity { action, .. }) => &action.hashed.hash,
        Op::RegisterCreateLink(RegisterCreateLink { create_link }) => &create_link.hashed.hash,
        Op::RegisterDeleteLink(RegisterDeleteLink { delete_link, .. }) => &delete_link.hashed.hash,
    }
}
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
    match op.flattened::<EntryTypes, LinkTypes>()? {
        FlatOp::StoreEntry(store_entry) => match store_entry {
            OpEntry::CreateEntry { app_entry, action } => match app_entry {
                EntryTypes::Profile(profile) => {
                    validate_create_profile(EntryCreationAction::Create(action), profile)
                }
                EntryTypes::ProfileClaim(profile_claim) => validate_create_profile_claim(
                    EntryCreationAction::Create(action),
                    profile_claim,
                ),
            },
            OpEntry::UpdateEntry {
                app_entry, action, ..
            } => match app_entry {
                EntryTypes::Profile(profile) => {
                    validate_create_profile(EntryCreationAction::Update(action), profile)
                }
                EntryTypes::ProfileClaim(profile_claim) => validate_create_profile_claim(
                    EntryCreationAction::Update(action),
                    profile_claim,
                ),
            },
            _ => Ok(ValidateCallbackResult::Valid),
        },
        FlatOp::RegisterUpdate(update_entry) => match update_entry {
            OpUpdate::Entry { app_entry, action } => match app_entry {
                EntryTypes::Profile(profile) => {
                    validate_update_profile(action_hash(&op).clone(), action, profile)
                }
                EntryTypes::ProfileClaim(profile_claim) => {
                    validate_update_profile_claim(action, profile_claim)
                }
            },
            _ => Ok(ValidateCallbackResult::Valid),
        },
        FlatOp::RegisterDelete(delete_entry) => validate_delete_profile(delete_entry.action),
        FlatOp::RegisterCreateLink {
            link_type,
            base_address,
            target_address,
            tag,
            action,
        } => match link_type {
            LinkTypes::AgentToProfile => validate_create_link_agent_to_profile(
                action_hash(&op).clone(),
                action,
                base_address,
                target_address,
                tag,
            ),
            LinkTypes::PathToProfile => {
                validate_create_link_path_to_profile(action, base_address, target_address, tag)
            }
            LinkTypes::PrefixPath => {
                validate_create_link_prefix_path(action, base_address, target_address, tag)
            }
        },
        FlatOp::RegisterDeleteLink {
            link_type,
            base_address,
            target_address,
            tag,
            original_action,
            action,
        } => match link_type {
            LinkTypes::AgentToProfile => validate_delete_link_agent_to_profile(
                action,
                original_action,
                base_address,
                target_address,
                tag,
            ),
            LinkTypes::PathToProfile => validate_delete_link_path_to_profile(
                action,
                original_action,
                base_address,
                target_address,
                tag,
            ),
            LinkTypes::PrefixPath => validate_delete_link_prefix_path(
                action,
                original_action,
                base_address,
                target_address,
                tag,
            ),
        },
        FlatOp::StoreRecord(store_record) => match store_record {
            OpRecord::CreateEntry { app_entry, action } => match app_entry {
                EntryTypes::Profile(profile) => {
                    validate_create_profile(EntryCreationAction::Create(action), profile)
                }
                EntryTypes::ProfileClaim(profile_claim) => validate_create_profile_claim(
                    EntryCreationAction::Create(action),
                    profile_claim,
                ),
            },
            OpRecord::UpdateEntry {
                app_entry, action, ..
            } => match app_entry {
                EntryTypes::Profile(profile) => {
                    let result = validate_create_profile(
                        EntryCreationAction::Update(action.clone()),
                        profile.clone(),
                    )?;
                    let ValidateCallbackResult::Valid = result else {
                        return Ok(result);
                    };
                    validate_update_profile(action_hash(&op).clone(), action, profile)
                }
                EntryTypes::ProfileClaim(profile_claim) => {
                    let result = validate_create_profile_claim(
                        EntryCreationAction::Update(action.clone()),
                        profile_claim.clone(),
                    )?;
                    let ValidateCallbackResult::Valid = result else {
                        return Ok(result);
                    };
                    validate_update_profile_claim(action, profile_claim)
                }
            },
            OpRecord::DeleteEntry { action, .. } => validate_delete_profile(action),
            OpRecord::CreateLink {
                base_address,
                target_address,
                tag,
                link_type,
                action,
            } => match link_type {
                LinkTypes::AgentToProfile => validate_create_link_agent_to_profile(
                    action_hash(&op).clone(),
                    action,
                    base_address,
                    target_address,
                    tag,
                ),
                LinkTypes::PathToProfile => {
                    validate_create_link_path_to_profile(action, base_address, target_address, tag)
                }
                LinkTypes::PrefixPath => {
                    validate_create_link_prefix_path(action, base_address, target_address, tag)
                }
            },
            OpRecord::DeleteLink {
                original_action_hash,
                base_address,
                action,
            } => {
                let record = must_get_valid_record(original_action_hash)?;
                let create_link = match record.action() {
                    Action::CreateLink(create_link) => create_link.clone(),
                    _ => {
                        return Ok(ValidateCallbackResult::Invalid(
                            "The action that a DeleteLink deletes must be a CreateLink".to_string(),
                        ));
                    }
                };
                let link_type =
                    match LinkTypes::from_type(create_link.zome_index, create_link.link_type)? {
                        Some(lt) => lt,
                        None => {
                            return Ok(ValidateCallbackResult::Valid);
                        }
                    };
                match link_type {
                    LinkTypes::AgentToProfile => validate_delete_link_agent_to_profile(
                        action,
                        create_link.clone(),
                        base_address,
                        create_link.target_address,
                        create_link.tag,
                    ),
                    LinkTypes::PathToProfile => validate_delete_link_path_to_profile(
                        action,
                        create_link.clone(),
                        base_address,
                        create_link.target_address,
                        create_link.tag,
                    ),
                    LinkTypes::PrefixPath => validate_delete_link_prefix_path(
                        action,
                        create_link.clone(),
                        base_address,
                        create_link.target_address,
                        create_link.tag,
                    ),
                }
            }
            OpRecord::CreatePrivateEntry { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::UpdatePrivateEntry { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::CreateCapClaim { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::CreateCapGrant { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::UpdateCapClaim { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::UpdateCapGrant { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::Dna { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::OpenChain { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::CloseChain { .. } => Ok(ValidateCallbackResult::Valid),
            OpRecord::InitZomesComplete { .. } => Ok(ValidateCallbackResult::Valid),
            _ => Ok(ValidateCallbackResult::Valid),
        },
        FlatOp::RegisterAgentActivity(agent_activity) => match agent_activity {
            OpActivity::CreateAgent { agent, action } => {
                let previous_action = must_get_action(action.prev_action)?;
                match previous_action.action() {
					Action::AgentValidationPkg(AgentValidationPkg { membrane_proof, .. }) => {
						validate_agent_joining(agent, membrane_proof)
					}
					_ => Ok(ValidateCallbackResult::Invalid(
						"The previous action for a `CreateAgent` action must be an `AgentValidationPkg`"
							.to_string(),
					)),
				}
            }
            _ => Ok(ValidateCallbackResult::Valid),
        },
    }
}
