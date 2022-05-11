import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';

export interface Profile {
  nickname: string;
  fields: Record<string, string>;
}

export interface AgentProfile {
  agentPubKey: AgentPubKeyB64;
  profile: Profile;
}

export interface SearchProfilesInput {
  nicknamePrefix: string;
}
