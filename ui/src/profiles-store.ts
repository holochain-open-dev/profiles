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
import { Profile } from './types.js';
import { effect } from './utils.js';

export class ProfilesStore {
	config: ProfilesConfig;

	protected _creatingClaim = false;

	constructor(
		public client: ProfilesClient,
		config: Partial<ProfilesConfig> = {},
	) {
		this.config = { ...defaultConfig, ...config };
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
				if (links.value.length > 1) {
					return {
						status: 'error',
						error: 'Agent has more than one profile',
					};
				}

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
			links => links.map(l => retype(l.target, HashType.AGENT)),
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
