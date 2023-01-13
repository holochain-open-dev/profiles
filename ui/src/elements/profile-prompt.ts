import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import {
  Button,
  CircularProgress,
  TextField,
} from "@scoped-elements/material-web";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
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
export class ProfilePrompt extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  private _myProfileTask = new StoreSubscriber(
    this,
    () => this.store.myProfile
  );

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
    return this._myProfileTask.render({
      pending: () => html` <div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`,
      complete: (profile) => this.renderPrompt(profile),
    });
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
