import { CellClient } from '@holochain-open-dev/cell-client';
import {
  AgentPubKeyMap,
  deserializeHash,
  fakeRecord,
} from '@holochain-open-dev/utils';
import { AgentPubKey, AppSignalCb, Record } from '@holochain/client';
import { encode } from '@msgpack/msgpack';
import { Profile } from './types';

const sleep = (ms: number) => new Promise(r => setTimeout(() => r(null), ms));

export class ProfilesZomeMock extends CellClient {
  constructor(
    protected agents: AgentPubKeyMap<Profile> = new AgentPubKeyMap(),
    protected latency: number = 500
  ) {
    super(null as any, {
      cell_id: [
        deserializeHash('uhC0kkSpFl08_2D0Pvw2vEVEkfSgDVZCkyOf1je6qIdClO1o'),
        deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI'),
      ],
      role_id: 'profiles',
    });
  }

  get myPubKey() {
    return this.cell.cell_id[1];
  }

  create_profile({ nickname }: { nickname: string }): Record {
    const profile = { nickname, fields: {} };
    this.agents.put(this.myPubKey, profile);

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
    return this.agents.get(this.myPubKey);
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

  async callZome(
    zomeName: string,
    fnName: string,
    payload: any,
    timeout?: number
  ): Promise<any> {
    await sleep(this.latency);
    return (this as any)[fnName](payload);
  }
  addSignalHandler(signalHandler: AppSignalCb): { unsubscribe: () => void } {
    throw new Error('Method not implemented.');
  }
}
