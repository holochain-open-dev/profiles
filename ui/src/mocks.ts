import { AgentPubKeyMap, fakeRecord, pickBy } from "@holochain-open-dev/utils";
import {
  AppInfo,
  InstalledCell,
  decodeHashFromBase64,
  fakeAgentPubKey,
} from "@holochain/client";
import {
  AgentPubKey,
  AppAgentClient,
  AppCreateCloneCellRequest,
  AppSignalCb,
  CallZomeRequest,
  Record,
} from "@holochain/client";
import { encode } from "@msgpack/msgpack";
import { Profile } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(() => r(null), ms));

//@ts-ignore
export class ProfilesZomeMock implements AppAgentClient {
  appInfo(): Promise<AppInfo> {
    throw new Error("Method not implemented.");
  }

  public myPubKey = decodeHashFromBase64(
    "uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI"
  );
  constructor(
    protected agents: AgentPubKeyMap<Profile> = new AgentPubKeyMap(),
    protected latency: number = 500
  ) {}

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

  async callZome(req: CallZomeRequest): Promise<any> {
    await sleep(this.latency);
    return (this as any)[req.fn_name](req.payload);
  }
}
