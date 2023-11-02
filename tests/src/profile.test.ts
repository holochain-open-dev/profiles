import { assert, test } from "vitest";

import { runScenario, dhtSync, pause } from "@holochain/tryorama";
import {
  NewEntryAction,
  ActionHash,
  Record,
  AppBundleSource,
  fakeDnaHash,
  fakeActionHash,
  fakeAgentPubKey,
  fakeEntryHash,
} from "@holochain/client";
import { decode } from "@msgpack/msgpack";
import { EntryRecord } from "@holochain-open-dev/utils";
import { get, toPromise } from "@holochain-open-dev/stores";

import { Profile } from "../../ui/src/types.js";
import { sampleProfile } from "../../ui/src/mocks.js";
import { setup } from "./common.js";

test("create Profile", async () => {
  await runScenario(async (scenario) => {
    const { alice, bob } = await setup(scenario);

    let myProfile = await toPromise(alice.store.myProfile);
    alice.store.myProfile.subscribe(() => {}); // store keepalive
    assert.notOk(myProfile);

    // Alice creates a Post
    const profile: EntryRecord<Profile> =
      await alice.store.client.createProfile(
        await sampleProfile(alice.store.client)
      );
    assert.ok(profile);

    const profileStatus = get(alice.store.myProfile);
    assert.equal(profileStatus.status, "complete");
    assert.ok((profileStatus as any).value);
  });
});
