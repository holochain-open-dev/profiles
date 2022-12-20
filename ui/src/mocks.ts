import {
  AgentPubKeyMap,
  deserializeHash,
  fakeRecord,
} from '@holochain-open-dev/utils';
import { AgentPubKey, AppAgentWebsocket, AppSignalCb, CallZomeRequest, Record } from '@holochain/client';
import { encode } from '@msgpack/msgpack';
import { Profile } from './types';

const sleep = (ms: number) => new Promise(r => setTimeout(() => r(null), ms));

export class ProfilesZomeMock extends AppAgentWebsocket {

  constructor(
    protected agents: AgentPubKeyMap<Profile> = new AgentPubKeyMap(),
    protected latency: number = 500
  ) {
    super(null as any, 'profiles-app');
  }

  async myPubKey(): Promise<AgentPubKey> {
    return deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI');
  }

  myPubKeySync(): AgentPubKey {
    return deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI');
  }

  create_profile({ nickname }: { nickname: string }): Record {
    const profile = { nickname, fields: {} };
    this.agents.put(this.myPubKeySync(), profile);

    return fakeRecord({
      entry: encode(profile),
      entry_type: 'App',
    });
  }

  search_profiles({ nickname_prefix }: { nickname_prefix: string }) {
    return this.agents.pickBy(profile =>
      profile.nickname.startsWith(nickname_prefix.slice(0, 3))
    );
  }

  get_my_profile() {
    return this.agents.get(this.myPubKeySync());
  }

  get_agent_profile(agent_address: AgentPubKey) {
    return this.agents.get(agent_address);
  }

  get_all_profiles() {
    return this.agents
      .values()
      .map(profile =>
        fakeRecord({ entry: encode(profile), entry_type: 'App' })
      );
  }

  async callZome(req: CallZomeRequest): Promise<any> {
    await sleep(this.latency);
    return (this as any)[req.fn_name](req.payload);
  }
  addSignalHandler(signalHandler: AppSignalCb): { unsubscribe: () => void } {
    throw new Error('Method not implemented.');
  }
}
