import { LinkedDevicesStore } from '@darksoil-studio/linked-devices';
import {
	AsyncComputed,
	AsyncSignal,
	collectionSignal,
	immutableEntrySignal,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	mapCompleted,
	pipe,
	queryLiveEntriesSignal,
	toPromise,
	uniquify,
} from '@holochain-open-dev/signals';
import {
	EntryRecord,
	HashType,
	LazyHoloHashMap,
	retype,
	slice,
} from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey, encodeHashToBase64 } from '@holochain/client';

import { ProfilesConfig, defaultConfig } from './config.js';
import { ProfilesClient } from './profiles-client.js';

export class ProfilesStore {
	config: ProfilesConfig;

	constructor(
		public client: ProfilesClient,
		public linkedDevicesStore?: LinkedDevicesStore,
		config: Partial<ProfilesConfig> = {},
	) {
		this.config = { ...defaultConfig, ...config };

		if (linkedDevicesStore) {
			linkedDevicesStore.client.onSignal(async signal => {
				// console.log(
				// 	'signal',
				// 	encodeHashToBase64(client.client.myPubKey),
				// 	signal,
				// );
				if (
					signal.type !== 'LinkCreated' ||
					signal.link_type !== 'AgentToLinkedDevices'
				)
					return;

				const linkedDevice = retype(
					signal.action.hashed.content.target_address,
					HashType.AGENT,
				);

				const myProfile = await toPromise(this.myProfile);

				if (myProfile !== undefined) return;

				const profileForLinkedDeviceLinks =
					await this.client.getAgentProfile(linkedDevice);

				if (profileForLinkedDeviceLinks.length > 0) {
					const profileForLinkedDevice = profileForLinkedDeviceLinks[0].target;
					await this.client.linkMyAgentToProfile(profileForLinkedDevice);
				}
			});
		}
	}

	/**
	 * Fetches the profiles for all agents in the DHT
	 */
	allProfiles = mapCompleted(
		collectionSignal(
			this.client,
			() => this.client.getAllProfiles(),
			'PathToProfile',
		),
		links => {
			const profileTargets = links.map(l => l.target);
			return slice(this.profiles, profileTargets);
		},
	);

	private agentToProfileLinks = new LazyHoloHashMap((agent: AgentPubKey) =>
		liveLinksSignal(
			this.client,
			agent,
			() => this.client.getAgentProfile(agent),
			'AgentToProfile',
		),
	);

	/**
	 * Fetches the profile for the given agent
	 */
	agentProfile = new LazyHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const links = this.agentToProfileLinks.get(agent).get();

				if (links.status !== 'completed') return links;
				if (links.value.length === 0)
					return {
						status: 'completed',
						value: undefined,
					};

				// TODO: handle multiple links gracefully

				const profileHash = links.value[0].target;
				return {
					status: 'completed',
					value: this.profiles.get(profileHash),
				};
			}),
	);

	agentsForProfile = new LazyHoloHashMap((profileHash: ActionHash) =>
		mapCompleted(
			liveLinksSignal(
				this.client,
				profileHash,
				() => this.client.getAgentsForProfile(profileHash),
				'ProfileToAgent',
			),
			links => uniquify(links.map(l => retype(l.target, HashType.AGENT))),
		),
	);

	profiles = new LazyHoloHashMap((profileHash: ActionHash) => ({
		profileHash,
		latestVersion: latestVersionOfEntrySignal(this.client, () =>
			this.client.getLatestProfile(profileHash),
		),
		original: immutableEntrySignal(() =>
			this.client.getOriginalProfile(profileHash),
		),
	}));

	// Fetches the profile for the active agent
	myProfile = this.agentProfile.get(this.client.client.myPubKey);
}
