import { css, html, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  Button,
  CircularProgress,
  TextField,
} from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@lit-labs/context';
import { contextStore } from 'lit-svelte-stores';
import { Dictionary } from '@holochain-open-dev/core-types';

import { sharedStyles } from './utils/shared-styles';
import { CreateProfileForm } from './create-profile-form';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { Profile } from '../types';

/**
 * @element profile-prompt
 */
export class ProfilePrompt extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /** Dependencies */

  @contextProvided({ context: profilesStoreContext })
  _store!: ProfilesStore;

  /** Private properties */

  @property({ type: Boolean })
  _loading = true;

  @contextStore({
    context: profilesStoreContext,
    selectStore: s => s.myProfile,
  })
  _myProfile!: Profile;

  async firstUpdated() {
    await this._store.fetchMyProfile();
    this._loading = false;
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
        ? html`<mwc-circular-progress indeterminate></mwc-circular-progress>`
        : html`<create-profile-form></create-profile-form>`}
    </div>`;
  }

  render() {
    return html`
      ${!this._loading && this._myProfile
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
      'create-profile-form': CreateProfileForm,
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
