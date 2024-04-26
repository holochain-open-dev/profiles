import { css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { consume } from "@lit/context";
import { SignalWatcher } from "@holochain-open-dev/signals";
import { sharedStyles } from "@holochain-open-dev/elements";
import { EntryRecord } from "@holochain-open-dev/utils";

import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@holochain-open-dev/elements/dist/elements/display-error.js";

import "./create-profile.js";

import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { Profile } from "../types.js";

/**
 * @element profile-prompt
 * @slot hero - Will be displayed above the create-profile form when the user is prompted with it
 */
@localized()
@customElement("profile-prompt")
export class ProfilePrompt extends SignalWatcher(LitElement) {
  /**
   * Profiles store for this element, not required if you embed this element inside a `<profiles-context>`
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /** Private properties */

  private renderPrompt(myProfile: EntryRecord<Profile> | undefined) {
    if (myProfile) return html`<slot></slot>`;

    return html`
      <div
        class="column"
        style="align-items: center; justify-content: center; flex: 1; padding-bottom: 10px;"
      >
        <div class="column" style="align-items: center;">
          <slot name="hero"></slot>
          <create-profile></create-profile>
        </div>
      </div>
    `;
  }

  render() {
    const myProfile = this.store.myProfile$.get();

    switch (myProfile.status) {
      case "pending":
        return html`<div
          class="row"
          style="flex: 1; justify-content: center; align-items: center"
        >
          <sl-spinner style="font-size: 0.2rem"></sl-spinner>
        </div>`;
      case "error":
        return html`<display-error
          .headline=${msg("Error fetching your profile.")}
          .error=${myProfile.error}
        ></display-error>`;
      case "completed":
        return this.renderPrompt(myProfile.value);
    }
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex: 1;
      }
    `,
  ];
}
