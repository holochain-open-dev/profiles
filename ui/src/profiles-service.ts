import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { AgentProfile, Profile } from './types';

export class ProfilesService {
  constructor(public cellClient: CellClient, public zomeName = 'profiles') {}

  /**
   * Get my profile, if it has been created
   * @returns my profile
   */
  async getMyProfile(): Promise<AgentProfile> {
    return this.callZome('get_my_profile', null);
  }

  /**
   * Get the profile for the given agent, if they have created it
   * 
   * @param agentPubKey the agent to get the profile for
   * @returns the profile of the agent
   */
  async getAgentProfile(agentPubKey: AgentPubKeyB64): Promise<AgentProfile> {
    return this.callZome('get_agent_profile', agentPubKey);
  }

  /**
   * Get the profiles for the given agent
   * 
   * @param agentPubKeys the agents to get the profile for
   * @returns the profile of the agents, in the same order as the input parameters
   */
  async getAgentsProfiles(
    agentPubKeys: AgentPubKeyB64[]
  ): Promise<AgentProfile[]> {
    return this.callZome('get_agents_profile', agentPubKeys);
  }

  /**
   * Search profiles that start with nicknamePrefix
   * 
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the profiles with the nickname starting with nicknamePrefix
   */
  async searchProfiles(nicknamePrefix: string): Promise<Array<AgentProfile>> {
    return this.callZome('search_profiles', {
      nicknamePrefix: nicknamePrefix,
    });
  }

  /**
   * Get the profiles for all the agents in the DHT
   * 
   * @returns the profiles for all the agents in the DHT
   */
  async getAllProfiles(): Promise<Array<AgentProfile>> {
    return this.callZome('get_all_profiles', null);
  }

  /**
   * Create my profile
   * 
   * @param profile the profile to create
   * @returns my profile with my agentPubKey
   */
  async createProfile(profile: Profile): Promise<AgentProfile> {
    const profileResult = await this.callZome('create_profile', profile);

    return {
      agentPubKey: profileResult.agentPubKey,
      profile: profileResult.profile,
    };
  }

  private callZome(fn_name: string, payload: any) {
    return this.cellClient.callZome(this.zomeName, fn_name, payload);
  }
}
