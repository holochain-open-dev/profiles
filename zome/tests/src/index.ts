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

    let profileHash = await conductor.call(
      "alice",
      "profiles",
      "create_profile",
      {
        username: "alice",
      }
    );
    console.log(profileHash)
    t.ok(profileHash);

    await sleep(10);

    let profiles = await conductor.call(
      "bobbo",
      "profiles",
      "get_all_profiles",
      null
    );
    t.equal(profiles.length, 1);
    t.ok(profiles[0].agent_pub_key);
    t.equal(profiles[0].profile.username, 'alice');

    let myProfile = await conductor.call(
      "alice",
      "profiles",
      "get_my_profile",
      null
    );
    t.ok(myProfile.agent_pub_key);
    t.equal(myProfile.profile.username, 'alice');
  }
);

orchestrator.run();
