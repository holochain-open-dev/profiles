import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { AgentProfile, Profile } from './types';
export declare class ProfilesService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    getMyProfile(): Promise<AgentProfile>;
    getAgentProfile(agentPubKey: string): Promise<AgentProfile>;
    searchProfiles(nicknamePrefix: string): Promise<Array<AgentProfile>>;
    getAllProfiles(): Promise<Array<AgentProfile>>;
    createProfile(profile: Profile): Promise<AgentProfile>;
    private callZome;
}
