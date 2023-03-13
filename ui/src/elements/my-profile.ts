import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { MdStandardIconButton } from "@scoped-elements/material-web";
import { sharedStyles } from "@holochain-open-dev/elements";

import { profilesStoreContext } from "../context.js";
import { ProfilesStore } from "../profiles-store.js";
import { ProfileDetail } from "./profile-detail.js";
import { UpdateProfile } from "./update-profile.js";

/**
 * @element profile-detail
 */
export class MyProfile extends ScopedElementsMixin(LitElement) {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

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
      <profile-detail .agentPubKey=${this.store.client.client.myPubKey}>
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
