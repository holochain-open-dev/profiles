import { AppWebsocket, InstalledCell, AppSignalCb } from "@holochain/conductor-api";
import { CellClient } from "./cell-client";
export declare class HolochainClient implements CellClient {
    protected appWebsocket: AppWebsocket;
    protected cellData: InstalledCell;
    constructor(appWebsocket: AppWebsocket, cellData: InstalledCell);
    get cellId(): import("@holochain/conductor-api").CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): Promise<{
        unsubscribe: () => void;
    }>;
}
