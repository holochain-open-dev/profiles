import { AgentPubKeyMap, fakeRecord, pickBy } from "@holochain-open-dev/utils";
import {
  AppInfo,
  decodeHashFromBase64,
  ClonedCell,
  EnableCloneCellRequest,
  EnableCloneCellResponse,
  DisableCloneCellRequest,
  DisableCloneCellResponse,
  AppAgentEvents,

  AgentPubKey,
  AppAgentClient,
  AppCreateCloneCellRequest,
  AppSignalCb,
  CallZomeRequest,
  Record,
} from "@holochain/client";
import { encode } from "@msgpack/msgpack";
import { UnsubscribeFunction } from "emittery";
import { Profile } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(() => r(null), ms));

class ZomeMock implements AppAgentClient {
  constructor(
    public myPubKey: AgentPubKey = decodeHashFromBase64(
      "uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI"
    ),
    protected latency: number = 500
  ) {}
  appInfo(): Promise<AppInfo> {
    throw new Error("Method not implemented.");
  }
  createCloneCell(_args: AppCreateCloneCellRequest): Promise<ClonedCell> {
    throw new Error("Method not implemented.");
  }
  enableCloneCell(
    _args: EnableCloneCellRequest
  ): Promise<EnableCloneCellResponse> {
    throw new Error("Method not implemented");
  }
  disableCloneCell(
    _args: DisableCloneCellRequest
  ): Promise<DisableCloneCellResponse> {
    throw new Error("Method not implemented");
  }
  async callZome(req: CallZomeRequest): Promise<any> {
    await sleep(this.latency);
    return (this as any)[req.fn_name](req.payload);
  }
  on<Name extends keyof AppAgentEvents>(
    _eventName: Name | readonly Name[],
    _listener: AppSignalCb
  ): UnsubscribeFunction {
    throw new Error("Method not implemented.");
  }
}

export class ProfilesZomeMock extends ZomeMock implements AppAgentClient {
  constructor(
    protected agents: AgentPubKeyMap<Profile> = new AgentPubKeyMap(),
    myPubKey?: AgentPubKey
  ) {
    super(myPubKey);
  }

  async create_profile({ nickname }: { nickname: string }): Promise<Record> {
    const profile = { nickname, fields: {} };
    this.agents.set(this.myPubKey, profile);

    return fakeRecord({
      entry: encode(profile),
      entry_type: "App",
    });
  }

  search_agents({ nickname_filter }: { nickname_filter: string }) {
    return pickBy(this.agents, (profile) =>
      profile.nickname.startsWith(nickname_filter.slice(0, 3))
    );
  }

  get_my_profile() {
    return this.agents.get(this.myPubKey);
  }

  get_agent_profile(agent_address: AgentPubKey) {
    return this.agents.get(agent_address);
  }

  get_all_agents() {
    return Array.from(this.agents.keys());
  }
}
