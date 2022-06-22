import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Card } from '@scoped-elements/material-web';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';
import { localized, msg } from '@lit/localize';

/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
@localized()
export class CreateProfile extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext, subscribe: true })
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
            >${msg('Create Profile')}</span
          >
          <edit-profile
            .saveProfileLabel=${msg('Create Profile')}
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
