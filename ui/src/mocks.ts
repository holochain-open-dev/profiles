import { CellClient } from '@holochain-open-dev/cell-client';
import {
  AgentPubKeyB64,
  deserializeHash,
  serializeHash,
} from '@holochain-open-dev/core-types';
import { CellId, AppSignalCb } from '@holochain/client';
import { AgentProfile } from './types';

export class ProfilesZomeMock implements CellClient {
  constructor(protected agents: Array<AgentProfile> = []) {}

  get cellId(): CellId {
    return [
      deserializeHash('uhC0kkSpFl08_2D0Pvw2vEVEkfSgDVZCkyOf1je6qIdClO1o'),
      deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI'),
    ];
  }

  get myPubKeyB64() {
    return serializeHash(this.cellId[1]);
  }

  create_profile({ nickname }: { nickname: string }) {
    const agent: AgentProfile = {
      agentPubKey: this.myPubKeyB64,
      profile: { nickname, fields: {} },
    };
    this.agents.push(agent);

    return agent;
  }

  search_profiles({ nickname_prefix }: { nickname_prefix: string }) {
    return this.agents.filter(a =>
      a.profile.nickname.startsWith(nickname_prefix.slice(0, 3))
    );
  }

  get_my_profile() {
    const agent = this.findAgent(this.myPubKeyB64);

    if (!agent) return undefined;
    return {
      agentPubKey: agent.agentPubKey,
      profile: agent ? agent.profile : undefined,
    };
  }

  get_agent_profile(agent_address: AgentPubKeyB64) {
    const agent = this.findAgent(agent_address);
    return agent ? agent : undefined;
  }

  get_all_profiles() {
    return this.agents;
  }

  findAgent(agent_address: AgentPubKeyB64) {
    return this.agents.find(user => user.agentPubKey === agent_address);
  }

  callZome(
    zomeName: string,
    fnName: string,
    payload: any,
    timeout?: number
  ): Promise<any> {
    return (this as any)[fnName](payload);
  }
  addSignalHandler(
    signalHandler: AppSignalCb
  ): Promise<{ unsubscribe: () => void }> {
    throw new Error('Method not implemented.');
  }
}
