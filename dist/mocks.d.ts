import { CellClient } from '@holochain-open-dev/cell-client';
import { HoloHashMap } from '@holochain-open-dev/utils';
import { AgentPubKey, AppSignalCb, Record } from '@holochain/client';
import { Profile } from './types';
export declare class ProfilesZomeMock extends CellClient {
    protected agents: HoloHashMap<Profile>;
    protected latency: number;
    constructor(agents?: HoloHashMap<Profile>, latency?: number);
    get myPubKey(): Uint8Array;
    create_profile({ nickname }: {
        nickname: string;
    }): Record;
    search_profiles({ nickname_prefix }: {
        nickname_prefix: string;
    }): HoloHashMap<Profile>;
    get_my_profile(): Profile;
    get_agent_profile(agent_address: AgentPubKey): Profile;
    get_all_profiles(): Record[];
    callZome(zomeName: string, fnName: string, payload: any, timeout?: number): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): {
        unsubscribe: () => void;
    };
}
