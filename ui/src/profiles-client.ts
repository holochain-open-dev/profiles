import {
  decodeEntry,
  isSignalFromCellWithRole,
} from "@holochain-open-dev/utils";
import {
  AgentPubKey,
  Record,
  AppAgentClient,
  AppAgentCallZomeRequest,
  RoleName,
} from "@holochain/client";
import { UnsubscribeFunction } from "emittery";
import { Profile, ProfilesSignal } from "./types";

export interface ProfilesEvents {
  ["signal"]: ProfilesSignal;
}

export class ProfilesClient {
  constructor(
    public client: AppAgentClient,
    public roleName: RoleName,
    public zomeName = "profiles"
  ) {}

  on<Name extends keyof ProfilesEvents>(
    eventName: Name | readonly Name[],
    listener: (eventData: ProfilesEvents[Name]) => void | Promise<void>
  ): UnsubscribeFunction {
    return this.client.on(eventName, async (signal) => {
      if (
        (await isSignalFromCellWithRole(this.client, this.roleName, signal)) &&
        this.zomeName === signal.zome_name
      ) {
        listener(signal.payload as ProfilesSignal);
      }
    });
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
  async createProfile(profile: Profile): Promise<void> {
    return this.callZome("create_profile", profile);
  }

  /**
   * Update my profile
   *
   * @param profile the profile to create
   */
  async updateProfile(profile: Profile): Promise<void> {
    return this.callZome("update_profile", profile);
  }

  private callZome(fn_name: string, payload: any) {
    const req: AppAgentCallZomeRequest = {
      role_name: this.roleName,
      zome_name: this.zomeName,
      fn_name,
      payload,
    };
    return this.client.callZome(req);
  }
}
