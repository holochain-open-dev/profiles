import { toPromise, watch } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { assert, test } from 'vitest';

import { sampleProfile } from '../../ui/src/mocks.js';
import { Profile } from '../../ui/src/types.js';
import { setup } from './common.js';

test('create Profile', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		let agentsWithProfile = await toPromise(alice.store.agentsWithProfile$);
		assert.equal(agentsWithProfile.length, 0);
		watch(alice.store.agentsWithProfile$, () => {}); // store keepalive
		let myProfile = await toPromise(alice.store.myProfile$);
		watch(alice.store.myProfile$, () => {}); // store keepalive
		assert.notOk(myProfile);

		// Alice creates a Post
		const profile: EntryRecord<Profile> =
			await alice.store.client.createProfile(
				await sampleProfile(alice.store.client),
			);
		assert.ok(profile);

		await pause(1000); // Difference in time between the create the processing of the signal

		agentsWithProfile = await toPromise(alice.store.agentsWithProfile$);
		assert.equal(agentsWithProfile.length, 1);

		const profileStatus = alice.store.myProfile$.get();
		assert.equal(profileStatus.status, 'completed');
		assert.ok((profileStatus as any).value);
	});
});
