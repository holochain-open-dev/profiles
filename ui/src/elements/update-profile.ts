import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { Card, CircularProgress } from "@scoped-elements/material-web";
import { localized, msg } from "@lit/localize";
import { StoreSubscriber } from "lit-svelte-stores";

import { sharedStyles } from "./utils/shared-styles";
import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { EditProfile } from "./edit-profile";
import { Profile } from "../types";

/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
@localized()
export class UpdateProfile extends ScopedElementsMixin(LitElement) {
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
  private _myProfile = new StoreSubscriber(this, () => this._store.myProfile);

  async updateProfile(profile: Profile) {
    await this._store.client.updateProfile(profile);

    this.dispatchEvent(
      new CustomEvent("profile-updated", {
        detail: {
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    switch (this._myProfile.value.status) {
      case "pending":
        return html`<div
          class="column"
          style="align-items: center; justify-content: center; flex: 1;"
        >
          <mwc-circular-progress indeterminate></mwc-circular-progress>
        </div>`;
      case "complete":
        return html` <edit-profile
          allowCancel
          .profile=${this._myProfile.value.value}
          .save-profile-label=${msg("Update Profile")}
          @save-profile=${(e: CustomEvent) =>
            this.updateProfile(e.detail.profile)}
        ></edit-profile>`;
      case "error":
        return html`<span
          >${msg("There was an error while loading your profile")}</span
        >`;
    }
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "mwc-circular-progress": CircularProgress,
      "edit-profile": EditProfile,
      "mwc-card": Card,
    };
  }
  static get styles() {
    return [sharedStyles];
  }
}
