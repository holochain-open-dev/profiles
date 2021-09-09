import { CellClient } from "./cell-client";
import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import * as HoloSdk from "@holo-host/web-sdk";
export declare class HoloClient implements CellClient {
    protected connection: any;
    protected cellData: InstalledCell;
    protected branding: HoloSdk.Branding;
    constructor(connection: any, cellData: InstalledCell, branding: HoloSdk.Branding);
    get cellId(): import("@holochain/conductor-api").CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): Promise<{
        unsubscribe: () => void;
    }>;
}
