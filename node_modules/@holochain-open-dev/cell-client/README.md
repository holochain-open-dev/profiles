# Cell Client

Temporary wrapper around AppWebsocket and @holo-host/web-sdk.

This is useful to build agnostic UIs, that can potentially connect both with Holo and with Holochain infrastructure transparently.

Note that this will only be useful until there is a unified API for both cases.

## Installing

```bash
npm i "https://github.com/holochain-open-dev/cell-client#build"
```

## Connecting to Holochain

```ts
import { HolochainClient } from "@holochain-open-dev/cell-client";
import { AppWebsocket } from "@holochain/conductor-api";

async function setupHolochainClient() {
  const appWs = await AppWebsocket.connect("ws://localhost:8888");

  const appInfo = await this._appWebsocket.appInfo({
    installed_app_id: "test-app",
  });
  const cellData = appInfo.cell_data[0];

  return new HolochainClient(appWs, cellData);
}
```

## Connecting to Chaperone (Holo)

```ts
import { HoloClient, WebSdkConnection } from "@holochain-open-dev/cell-client";
import { AppWebsocket } from "@holochain/conductor-api";

async function setupHoloClient() {
  const connection = new WebSdkConnection("http://localhost:24273"); // URL for chaperone

  await connection.ready();
  await connection.signIn();

  const appInfo = await connection.appInfo();

  const cellData = appInfo.cell_data[0];

  return new HoloClient(connection, cellData);
}
```

See all documentation for the `WebSdkConnection` [here](https://github.com/holo-host/web-sdk).

## Usage

```ts
import { CellClient } from "@holochain-open-dev/cell-client";
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';

export class InvitationsService {
  constructor(
    public cellClient: CellClient,
    public zomeName: string = "invitations"
  ) {}

  async sendInvitation(input: AgentPubKeyB64[]): Promise<void> {
    return this.cellClient.callZome(this.zomeName, "send_invitation", input);
  }
}
```

Now you can instantiate the `InvitationsService` both with `HoloClient` and `HolochainClient`:

```ts
async function setupCellClient(holo: boolean) {
  if (holo) return setupHoloClient();
  else setupHolochainClient();
}

async function setupService() {
  const cellClient = setupCellClient(process.env.IS_HOLO_CONTEXT);
  return new InvitationService(cellClient);
}
```

## Adding signal handlers

```ts
export class InvitationsStore {
  public invitations: Dictionary<InvitationEntryInfo> = {};

  constructor(protected cellClient: CellClient) {
    cellClient.addSignalHandler((signal) => {
      // Do something with the signal: eg. update invitations dictionary
    });
  }
}
```
