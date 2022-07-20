//! ## hc_zome_profiles
//! 
//! Profiles zome for any Holochain app.
//! 
//! If you need to manage profiles (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome in your DNA.
//! 
//! Read about how to include both this zome and its frontend module in your application [here](https://holochain-open-dev.github.io/profiles).

use hdi::prelude::*;
use hc_zome_profiles_types::*;

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    Profile(Profile)
}

#[hdk_link_types]
pub enum LinkTypes {
    PrefixPath,
    PathToProfile,
    AgentToProfile
}
