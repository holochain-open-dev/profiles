use std::collections::BTreeMap;

use hc_zome_profiles_integrity::*;
use hdk::prelude::*;
use holochain::test_utils::consistency_10s;
use holochain::{conductor::config::ConductorConfig, sweettest::*};

#[tokio::test(flavor = "multi_thread")]
async fn create_and_get() {
    // Use prebuilt DNA file
    let dna_path = std::env::current_dir()
        .unwrap()
        .join("../workdir/dna/profiles-test.dna");
    let dna = SweetDnaFile::from_bundle(&dna_path).await.unwrap();

    // Set up conductors
    let mut conductors = SweetConductorBatch::from_config(2, ConductorConfig::default()).await;
    let apps = conductors.setup_app("profiles", &[dna]).await.unwrap();
    conductors.exchange_peer_info().await;

    let ((alice,), (bobbo,)) = apps.into_tuples();

    let alice_zome = alice.zome("profiles");
    let bob_zome = bobbo.zome("profiles");

    let alice_pub_key = alice.agent_pubkey();

    // Try to get my profile before creating one. Should return None.
    let record_1: Option<Record> = conductors[0]
        .call(&alice_zome, "get_agent_profile", alice_pub_key)
        .await;
    assert_eq!(record_1, None);

    // Create profile for alice and try to get it via get_my_profile() as well as get_agent_profile()
    let profile = Profile {
        nickname: String::from("alice"),
        fields: BTreeMap::new(),
    };

    let record_1: Record = conductors[0]
        .call(&alice_zome, "create_profile", profile)
        .await;

    consistency_10s([&alice, &bobbo]).await;

    let record_2: Option<Record> = conductors[0]
        .call(&alice_zome, "get_agent_profile", alice_pub_key)
        .await;

    assert_eq!(record_1, record_2.unwrap());

    let record_2: Option<Record> = conductors[1]
        .call(&bob_zome, "get_agent_profile", alice.agent_pubkey())
        .await;

    assert_eq!(record_1, record_2.unwrap());

    // Update alice's profile and again try to get it via get_my_profile() as well as get_agent_profile()
    let profile = Profile {
        nickname: String::from("alice2"),
        fields: BTreeMap::new(),
    };

    let _record_1: Record = conductors[0]
        .call(&alice_zome, "update_profile", profile.clone())
        .await;

    consistency_10s([&alice, &bobbo]).await;

    // ---> get it over the DHT though get_agent_profile()
    let alices_profile: Option<Record> = conductors[1]
        .call(&bob_zome, "get_agent_profile", alice.agent_pubkey())
        .await;

    if let Some(Record {
        entry: RecordEntry::Present(entry),
        ..
    }) = alices_profile.clone()
    {
        let profile_entry = Profile::try_from(entry).unwrap();
        assert_eq!(profile_entry.nickname, profile.nickname);
    } else {
        panic!("Bad record");
    }

    // ---> get it from alice's source chain through get_my_profile()
    let alices_profile_from_source_chain: Option<Record> = conductors[0]
        .call(&alice_zome, "get_agent_profile", alice_pub_key)
        .await;

    if let Some(Record {
        entry: RecordEntry::Present(entry),
        ..
    }) = alices_profile_from_source_chain.clone()
    {
        let profile_entry = Profile::try_from(entry).unwrap();
        assert_eq!(profile_entry.nickname, profile.nickname);
    } else {
        panic!("Bad record");
    }

    // Create another profile for bob as well and call get_all_profiles() to check whether we get all two profiles
    let _bobs_profile: Record = conductors[1]
        .call(
            &bob_zome,
            "create_profile",
            Profile {
                nickname: "bob".into(),
                fields: BTreeMap::new(),
            },
        )
        .await;

    let all_agents: Vec<AgentPubKey> = conductors[1].call(&bob_zome, "get_all_agents", ()).await;

    assert_eq!(all_agents.len(), 2);
}
