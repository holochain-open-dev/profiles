import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { AgentProfile, Profile } from './types';

export class ProfilesService {
  constructor(
    public appWebsocket: AppWebsocket,
    public cellId: CellId,
    public zomeName = 'profiles'
  ) {}

  async getMyProfile(): Promise<AgentProfile> {
    return this.callZome('get_my_profile', null);
  }

  async getAgentProfile(agentPubKey: string): Promise<AgentProfile> {
    return this.callZome('get_agent_profile', agentPubKey);
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
    return this.appWebsocket.callZome({
      cap: null as any,
      cell_id: this.cellId,
      zome_name: this.zomeName,
      fn_name: fn_name,
      payload: payload,
      provenance: this.cellId[1],
    });
  }
}
