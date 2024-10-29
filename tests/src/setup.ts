import { AppClient, AppWebsocket } from '@holochain/client';
import { Scenario, pause } from '@holochain/tryorama';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { ProfilesClient } from '../../ui/src/profiles-client.js';
import { ProfilesStore } from '../../ui/src/profiles-store.js';

export async function setup(scenario: Scenario) {
	const testHappUrl =
		dirname(fileURLToPath(import.meta.url)) +
		'/../../workdir/profiles-test.happ';

	// Add 2 players with the test hApp to the Scenario. The returned players
	// can be destructured.
	const [alice, bob] = await scenario.addPlayersWithApps([
		{ appBundleSource: { path: testHappUrl } },
		{ appBundleSource: { path: testHappUrl } },
	]);
	await alice.conductor
		.adminWs()
		.authorizeSigningCredentials(alice.cells[0].cell_id);

	await bob.conductor
		.adminWs()
		.authorizeSigningCredentials(bob.cells[0].cell_id);

	const aliceStore = new ProfilesStore(
		new ProfilesClient(alice.appWs as AppClient, 'profiles-test', 'profiles'),
	);

	const bobStore = new ProfilesStore(
		new ProfilesClient(bob.appWs as AppClient, 'profiles-test', 'profiles'),
	);
	patchCallZome(alice.appWs as AppWebsocket);
	patchCallZome(bob.appWs as AppWebsocket);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	// Prevent race condition when two zome calls are made instantly at the beginning of the lifecycle that cause a ChainHeadMoved error because they trigger 2 parallel init workflows
	await aliceStore.client.getAllProfiles();
	await bobStore.client.getAllProfiles();

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

export async function setup3(scenario: Scenario) {
	const testHappUrl =
		dirname(fileURLToPath(import.meta.url)) +
		'/../../workdir/profiles-test.happ';

	// Add 2 players with the test hApp to the Scenario. The returned players
	// can be destructured.
	const [alice, bob, carol] = await scenario.addPlayersWithApps([
		{ appBundleSource: { path: testHappUrl } },
		{ appBundleSource: { path: testHappUrl } },
		{ appBundleSource: { path: testHappUrl } },
	]);
	await alice.conductor
		.adminWs()
		.authorizeSigningCredentials(alice.cells[0].cell_id);

	await bob.conductor
		.adminWs()
		.authorizeSigningCredentials(bob.cells[0].cell_id);

	await carol.conductor
		.adminWs()
		.authorizeSigningCredentials(carol.cells[0].cell_id);

	const aliceStore = new ProfilesStore(
		new ProfilesClient(alice.appWs as AppClient, 'profiles-test', 'profiles'),
	);
	patchCallZome(alice.appWs as AppWebsocket);

	const bobStore = new ProfilesStore(
		new ProfilesClient(bob.appWs as AppClient, 'profiles-test', 'profiles'),
	);
	patchCallZome(bob.appWs as AppWebsocket);

	const carolStore = new ProfilesStore(
		new ProfilesClient(carol.appWs as AppClient, 'profiles-test', 'profiles'),
	);
	patchCallZome(carol.appWs as AppWebsocket);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	// Prevent race condition when two zome calls are made instantly at the beginning of the lifecycle that cause a ChainHeadMoved error because they trigger 2 parallel init workflows
	await aliceStore.client.getAllProfiles();
	await bobStore.client.getAllProfiles();
	await carolStore.client.getAllProfiles();

	return {
		alice: {
			player: alice,
			store: aliceStore,
		},
		bob: {
			player: bob,
			store: bobStore,
		},
		carol: {
			player: carol,
			store: carolStore,
		},
	};
}

export function patchCallZome(appWs: AppWebsocket) {
	const callZome = appWs.callZome;

	appWs.callZome = async req => {
		try {
			const result = await callZome(req);
			return result;
		} catch (e) {
			if (
				!e.toString().includes('Socket is not open') &&
				!e.toString().includes('ClientClosedWithPendingRequests')
			) {
				throw e;
			}
		}
	};
}
