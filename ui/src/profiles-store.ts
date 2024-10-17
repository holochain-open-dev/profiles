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
import { EntryRecord, LazyHoloHashMap, slice } from '@holochain-open-dev/utils';
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

		// At startup, clear all the cap grants that might have been left over from an unfinished link agent process
		this.client.clearLinkAgent();

		this.createClaimWhenLinked();
	}

	private async createClaimWhenLinked() {
		const myProfile = await toPromise(this.myProfile);

		if (myProfile !== undefined) return;

		effect(() => {
			const claims = this.myProfileClaims.get();

			if (claims.status !== 'completed' || claims.value.length > 0) return;

			// Expensive subscription
			const agentToProfileLinks = this.myProfileLinks.get();
			if (agentToProfileLinks.status !== 'completed') return;

			if (agentToProfileLinks.value.length > 0) {
				if (this._creatingClaim) return;
				this._creatingClaim = true;
				const link = agentToProfileLinks.value[0];
				this.client
					.createProfileClaim({
						profile_hash: link.target,
						agent_to_profile_create_link_hash: link.create_link_hash,
					})
					.then(() => (this._creatingClaim = false))
					.catch(() => (this._creatingClaim = false));
			}
		});
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
	private myProfileLinks = liveLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getAgentProfile(this.client.client.myPubKey),
		'AgentToProfile',
		1000,
	);

	agentProfile = new LazyHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const links = this.agentToProfileLinks.get(agent).get();

				if (links.status !== 'completed') return links;
				if (links.value.length > 0) {
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
				}

				if (
					encodeHashToBase64(agent) !==
					encodeHashToBase64(this.client.client.myPubKey)
				) {
					return {
						status: 'completed',
						value: undefined,
					};
				}

				const claims = this.myProfileClaims.get();

				if (claims.status !== 'completed') return claims;
				if (claims.value.length === 0)
					return {
						status: 'completed' as const,
						value: undefined,
					};
				return {
					status: 'completed' as const,
					value: this.profiles.get(claims.value[0].entry.profile_hash),
				};
			}),
	);

	/**
	 * Fetches the profile for the given agent
	 */
	profiles = new LazyHoloHashMap(
		(profileHash: ActionHash) => ({
			profileHash,
			latestVersion: latestVersionOfEntrySignal(this.client, () =>
				this.client.getLatestProfile(profileHash),
			),
			original: immutableEntrySignal(() =>
				this.client.getOriginalProfile(profileHash),
			),
		}),
		// 	 {
		// 	let unsubscribe: (() => void) | undefined;
		// 	const signal = new AsyncState<EntryRecord<Profile> | undefined>(
		// 		{ status: 'pending' },
		// 		{
		// 			[Signal.subtle.watched]: async () => {
		// 				const value = await this.client.getAgentProfile(agent);
		// 				signal.set({
		// 					status: 'completed',
		// 					value,
		// 				});
		// 				unsubscribe = this.client.onSignal(profilesSignal => {
		// 					if (this.client.client.myPubKey.toString() !== agent.toString())
		// 						return;
		// 					if (
		// 						!(
		// 							profilesSignal.type === 'EntryCreated' ||
		// 							profilesSignal.type === 'EntryUpdated'
		// 						)
		// 					)
		// 						return;
		// 					const record = new EntryRecord<Profile>({
		// 						entry: {
		// 							Present: {
		// 								entry_type: 'App',
		// 								entry: encode(profilesSignal.app_entry),
		// 							},
		// 						},
		// 						signed_action: profilesSignal.action,
		// 					});
		// 					signal.set({
		// 						status: 'completed',
		// 						value: record,
		// 					});
		// 				});
		// 			},
		// 			[Signal.subtle.unwatched]: () => {
		// 				signal.set({ status: 'pending' });
		// 				unsubscribe?.();
		// 			},
		// 		},
		// 	);
		// 	return signal;
		// }
	);

	// Fetches the profile for the active agent
	myProfile = this.agentProfile.get(this.client.client.myPubKey);

	myProfileClaims = queryLiveEntriesSignal(
		this.client,
		() => this.client.queryMyProfileClaims(),
		'ProfileClaim',
	);

	/** Link agents */
	linkingAgents = collectionSignal(
		this.client,
		() => this.client.getLinkingAgents(),
		'LinkingAgents',
		1000,
	);
}
