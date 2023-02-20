import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { MdStandardIconButton } from "@scoped-elements/material-web";

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
        <md-standard-icon-button
          slot="action"
          @click=${() => (this._editing = true)}
          >edit</md-standard-icon-button
        >
      </profile-detail>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "md-standard-icon-button": MdStandardIconButton,
      "profile-detail": ProfileDetail,
      "update-profile": UpdateProfile,
    };
  }

  static styles = [sharedStyles];
}
