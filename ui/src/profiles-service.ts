import { AgentPubKey, Record, AppAgentClient, AppAgentCallZomeRequest } from '@holochain/client';
import { Agent } from 'http';
import { Profile } from './types';

export class ProfilesService {
  constructor(public client: AppAgentClient, public zomeName = 'profiles', public roleName = 'profiles') {}


  /**
   * Get my agentkey, if it has been created
   * @returns my AgentPubKey
   */
  myPubKey(): AgentPubKey {
    return this.client.myPubKey
  }

  /**
   * Get my profile, if it has been created
   * @returns my profile
   */
  async getMyProfile(): Promise<Record> {
    return this.callZome('get_my_profile', null);
  }

  /**
   * Get the profile for the given agent, if they have created it
   *
   * @param agentPubKey the agent to get the profile for
   * @returns the profile of the agent
   */
  async getAgentProfile(agentPubKey: AgentPubKey): Promise<Record | undefined> {
    return this.callZome('get_agent_profile', agentPubKey);
  }

  /**
   * Get the profiles for the given agent
   *
   * @param agentPubKeys the agents to get the profile for
   * @returns the profile of the agents, in the same order as the input parameters
   */
  async getAgentsProfiles(agentPubKeys: AgentPubKey[]): Promise<Record[]> {
    return this.callZome('get_agents_profiles', agentPubKeys);
  }

  /**
   * Search profiles that start with nicknamePrefix
   *
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the profiles with the nickname starting with nicknamePrefix
   */
  async searchProfiles(nicknamePrefix: string): Promise<Array<Record>> {
    return this.callZome('search_profiles', {
      nickname_prefix: nicknamePrefix,
    });
  }

  /**
   * Get the profiles for all the agents in the DHT
   *
   * @returns the profiles for all the agents in the DHT
   */
  async getAllProfiles(): Promise<Record[]> {
    return this.callZome('get_all_profiles', null);
  }

  /**
   * Create my profile
   *
   * @param profile the profile to create
   * @returns my profile with my agentPubKey
   */
  async createProfile(profile: Profile): Promise<Record> {
    return this.callZome('create_profile', profile);
  }

  /**
   * Update my profile
   *
   * @param profile the profile to create
   * @returns my profile with my agentPubKey
   */
  async updateProfile(profile: Profile): Promise<Record> {
    return this.callZome('update_profile', profile);
  }

  private callZome(fn_name: string, payload: any) {
    // @ts-ignore
    const req: AppAgentCallZomeRequest = {
      role_name: this.roleName,
      zome_name: this.zomeName,
      fn_name,
      payload
    }
    return this.client.callZome(req);
  }
}
