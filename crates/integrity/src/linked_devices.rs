use hdi::prelude::*;

pub fn linked_devices_integrity_zome_name() -> Option<ZomeName> {
    match std::option_env!("LINKED_DEVICES_INTEGRITY_ZOME_NAME") {
        Some(zome_name) => Some(zome_name.into()),
        None => None,
    }
}
