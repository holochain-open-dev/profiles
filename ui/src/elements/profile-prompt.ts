import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  Button,
  CircularProgress,
  TextField,
} from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@holochain-open-dev/context';
import { StoreSubscriber } from 'lit-svelte-stores';

import { sharedStyles } from './utils/shared-styles';
import { CreateProfile } from './create-profile';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';

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
  @contextProvided({ context: profilesStoreContext })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  @state()
  private _loading = true;

  private _myProfile = new StoreSubscriber(this, () => this.store.myProfile);

  async firstUpdated() {
    await this.store.fetchMyProfile();
    this._loading = false;
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
        ? html`<mwc-circular-progress indeterminate></mwc-circular-progress>`
        : html` <div class="column" style="align-items: center;">
            <slot name="hero"></slot>
            <create-profile></create-profile>
          </div>`}
    </div>`;
  }

  render() {
    return html`
      ${!this._loading && this._myProfile.value
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
      'create-profile': CreateProfile,
    };
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
