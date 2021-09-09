import { AppSignalCb, CellId } from "@holochain/conductor-api";

export interface CellClient {
  cellId: CellId;

  callZome(zomeName: string, fnName: string, payload: any): Promise<any>;

  addSignalHandler(signalHandler: AppSignalCb): Promise<{ unsubscribe: () => void }>;
}
