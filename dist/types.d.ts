import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';
export interface Profile {
    nickname: string;
    fields: Dictionary<string>;
}
export interface AgentProfile {
    agentPubKey: AgentPubKeyB64;
    profile: Profile;
}
export interface SearchProfilesInput {
    nicknamePrefix: string;
}
