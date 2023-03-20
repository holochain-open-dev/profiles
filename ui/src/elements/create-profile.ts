import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { localized, msg } from "@lit/localize";
import { sharedStyles } from "@holochain-open-dev/elements";

import "@shoelace-style/shoelace/dist/components/card/card.js";
import "./edit-profile.js";

import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { Profile } from "../types.js";

/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
@localized()
@customElement("create-profile")
export class CreateProfile extends LitElement {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /** Private properties */

  async createProfile(profile: Profile) {
    await this.store.client.createProfile(profile);

    this.dispatchEvent(
      new CustomEvent("profile-created", {
        detail: {
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <sl-card>
        <div class="column">
          <span
            class="title"
            style="margin-bottom: 16px; align-self: flex-start"
            >${msg("Create Profile")}</span
          >
          <edit-profile
            .saveProfileLabel=${msg("Create Profile")}
            .store=${this.store}
            @save-profile=${(e: CustomEvent) =>
              this.createProfile(e.detail.profile)}
          ></edit-profile></div
      ></sl-card>
    `;
  }

  static styles = [sharedStyles];
}
