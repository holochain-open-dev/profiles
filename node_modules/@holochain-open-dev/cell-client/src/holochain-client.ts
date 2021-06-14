import * as ConductorApi from "@holochain/conductor-api";
import { CellClient } from "./cell-client";

export class HolochainClient implements CellClient {
  constructor(
    protected appWebsocket: ConductorApi.AppWebsocket,
    protected cellData: ConductorApi.InstalledCell
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    return this.appWebsocket.callZome({
      cap: null as any,
      cell_id: this.cellId,
      zome_name: zomeName,
      fn_name: fnName,
      payload: payload,
      provenance: this.cellId[1],
    });
  }

  addSignalHandler(signalHandler: ConductorApi.AppSignalCb) {
    ConductorApi.AppWebsocket.connect(
      this.appWebsocket.client.socket.url,
      15000,
      signalHandler
    );
  }
}
