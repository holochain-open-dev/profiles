import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Card, CircularProgress } from '@scoped-elements/material-web';
import { msg } from '@lit/localize';
import { TaskSubscriber } from 'lit-svelte-stores';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';

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
  @contextProvided({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  private _myProfileTask = new TaskSubscriber(
    this,
    () => this.store.fetchMyProfile(),
    () => [this.store]
  );

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
    return this._myProfileTask.render({
      pending: () => html`<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`,
      complete: profile => html` <edit-profile
        .profile=${profile}
        .save-profile-label=${msg('Update Profile')}
        @save-profile=${(e: CustomEvent) =>
          this.updateProfile(e.detail.profile)}
      ></edit-profile>`,
    });
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
