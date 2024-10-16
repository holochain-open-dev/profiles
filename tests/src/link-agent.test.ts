import { toPromise, watch } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
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

		await alice.store.client.linkAgentWithMyProfile(bob.player.agentPubKey);

		agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 1);

		await pause(30_000); // Difference in time between the create the processing of the signal

		const bobProfileStatus = await toPromise(bob.store.myProfile);

		const aliceLatestProfile = await toPromise(
			aliceProfileStatus.latestVersion,
		);

		const bobLatestProfile = await toPromise(bobProfileStatus.latestVersion);

		assert.deepEqual(aliceLatestProfile, bobLatestProfile);

		/** Bob's device now links carol's **/

		await bob.store.client.linkAgentWithMyProfile(carol.player.agentPubKey);

		agentsWithProfile = await toPromise(alice.store.allProfiles);
		assert.equal(agentsWithProfile.size, 1);

		await pause(30_000); // Difference in time between the create the processing of the signal

		const carolProfileStatus = await toPromise(carol.store.myProfile);

		const carolLatestProfile = await toPromise(
			carolProfileStatus.latestVersion,
		);

		assert.deepEqual(carolLatestProfile, bobLatestProfile);
	});
});
