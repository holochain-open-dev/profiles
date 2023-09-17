import { decodeEntry, ZomeClient } from "@holochain-open-dev/utils";
import {
  AgentPubKey,
  Record,
  AppAgentClient,
  RoleName,
} from "@holochain/client";
import { CreateProfileInput, Profile, ProfilesSignal } from "./types";

export class ProfilesClient extends ZomeClient<ProfilesSignal> {
  constructor(
    public client: AppAgentClient,
    public roleName: RoleName,
    public zomeName = "profiles"
  ) {
    super(client, roleName, zomeName);
  }

  /**
   * Get the profile for the given agent, if they have created it
   *
   * @param agentPubKey the agent to get the profile for
   * @returns the profile of the agent, if they have created one
   */
  async getAgentProfile(
    agentPubKey: AgentPubKey
  ): Promise<Profile | undefined> {
    const record: Record | undefined = await this.callZome(
      "get_agent_profile",
      agentPubKey
    );

    return record ? decodeEntry(record) : undefined;
  }

  /**
   * Search profiles that start with nicknameFilter
   *
   * @param nicknameFilter must be of at least 3 characters
   * @returns the agents with the nickname starting with nicknameFilter
   */
  async searchAgents(nicknameFilter: string): Promise<AgentPubKey[]> {
    return this.callZome("search_agents", nicknameFilter);
  }

  /**
   * Get all the agents in the DHT that have created a profile
   *
   * @returns the agent public keys of all agents that have created a profile
   */
  async getAgentsWithProfile(): Promise<AgentPubKey[]> {
    return this.callZome("get_agents_with_profile", null);
  }

  /**
   * Create my profile
   *
   * @param profile the profile to create
   */
  async createProfile(profile: CreateProfileInput): Promise<void> {
    return this.callZome("create_profile", profile);
  }

  /**
   * Update my profile
   *
   * @param profile the profile to create
   */
  async updateProfile(profile: CreateProfileInput): Promise<void> {
    return this.callZome("update_profile", profile);
  }
}
