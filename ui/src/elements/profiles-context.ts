import { css, html, LitElement } from "lit";
import { provide } from "@lit-labs/context";
import { property } from "lit/decorators.js";

import { profilesStoreContext } from "../context";
import { ProfilesStore } from "../profiles-store";
import { AppAgentWebsocket } from "@holochain/client";
import { ProfilesClient } from "../profiles-client";

export class ProfilesContext extends LitElement {
  @provide({ context: profilesStoreContext })
  @property({ type: Object })
  store!: ProfilesStore;

  @property()
  appId: string = "";

  @property()
  role!: string;

  @property()
  zome: string = "profiles";

  async firstUpdated() {
    const websocket = await AppAgentWebsocket.connect(``, this.appId);

    this.store = new ProfilesStore(
      new ProfilesClient(websocket, this.role, this.zome)
    );
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}
