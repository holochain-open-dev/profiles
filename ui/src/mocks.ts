import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64, serializeHash } from '@holochain-open-dev/core-types';
import { CellId, AppSignalCb, fakeAgentPubKey } from '@holochain/client';
import { AgentProfile } from './types';

export class ProfilesZomeMock implements CellClient {
  constructor(protected agents: Array<AgentProfile> = []) {}

  get cellId(): CellId {
    return [fakeAgentPubKey(), fakeAgentPubKey()];
  }

  get myPubKeyB64() {
    return serializeHash(this.cellId[1]);
  }

  create_profile({ nickname }: { nickname: string }) {
    const agent: AgentProfile = {
      agent_pub_key: this.myPubKeyB64,
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
      agent_pub_key: agent.agent_pub_key,
      profile: agent ? agent.profile : undefined,
    };
  }

  get_agent_profile(agent_address: AgentPubKeyB64) {
    const agent = this.findAgent(agent_address);
    return agent ? agent : undefined;
  }

  findAgent(agent_address: AgentPubKeyB64) {
    return this.agents.find(user => user.agent_pub_key === agent_address);
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
