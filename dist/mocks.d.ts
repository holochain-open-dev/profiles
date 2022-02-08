import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { CellId, AppSignalCb } from '@holochain/client';
import { AgentProfile } from './types';
export declare class ProfilesZomeMock extends CellClient {
    protected agents: Array<AgentProfile>;
    protected latency: number;
    constructor(agents?: Array<AgentProfile>, latency?: number);
    get cellId(): CellId;
    get myPubKeyB64(): string;
    create_profile({ nickname }: {
        nickname: string;
    }): AgentProfile;
    search_profiles({ nicknamePrefix }: {
        nicknamePrefix: string;
    }): AgentProfile[];
    get_my_profile(): {
        agentPubKey: string;
        profile: import("./types").Profile | undefined;
    } | undefined;
    get_agent_profile(agent_address: AgentPubKeyB64): AgentProfile | undefined;
    get_all_profiles(): AgentProfile[];
    findAgent(agent_address: AgentPubKeyB64): AgentProfile | undefined;
    callZome(zomeName: string, fnName: string, payload: any, timeout?: number): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): {
        unsubscribe: () => void;
    };
}
