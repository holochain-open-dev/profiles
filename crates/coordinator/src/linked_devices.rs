use hc_zome_profiles_integrity::LinkTypes;
use hdk::prelude::*;

#[hdk_extern]
pub fn link_my_agent_to_profile(profile_hash: ActionHash) -> ExternResult<()> {
    let my_pub_key = agent_info()?.agent_latest_pubkey;
    create_link_relaxed(
        my_pub_key.clone(),
        profile_hash.clone(),
        LinkTypes::AgentToProfile,
        (),
    )?;
    create_link_relaxed(profile_hash, my_pub_key, LinkTypes::ProfileToAgent, ())?;

    Ok(())
}

pub fn create_link_relaxed<T, E>(
    base_address: impl Into<AnyLinkableHash>,
    target_address: impl Into<AnyLinkableHash>,
    link_type: T,
    tag: impl Into<LinkTag>,
) -> ExternResult<()>
where
    ScopedLinkType: TryFrom<T, Error = E>,
    WasmError: From<E>,
{
    let ScopedLinkType {
        zome_index,
        zome_type: link_type,
    } = link_type.try_into()?;
    HDK.with(|h| {
        h.borrow().create_link(CreateLinkInput::new(
            base_address.into(),
            target_address.into(),
            zome_index,
            link_type,
            tag.into(),
            ChainTopOrdering::Relaxed,
        ))
    })?;

    Ok(())
}
