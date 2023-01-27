import { css, html, LitElement } from "lit";
import { provide } from "@lit-labs/context";
import { property } from "lit/decorators.js";

import { profilesStoreContext } from "../context";
import { ProfilesStore } from "../profiles-store";

export class ProfilesContext extends LitElement {
  @provide({ context: profilesStoreContext })
  @property({ type: Object })
  store!: ProfilesStore;

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}
