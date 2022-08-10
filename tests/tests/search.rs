use std::collections::BTreeMap;

use hc_zome_profiles_coordinator_types::*;
use hc_zome_profiles_integrity_types::*;
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

    let profile = Profile {
        nickname: String::from("ALIce"),
        fields: BTreeMap::from([(String::from("avatar"), String::from("aliceavatar"))]),
    };

    let alice_profile: Record = conductors[0]
        .call(&alice_zome, "create_profile", profile)
        .await;
    let bobs_profile: Record = conductors[1]
        .call(
            &bob_zome,
            "create_profile",
            Profile {
                nickname: "bobbo".into(),
                fields: BTreeMap::new(),
            },
        )
        .await;

    consistency_10s(&[&alice, &bobbo]).await;

    let profiles_searched: Vec<Record> = conductors[1]
        .call(
            &bob_zome,
            "search_profiles",
            SearchProfilesInput {
                nickname_prefix: "ali".into(),
            },
        )
        .await;

    assert_eq!(profiles_searched.len(), 1);
    assert_eq!(profiles_searched[0], alice_profile);

    let profiles_searched: Vec<Record> = conductors[1]
        .call(
            &bob_zome,
            "search_profiles",
            SearchProfilesInput {
                nickname_prefix: "BoB".into(),
            },
        )
        .await;

    assert_eq!(profiles_searched.len(), 1);
    assert_eq!(profiles_searched[0], bobs_profile);

    let profiles_searched: Vec<Record> = conductors[1]
        .call(
            &bob_zome,
            "search_profiles",
            SearchProfilesInput {
                nickname_prefix: "asde".into(),
            },
        )
        .await;

    assert_eq!(profiles_searched.len(), 0);
}
