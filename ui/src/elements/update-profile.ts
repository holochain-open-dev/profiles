import { html, LitElement } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Dictionary } from '@holochain-open-dev/core-types';
import {
  TextField,
  Button,
  Card,
  IconButton,
  Fab,
  CircularProgress,
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { resizeAndExport } from './utils/image';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';
import { StoreSubscriber } from 'lit-svelte-stores';

/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class UpdateProfile extends ScopedElementsMixin(LitElement) {
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

  private _myProfile = new StoreSubscriber(this, () => this.store?.myProfile);

  async firstUpdated() {
    await this.store.fetchMyProfile();
    this._loading = false;
  }

  async updateProfile(profile: Profile) {
    await this.store.updateProfile(profile);

    this.dispatchEvent(
      new CustomEvent('profile-updated', {
        detail: {
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (this._loading)
      return html`<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;

    return html`
      <edit-profile
        .profile=${this._myProfile.value}
        save-profile-label="Update Profile"
        @save-profile=${(e: CustomEvent) =>
          this.updateProfile(e.detail.profile)}
      ></edit-profile>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
      'edit-profile': EditProfile,
      'mwc-card': Card,
    };
  }
  static get styles() {
    return [sharedStyles];
  }
}
