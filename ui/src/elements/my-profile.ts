import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { IconButton } from "@scoped-elements/material-web";

import { profilesStoreContext } from "../context";
import { ProfilesStore } from "../profiles-store";
import { ProfileDetail } from "./profile-detail";
import { UpdateProfile } from "./update-profile";
import { sharedStyles } from "@holochain-open-dev/elements";

/**
 * @element profile-detail
 */
export class MyProfile extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * @internal
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @state()
  _store!: ProfilesStore;

  /** Private properties */

  /**
   * @internal
   */
  @state()
  private _editing = false;

  render() {
    if (this._editing)
      return html`<update-profile
        @profile-updated=${() => (this._editing = false)}
        @cancel-edit-profile=${() => (this._editing = false)}
      ></update-profile>`;

    return html`
      <profile-detail .agentPubKey=${this._store.client.client.myPubKey}>
        <mwc-icon-button
          slot="action"
          icon="edit"
          @click=${() => (this._editing = true)}
        ></mwc-icon-button>
      </profile-detail>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "mwc-icon-button": IconButton,
      "profile-detail": ProfileDetail,
      "update-profile": UpdateProfile,
    };
  }

  static styles = [sharedStyles];
}
