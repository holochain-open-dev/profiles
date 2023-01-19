import { AgentPubKeyMap, fakeRecord } from "@holochain-open-dev/utils";
import {
  AppInfo,
  InstalledCell,
  decodeHashFromBase64,
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

  create_profile({ nickname }: { nickname: string }): Record {
    const profile = { nickname, fields: {} };
    this.agents.put(this.myPubKey, profile);

    return fakeRecord({
      entry: encode(profile),
      entry_type: "App",
    });
  }

  search_profiles({ nickname_prefix }: { nickname_prefix: string }) {
    return this.agents.pickBy((profile) =>
      profile.nickname.startsWith(nickname_prefix.slice(0, 3))
    );
  }

  get_my_profile() {
    return this.agents.get(this.myPubKey);
  }

  get_agent_profile(agent_address: AgentPubKey) {
    return this.agents.get(agent_address);
  }

  get_all_profiles() {
    return this.agents
      .values()
      .map((profile) =>
        fakeRecord({ entry: encode(profile), entry_type: "App" })
      );
  }

  async callZome(req: CallZomeRequest): Promise<any> {
    await sleep(this.latency);
    return (this as any)[req.fn_name](req.payload);
  }
  addSignalHandler(signalHandler: AppSignalCb): { unsubscribe: () => void } {
    throw new Error("Method not implemented.");
  }
}
