import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppClient,
	Link,
	Record,
	RoleName,
} from '@holochain/client';

import { Profile, ProfileClaim, ProfilesSignal } from './types.js';

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

	/** Agent linking functions */

	/**
	 * Links the given agent under the profile for the caller agent
	 * WARNING! Only call this function if you are completely confident that the linked
	 * agent belongs to the same person as this agent
	 *
	 * @returns the records for all the ProfileClaims in this source chain
	 */
	linkAgentWithMyProfile(agentPubKey: AgentPubKey) {
		return this.callZome('link_agent_with_my_profile', agentPubKey);
	}

	/**
	 * Queries the ProfileClaim entries stored in this agent's source chain
	 *
	 * @returns the records for all the ProfileClaims in this source chain
	 */
	async queryMyProfileClaims(): Promise<EntryRecord<ProfileClaim>[]> {
		const records: Record[] = await this.callZome(
			'query_my_profile_claims',
			null,
		);

		return records.map(r => new EntryRecord(r));
	}

	/**
	 * Create ProfileClaim
	 *
	 * @param profileClaim the ProfileClaim to create
	 */
	async createProfileClaim(
		profileClaim: ProfileClaim,
	): Promise<EntryRecord<Profile>> {
		const record: Record = await this.callZome(
			'create_profile_claim',
			profileClaim,
		);
		return new EntryRecord(record);
	}

	async clearAllLinkAgentsCapGrants() {
		await this.callZome('clear_all_link_agents_cap_grants', null);
	}

	async createLinkAgentCapGrant() {
		await this.callZome('create_link_agent_cap_grant', null);
	}
}
