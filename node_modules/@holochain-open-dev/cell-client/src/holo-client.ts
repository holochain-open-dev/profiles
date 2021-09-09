import { CellClient } from "./cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import * as HoloSdk from "@holo-host/web-sdk";

export class HoloClient implements CellClient {
  constructor(
    protected connection: any,
    protected cellData: InstalledCell,
    protected branding: HoloSdk.Branding
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  async callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    const result = await this.connection.zomeCall(
      this.cellData.cell_nick,
      zomeName,
      fnName,
      payload
    );

    if (result && result.type === "error") {
      throw new Error(result.payload.message);
    }
    return result;
  }

  async addSignalHandler(signalHandler: AppSignalCb) {
    new HoloSdk.Connection(
      this.connection.chaperone_url.origin,
      signalHandler,
      this.branding
    );

    return {
      unsubscribe: () => {
        // TODO: disconnect connection
      },
    };
  }
}
