import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { MobxLitElement } from '@adobe/lit-mobx';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';

import { sharedStyles } from './utils/shared-styles';
import { CreateProfileForm } from './create-profile-form';
import { ProfilesStore } from '../profiles.store';
import { PROFILES_STORE_CONTEXT } from '../types';

/**
 * @element profile-prompt
 */
export class ProfilePrompt extends ScopedRegistryHost(MobxLitElement) {
  /** Public attributes */

  /** Private properties */

  @property({ type: Boolean })
  _loading = true;

  @requestContext(PROFILES_STORE_CONTEXT)
  _store!: ProfilesStore;

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
      ${!this._loading && this._store.myProfile
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  static elementDefinitions = {
    'mwc-textfield': TextField,
    'mwc-button': Button,
    'mwc-circular-progress': CircularProgress,
    'create-profile-form': CreateProfileForm,
  };

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
