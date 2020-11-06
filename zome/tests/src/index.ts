import { Orchestrator, Config } from "@holochain/tryorama";

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const orchestrator = new Orchestrator();

export const simpleConfig = {
  alice: Config.dna("../profiles.dna.gz", null),
  bobbo: Config.dna("../profiles.dna.gz", null),
};

orchestrator.registerScenario(
  "create and get a calendar event",
  async (s, t) => {
    const { conductor } = await s.players({
      conductor: Config.gen(simpleConfig),
    });
    await conductor.spawn();

    let myProfile = await conductor.call(
      "alice",
      "profiles",
      "get_my_profile",
      null
    );
    t.notOk(myProfile);

    let profileHash = await conductor.call(
      "alice",
      "profiles",
      "create_profile",
      {
        username: "alice",
        fields: {
          avatar: "aliceavatar",
        },
      }
    );
    t.ok(profileHash);

    await sleep(100);

    try {
      profileHash = await conductor.call(
        "bobbo",
        "profiles",
        "create_profile",
        {
          username: "alice",
          fields: {
            avatar: "avatar",
          },
        }
      );
      t.ok(false);
    } catch (e) {}

    profileHash = await conductor.call("bobbo", "profiles", "create_profile", {
      username: "bobbo",
      fields: {
        avatar: "bobboavatar",
      },
    });
    t.ok(profileHash);

    await sleep(10);

    myProfile = await conductor.call(
      "alice",
      "profiles",
      "get_my_profile",
      null
    );
    t.ok(myProfile.agent_pub_key);
    t.equal(myProfile.profile.username, "alice");

    let profiles = await conductor.call(
      "bobbo",
      "profiles",
      "search_profiles",
      { username_prefix: "sdf" }
    );
    t.equal(profiles.length, 0);

    profiles = await conductor.call("bobbo", "profiles", "search_profiles", {
      username_prefix: "alic",
    });
    t.equal(profiles.length, 1);
    t.ok(profiles[0].agent_pub_key);
    t.equal(profiles[0].profile.username, "alice");

    profiles = await conductor.call("bobbo", "profiles", "search_profiles", {
      username_prefix: "ali",
    });
    t.equal(profiles.length, 1);
    t.ok(profiles[0].agent_pub_key);
    t.equal(profiles[0].profile.username, "alice");
    t.equal(profiles[0].profile.fields.avatar, "aliceavatar");

    profiles = await conductor.call("bobbo", "profiles", "search_profiles", {
      username_prefix: "alice",
    });
    t.equal(profiles.length, 1);
    t.ok(profiles[0].agent_pub_key);
    t.equal(profiles[0].profile.username, "alice");

    profiles = await conductor.call("bobbo", "profiles", "search_profiles", {
      username_prefix: "bob",
    });
    t.equal(profiles.length, 1);
    t.ok(profiles[0].agent_pub_key);
    t.equal(profiles[0].profile.username, "bobbo");
    t.equal(profiles[0].profile.fields.avatar, "bobboavatar");
  }
);

orchestrator.run();
