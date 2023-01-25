import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";

import {
  Button,
  CircularProgress,
  TextField,
} from "@scoped-elements/material-web";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { localized, msg } from "@lit/localize";
import { consume } from "@lit-labs/context";
import { StoreSubscriber } from "lit-svelte-stores";

import { sharedStyles } from "./utils/shared-styles";
import { CreateProfile } from "./create-profile";
import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { Profile } from "../types";

/**
 * @element profile-prompt
 * @slot hero - Will be displayed above the create-profile form when the user is prompted with it
 */
@localized()
export class ProfilePrompt extends ScopedElementsMixin(LitElement) {
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

  renderPrompt(myProfile: Profile | undefined) {
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
    console.log(this._myProfile.value);
    switch (this._myProfile.value.status) {
      case "pending":
        return html` <div
          class="column"
          style="align-items: center; justify-content: center; flex: 1;"
        >
          <mwc-circular-progress indeterminate></mwc-circular-progress>
        </div>`;
      case "complete":
        return this.renderPrompt(this._myProfile.value.value);
      case "error":
        return html`<span
          >${msg("There was an error while fetching your profile: ")}${this
            ._myProfile.value.error}</span
        >`;
    }
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "mwc-textfield": TextField,
      "mwc-button": Button,
      "mwc-circular-progress": CircularProgress,
      "create-profile": CreateProfile,
    };
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
          flex: 1;
        }
      `,
    ];
  }
}
