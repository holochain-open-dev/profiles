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
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { resizeAndExport } from './utils/image';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';

/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class CreateProfile extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  async createProfile(profile: Profile) {
    await this.store.createProfile(profile);

    this.dispatchEvent(
      new CustomEvent('profile-created', {
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
      <mwc-card>
        <div class="column" style="margin: 16px;">
          <span
            class="title"
            style="margin-bottom: 24px; align-self: flex-start"
            >Create Profile</span
          >
          <edit-profile
            save-profile-label="Create Profile"
            @save-profile=${(e: CustomEvent) =>
              this.createProfile(e.detail.profile)}
          ></edit-profile></div
      ></mwc-card>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'edit-profile': EditProfile,
      'mwc-card': Card,
    };
  }
  static get styles() {
    return [sharedStyles];
  }
}
