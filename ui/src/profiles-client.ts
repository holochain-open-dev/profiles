import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppClient,
	Link,
	Record,
	RoleName,
} from '@holochain/client';

import { Profile, ProfilesSignal } from './types.js';

export class ProfilesClient extends ZomeClient<ProfilesSignal> {
	constructor(
		public client: AppClient,
		public roleName: RoleName,
		public zomeName = 'profiles',
	) {
		super(client as any, roleName, zomeName);
	}

	/**
	 * Get the profiles links for the given agent
	 *
	 * @param agentPubKey the agent to get the profileHash for
	 * @returns the links pointing to the profile of the agent, can't be more than one
	 */
	async getAgentProfile(agentPubKey: AgentPubKey): Promise<Array<Link>> {
		return this.callZome('get_agent_profile', agentPubKey);
	}

	/**
	 * Get the agents links for the given profile
	 *
	 * @param profileHash the profile to get all the agents for
	 * @returns the links pointing to all the agents for the given profile
	 */
	async getAgentsForProfile(profileHash: ActionHash): Promise<Array<Link>> {
		return this.callZome('get_agents_for_profile', profileHash);
	}

	/**
	 * Get the latest version of profile, if they have created it
	 *
	 * @param profileHash the profileHash to get the latest version for
	 * @returns the latest version of the profile
	 */
	async getLatestProfile(
		profileHash: ActionHash,
	): Promise<EntryRecord<Profile> | undefined> {
		const record: Record | undefined = await this.callZome(
			'get_latest_profile',
			profileHash,
		);

		return record ? new EntryRecord(record) : undefined;
	}

	/**
	 * Get the original profile for the given agent, if they have created it
	 *
	 * @param profileHash the profileHash to get the original version for
	 * @returns the original version of the profile
	 */
	async getOriginalProfile(
		profileHash: ActionHash,
	): Promise<EntryRecord<Profile> | undefined> {
		const record: Record | undefined = await this.callZome(
			'get_original_profile',
			profileHash,
		);

		return record ? new EntryRecord(record) : undefined;
	}

	/**
	 * Search profiles that start with nicknameFilter
	 *
	 * @param nicknameFilter must be of at least 3 characters
	 * @returns the agents with the nickname starting with nicknameFilter
	 */
	async searchProfiles(nicknameFilter: string): Promise<ActionHash[]> {
		return this.callZome('search_profiles', nicknameFilter);
	}

	/**
	 * Get links to all profiles in the DHT
	 *
	 * @returns the links with targets to all the profiles
	 */
	async getAllProfiles(): Promise<Link[]> {
		return this.callZome('get_all_profiles', null);
	}

	/**
	 * Create my profile
	 *
	 * @param profile the profile to create
	 */
	async createProfile(profile: Profile): Promise<EntryRecord<Profile>> {
		const record: Record = await this.callZome('create_profile', profile);
		return new EntryRecord(record);
	}

	async linkMyAgentToProfile(profileHash: ActionHash) {
		await this.callZome('link_my_agent_to_profile', profileHash);
	}

	/**
	 * Update my profile
	 *
	 * @param profile the profile to create
	 */
	async updateProfile(
		previousProfileHash: ActionHash,
		updatedProfile: Profile,
	): Promise<EntryRecord<Profile>> {
		const record: Record = await this.callZome('update_profile', {
			previous_profile_hash: previousProfileHash,
			updated_profile: updatedProfile,
		});
		return new EntryRecord(record);
	}
}
