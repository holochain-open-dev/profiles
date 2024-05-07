import { Scenario } from "@holochain/tryorama";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ProfilesClient } from "../../ui/src/profiles-client.js";
import { ProfilesStore } from "../../ui/src/profiles-store.js";

export async function setup(scenario: Scenario) {
  const testHappUrl =
    dirname(fileURLToPath(import.meta.url)) +
    "/../../workdir/profiles-test.happ";

  // Add 2 players with the test hApp to the Scenario. The returned players
  // can be destructured.
  const [alice, bob] = await scenario.addPlayersWithApps([
    { appBundleSource: { path: testHappUrl } },
    { appBundleSource: { path: testHappUrl } },
  ]);

  // Shortcut peer discovery through gossip and register all agents in every
  // conductor of the scenario.
  await scenario.shareAllAgents();

  const aliceStore = new ProfilesStore(
    new ProfilesClient(alice.appWs as any, "profiles-test", "profiles")
  );

  const bobStore = new ProfilesStore(
    new ProfilesClient(bob.appWs as any, "profiles-test", "profiles")
  );

  // Shortcut peer discovery through gossip and register all agents in every
  // conductor of the scenario.
  await scenario.shareAllAgents();

  return {
    alice: {
      player: alice,
      store: aliceStore,
    },
    bob: {
      player: bob,
      store: bobStore,
    },
  };
}
