import * as ConductorApi from "@holochain/conductor-api";
import { CellClient } from "./cell-client";
export declare class HolochainClient implements CellClient {
    protected appWebsocket: ConductorApi.AppWebsocket;
    protected cellData: ConductorApi.InstalledCell;
    constructor(appWebsocket: ConductorApi.AppWebsocket, cellData: ConductorApi.InstalledCell);
    get cellId(): ConductorApi.CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: ConductorApi.AppSignalCb): void;
}
