import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
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
	 * Get the profile for the given agent, if they have created it
	 *
	 * @param agentPubKey the agent to get the profile for
	 * @returns the profile of the agent, if they have created one
	 */
	async getAgentProfile(
		agentPubKey: AgentPubKey,
	): Promise<EntryRecord<Profile> | undefined> {
		const record: Record | undefined = await this.callZome(
			'get_agent_profile',
			agentPubKey,
		);

		return record ? new EntryRecord(record) : undefined;
	}

	/**
	 * Search profiles that start with nicknameFilter
	 *
	 * @param nicknameFilter must be of at least 3 characters
	 * @returns the agents with the nickname starting with nicknameFilter
	 */
	async searchAgents(nicknameFilter: string): Promise<AgentPubKey[]> {
		return this.callZome('search_agents', nicknameFilter);
	}

	/**
	 * Get all the agents in the DHT that have created a profile
	 *
	 * @returns the agent public keys of all agents that have created a profile
	 */
	async getAgentsWithProfile(): Promise<Link[]> {
		return this.callZome('get_agents_with_profile', null);
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
	async updateProfile(profile: Profile): Promise<EntryRecord<Profile>> {
		const record: Record = await this.callZome('update_profile', profile);
		return new EntryRecord(record);
	}
}
