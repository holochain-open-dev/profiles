import {
  AgentPubKeyMap,
  decodeEntry,
  EntryRecord,
  isSignalFromCellWithRole,
  RecordBag,
} from "@holochain-open-dev/utils";
import {
  AgentPubKey,
  Record,
  AppAgentClient,
  AppAgentCallZomeRequest,
  RoleName,
} from "@holochain/client";
import Emittery, { UnsubscribeFunction } from "emittery";
import { Profile } from "./types";

export interface ProfilesEvents {
  ProfileCreated: Profile;
}

export class ProfilesClient {
  readonly emitter: Emittery<ProfilesEvents> = new Emittery();

  constructor(
    public client: AppAgentClient,
    public roleName: RoleName,
    public zomeName = "profiles"
  ) {
    this.client.on("signal", async (signal) => {
      if (isSignalFromCellWithRole(client, roleName, signal)) {
        this.emitter.emit("ProfileCreated", signal.data.payload);
      }
    });
  }

  on<Name extends keyof ProfilesEvents>(
    eventName: Name | readonly Name[],
    listener: (eventData: ProfilesEvents[Name]) => void | Promise<void>
  ): UnsubscribeFunction {
    return this.emitter.on(eventName, listener);
  }

  /**
   * Get the profile for the given agent, if they have created it
   *
   * @param agentPubKey the agent to get the profile for
   * @returns the profile of the agent
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
   * Search profiles that start with nicknamePrefix
   *
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the profiles with the nickname starting with nicknamePrefix
   */
  async searchAgents(nicknamePrefix: string): Promise<AgentPubKey[]> {
    return this.callZome("search_agents", {
      nickname_prefix: nicknamePrefix,
    });
  }

  /**
   * Get the profiles for all the agents in the DHT
   *
   * @returns the profiles for all the agents in the DHT
   */
  async getAllAgents(): Promise<AgentPubKey[]> {
    return this.callZome("get_all_agents", null);
  }

  /**
   * Create my profile
   *
   * @param profile the profile to create
   * @returns my profile with my agentPubKey
   */
  async createProfile(profile: Profile): Promise<void> {
    return this.callZome("create_profile", profile);
  }

  /**
   * Update my profile
   *
   * @param profile the profile to create
   * @returns my profile with my agentPubKey
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
