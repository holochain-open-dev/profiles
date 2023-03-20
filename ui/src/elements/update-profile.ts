import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { localized, msg } from "@lit/localize";
import { StoreSubscriber } from "@holochain-open-dev/stores";
import { sharedStyles } from "@holochain-open-dev/elements";

import "@holochain-open-dev/elements/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

import "./edit-profile.js";

import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { Profile } from "../types.js";

/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
@localized()
@customElement("update-profile")
export class UpdateProfile extends LitElement {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /**
   * @internal
   */
  private _myProfile = new StoreSubscriber(this, () => this.store.myProfile);

  async updateProfile(profile: Profile) {
    await this.store.client.updateProfile(profile);

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
          <sl-spinner></sl-spinner>
        </div>`;
      case "complete":
        return html` <edit-profile
          .allowCancel=${true}
          style="margin-top: 16px; flex: 1"
          .profile=${this._myProfile.value.value}
          .saveProfileLabel=${msg("Update Profile")}
          @save-profile=${(e: CustomEvent) =>
            this.updateProfile(e.detail.profile)}
        ></edit-profile>`;
      case "error":
        return html`<display-error
          .headline=${msg("Error fetching your profile")}
          .error=${this._myProfile.value.error.data.data}
        ></display-error>`;
    }
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }
}
