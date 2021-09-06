import { AgentPubKeyB64 } from "@holochain-open-dev/core-types";

export type Dictionary<T> = { [key: string]: T };

export interface Profile {
  nickname: string;
  fields: Dictionary<string>;
}

export interface AgentProfile {
  agent_pub_key: AgentPubKeyB64;
  profile: Profile;
}
