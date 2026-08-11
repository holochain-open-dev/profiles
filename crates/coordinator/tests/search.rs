use std::collections::BTreeMap;

use hc_zome_profiles_coordinator::helper::ZomeFnInput;
use hc_zome_profiles_integrity::*;
use holochain::prelude::{AgentPubKey, Record};
use holochain::sweettest::*;

#[tokio::test(flavor = "multi_thread")]
async fn create_and_get() {
    // Use prebuilt DNA file
    let dna_path = std::env::current_dir()
        .unwrap()
        .join("../../workdir/profiles-test.dna");
    let dna = SweetDnaFile::from_bundle(&dna_path).await.unwrap();

    // Set up conductors
    let mut conductors =
        SweetConductorBatch::from_config_rendezvous(2, SweetConductorConfig::rendezvous(true)).await;
    let apps = conductors.setup_app("profiles", &[dna]).await.unwrap();
    conductors.exchange_peer_info().await;

    let ((alice,), (bobbo,)) = apps.into_tuples();

    let alice_zome = alice.zome("profiles");
    let bob_zome = bobbo.zome("profiles");

    let profile = Profile {
        nickname: String::from("ALIce"),
        fields: BTreeMap::from([(String::from("avatar"), String::from("aliceavatar"))]),
    };

    let _alice_profile: Record = conductors[0]
        .call(
            &alice_zome,
            "create_profile",
            ZomeFnInput {
                input: profile,
                local: None,
            },
        )
        .await;
    let _bobs_profile: Record = conductors[1]
        .call(
            &bob_zome,
            "create_profile",
            ZomeFnInput {
                input: Profile {
                    nickname: "bobbo".into(),
                    fields: BTreeMap::new(),
                },
                local: None,
            },
        )
        .await;

    let _result = await_consistency([&alice, &bobbo]).await;

    let agents_searched: Vec<AgentPubKey> = conductors[1]
        .call(
            &bob_zome,
            "search_agents",
            ZomeFnInput {
                input: String::from("ali"),
                local: None,
            },
        )
        .await;

    assert_eq!(agents_searched.len(), 1);
    assert_eq!(agents_searched[0], alice.agent_pubkey().clone());

    let agents_searched: Vec<AgentPubKey> = conductors[1]
        .call(
            &bob_zome,
            "search_agents",
            ZomeFnInput {
                input: String::from("alii"),
                local: None,
            },
        )
        .await;

    assert_eq!(agents_searched.len(), 0);

    let agents_searched: Vec<AgentPubKey> = conductors[1]
        .call(
            &bob_zome,
            "search_agents",
            ZomeFnInput {
                input: String::from("BoB"),
                local: None,
            },
        )
        .await;

    assert_eq!(agents_searched.len(), 1);
    assert_eq!(agents_searched[0], bobbo.agent_pubkey().clone());

    let agents_searched: Vec<AgentPubKey> = conductors[1]
        .call(
            &bob_zome,
            "search_agents",
            ZomeFnInput {
                input: String::from("asde"),
                local: None,
            },
        )
        .await;

    assert_eq!(agents_searched.len(), 0);

    let profiles_searched: Vec<Record> = conductors[1]
        .call(
            &bob_zome,
            "search_agents",
            ZomeFnInput {
                input: String::from("سعيدة"),
                local: None,
            },
        )
        .await;

    assert_eq!(profiles_searched.len(), 0);
}
