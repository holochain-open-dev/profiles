import { assert, test } from "vitest";

import { runScenario, dhtSync, pause } from "@holochain/tryorama";
import { EntryRecord } from "@holochain-open-dev/utils";
import { get, toPromise } from "@holochain-open-dev/stores";

import { Profile } from "../../ui/src/types.js";
import { sampleProfile } from "../../ui/src/mocks.js";
import { setup } from "./common.js";

test("create Profile", async () => {
  await runScenario(async (scenario) => {
    const { alice, bob } = await setup(scenario);

    let agentsWithProfile = await toPromise(alice.store.agentsWithProfile);
    assert.equal(agentsWithProfile.length, 0);
    alice.store.agentsWithProfile.subscribe(() => {}); // store keepalive
    let myProfile = await toPromise(alice.store.myProfile);
    alice.store.myProfile.subscribe(() => {}); // store keepalive
    assert.notOk(myProfile);

    // Alice creates a Post
    const profile: EntryRecord<Profile> =
      await alice.store.client.createProfile(
        await sampleProfile(alice.store.client)
      );
    assert.ok(profile);

    await pause(100); // Difference in time between the create the processing of the signal

    agentsWithProfile = await toPromise(alice.store.agentsWithProfile);
    assert.equal(agentsWithProfile.length, 1);

    const profileStatus = get(alice.store.myProfile);
    assert.equal(profileStatus.status, "complete");
    assert.ok((profileStatus as any).value);
  });
});
