import {
  EntryRecord,
  ZomeClient,
} from "@holochain-open-dev/utils";
import {
  AgentPubKey,
  Record,
  AppClient,
  RoleName,
} from "@holochain/client";
import { Profile, ProfilesSignal } from "./types";

export class ProfilesClient extends ZomeClient<ProfilesSignal> {
  constructor(
    public client: AppClient,
    public roleName: RoleName,
    public zomeName = "profiles"
  ) {
    super(client, roleName, zomeName);
  }

  /**
   * Get the profile for the given agent, if they have created it
   *
   * @param agentPubKey the agent to get the profile for
   * @param local Whether to use `GetStrategy::Local`. Default is `GetStrategy::Network`.
   * @returns the profile of the agent, if they have created one
   */
  async getAgentProfile(
    agentPubKey: AgentPubKey,
    local?: boolean,
  ): Promise<EntryRecord<Profile> | undefined> {
    if (local === undefined) local = true
    const record: Record | undefined = await this.callZome(
      "get_agent_profile",
      { input: agentPubKey, local }
    );

    return record ? new EntryRecord(record) : undefined;
  }

  /**
   * Search profiles that start with nicknameFilter
   *
   * @param nicknameFilter must be of at least 3 characters
   * @param local Whether to use `GetStrategy::Local`. Default is `GetStrategy::Network`.
   * @returns the agents with the nickname starting with nicknameFilter
   */
  async searchAgents(nicknameFilter: string, local?: boolean): Promise<AgentPubKey[]> {
    if (local === undefined) local = true
    return this.callZome("search_agents", { input: nicknameFilter, local });
  }

  /**
   * Get all the agents in the DHT that have created a profile
   *
   * @param local Whether to use `GetStrategy::Local`. Default is `GetStrategy::Network`.
   * @returns the agent public keys of all agents that have created a profile
   */
  async getAgentsWithProfile(local?: boolean): Promise<AgentPubKey[]> {
    if (local === undefined) local = true
    return this.callZome("get_agents_with_profile", { input: null, local });
  }

  /**
   * Create my profile
   *
   * @param profile the profile to create
   */
  async createProfile(profile: Profile): Promise<EntryRecord<Profile>> {
    const record: Record = await this.callZome("create_profile", profile);
    return new EntryRecord(record);
  }

  /**
   * Update my profile
   *
   * @param profile the profile to create
   */
  async updateProfile(profile: Profile): Promise<EntryRecord<Profile>> {
    const record: Record = await this.callZome("update_profile", profile);
    return new EntryRecord(record);
  }
}
