use hdk::prelude::*;

use hc_zome_profiles_integrity::*;

#[hdk_extern]
pub fn create_profile_claim(profile_claim: ProfileClaim) -> ExternResult<()> {
    create_relaxed(EntryTypes::ProfileClaim(profile_claim))?;

    Ok(())
}
pub fn create_relaxed(entry_type: EntryTypes) -> ExternResult<()> {
    HDK.with(|h| {
        let index = ScopedEntryDefIndex::try_from(&entry_type)?;
        let vis = EntryVisibility::from(&entry_type);
        let entry = Entry::try_from(entry_type)?;

        h.borrow().create(CreateInput::new(
            index,
            vis,
            entry,
            // This is used to test many conductors thrashing creates between
            // each other so we want to avoid retries that make the test take
            // a long time.
            ChainTopOrdering::Relaxed,
        ))
    })?;

    Ok(())
}

#[hdk_extern]
pub fn query_my_profile_claims() -> ExternResult<Vec<Record>> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::ProfileClaim.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    Ok(records)
}
