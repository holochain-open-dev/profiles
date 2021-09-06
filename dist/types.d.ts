import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';
export interface Profile {
    nickname: string;
    fields: Dictionary<string>;
}
export interface AgentProfile {
    agent_pub_key: AgentPubKeyB64;
    profile: Profile;
}
