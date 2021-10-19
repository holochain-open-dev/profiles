import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { AgentProfile, Profile } from './types';

export class ProfilesService {
  constructor(public cellClient: CellClient, public zomeName = 'profiles') {}

  async getMyProfile(): Promise<AgentProfile> {
    return this.callZome('get_my_profile', null);
  }

  async getAgentProfile(agentPubKey: AgentPubKeyB64): Promise<AgentProfile> {
    return this.callZome('get_agent_profile', agentPubKey);
  }

  async getAgentsProfiles(
    agentPubKeys: AgentPubKeyB64[]
  ): Promise<AgentProfile[]> {
    return this.callZome('get_agents_profile', agentPubKeys);
  }

  async searchProfiles(nicknamePrefix: string): Promise<Array<AgentProfile>> {
    return this.callZome('search_profiles', {
      nickname_prefix: nicknamePrefix,
    });
  }

  async getAllProfiles(): Promise<Array<AgentProfile>> {
    return this.callZome('get_all_profiles', null);
  }

  async createProfile(profile: Profile): Promise<AgentProfile> {
    const profileResult = await this.callZome('create_profile', profile);

    return {
      agent_pub_key: profileResult.agent_pub_key,
      profile: profileResult.profile,
    };
  }

  private callZome(fn_name: string, payload: any) {
    return this.cellClient.callZome(this.zomeName, fn_name, payload);
  }
}
