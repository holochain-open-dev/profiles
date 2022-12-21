import {
  AgentPubKeyMap,
  deserializeHash,
  fakeRecord,
} from '@holochain-open-dev/utils';
import { AppInfo, InstalledCell } from '@holochain/client';
import { AgentPubKey, AppAgentClient, AppCreateCloneCellRequest, AppSignalCb, CallZomeRequest, Record } from '@holochain/client';
import { encode } from '@msgpack/msgpack';
import { Profile } from './types';

const sleep = (ms: number) => new Promise(r => setTimeout(() => r(null), ms));

//@ts-ignore
export class ProfilesZomeMock implements AppAgentClient {

  appInfo(): Promise<AppInfo> {
    throw new Error('Method not implemented.');
  }
  createCloneCell(args: AppCreateCloneCellRequest): Promise<InstalledCell> {
    throw new Error('Method not implemented.');
  }
  debug: any;
  events<Name extends PropertyKey>(eventName: Name | readonly Name[]): AsyncIterableIterator<globalThis.Record<PropertyKey, any>[Name]> {
    throw new Error('Method not implemented.');
  }
 // emit<Name extends PropertyKey>(eventName: Name, eventData: globalThis.Record<PropertyKey, any>[Name]): Promise<void>;
  emit(eventName: unknown, eventData?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
 // emitSerial<Name extends PropertyKey>(eventName: Name, eventData: globalThis.Record<PropertyKey, any>[Name]): Promise<void>;
  emitSerial(eventName: unknown, eventData?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  anyEvent(): AsyncIterableIterator<[PropertyKey, any]> {
    throw new Error('Method not implemented.');
  }
  offAny(listener: (eventName: PropertyKey, eventData: any) => void | Promise<void>): void {
    throw new Error('Method not implemented.');
  }
  clearListeners<Name extends PropertyKey>(eventName?: Name | readonly Name[] | undefined): void {
    throw new Error('Method not implemented.');
  }
  listenerCount<Name extends PropertyKey>(eventName?: Name | readonly Name[] | undefined): number {
    throw new Error('Method not implemented.');
  }
  bindMethods(target: globalThis.Record<string, unknown>, methodNames?: readonly string[] | undefined): void {
    throw new Error('Method not implemented.');
  }

  public myPubKey = deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI')
  constructor(
    protected agents: AgentPubKeyMap<Profile> = new AgentPubKeyMap(),
    protected latency: number = 500
  ) {
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

  async callZome(req: CallZomeRequest): Promise<any> {
    await sleep(this.latency);
    return (this as any)[req.fn_name](req.payload);
  }
  addSignalHandler(signalHandler: AppSignalCb): { unsubscribe: () => void } {
    throw new Error('Method not implemented.');
  }
}
