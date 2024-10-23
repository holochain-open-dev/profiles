import { toPromise, watch } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { assert, test } from 'vitest';

import { sampleProfile } from '../../ui/src/mocks.js';
import { Profile } from '../../ui/src/types.js';
import { setup, setup3 } from './common.js';

test('create Profile and link agent', async () => {
	await runScenario(async scenario => {
		const { alice, bob, carol } = await setup3(scenario);

		let agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 0);
		watch(alice.store.allProfiles, () => {}); // store keepalive
		let myProfile = await toPromise(alice.store.myProfile);
		watch(alice.store.myProfile, () => {}); // store keepalive
		assert.notOk(myProfile);

		// Alice creates a Post
		const profile: EntryRecord<Profile> =
			await alice.store.client.createProfile(
				await sampleProfile(alice.store.client),
			);
		assert.ok(profile);

		await pause(1000); // Difference in time between the create the processing of the signal

		agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 1);

		const aliceProfileStatus = await toPromise(alice.store.myProfile);
		let agentsForProfile = await toPromise(
			alice.store.agentsForProfile.get(profile.actionHash),
		);
		assert.equal(agentsForProfile.length, 1);
		assert.equal(
			encodeHashToBase64(agentsForProfile[0]),
			encodeHashToBase64(alice.player.agentPubKey),
		);

		await alice.store.client.linkAgentWithMyProfile(bob.player.agentPubKey);

		agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 1);

		await waitUntil(async () => {
			const bobProfileStatus = await toPromise(bob.store.myProfile);
			return bobProfileStatus !== undefined;
		}, 30000); // Difference in time between the create the processing of the signal

		const bobProfileStatus = await toPromise(bob.store.myProfile);

		const aliceLatestProfile = await toPromise(
			aliceProfileStatus.latestVersion,
		);

		const bobLatestProfile = await toPromise(bobProfileStatus.latestVersion);

		assert.deepEqual(aliceLatestProfile, bobLatestProfile);

		agentsForProfile = await toPromise(
			alice.store.agentsForProfile.get(profile.actionHash),
		);
		assert.equal(agentsForProfile.length, 2);
		assert.ok(
			agentsForProfile.find(
				a =>
					encodeHashToBase64(a) === encodeHashToBase64(bob.player.agentPubKey),
			),
		);

		/** Bob's device now links carol's **/

		await bob.store.client.linkAgentWithMyProfile(carol.player.agentPubKey);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 1);

		await waitUntil(async () => {
			const carolProfileStatus = await toPromise(carol.store.myProfile);
			return carolProfileStatus !== undefined;
		}, 30000); // Difference in time between the create the processing of the signal

		const carolProfileStatus = await toPromise(carol.store.myProfile);

		const carolLatestProfile = await toPromise(
			carolProfileStatus.latestVersion,
		);

		assert.deepEqual(carolLatestProfile, bobLatestProfile);

		agentsForProfile = await toPromise(
			alice.store.agentsForProfile.get(profile.actionHash),
		);
		assert.equal(agentsForProfile.length, 3);
		assert.ok(
			agentsForProfile.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(carol.player.agentPubKey),
			),
		);
	});
});

async function waitUntil(condition: () => Promise<boolean>, timeout: number) {
	const start = Date.now();
	const isDone = await condition();
	if (isDone) return;
	if (timeout <= 0) throw new Error('timeout');
	await pause(1000);
	return waitUntil(condition, timeout - (Date.now() - start));
}
