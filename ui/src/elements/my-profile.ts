import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context';
import { ProfilesStore } from '../profiles-store';
import { sharedStyles } from './utils/shared-styles';
import { ProfileDetail } from './profile-detail';
import { IconButton } from '@scoped-elements/material-web';
import { UpdateProfile } from './update-profile';
import { serializeHash } from '@holochain-open-dev/utils';

/**
 * @element profile-detail
 */
export class MyProfile extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  @state()
  private _editing = false;

  render() {
    if (this._editing)
      return html`<update-profile
        @profile-updated=${() => (this._editing = false)}
      ></update-profile>`;

    return html`
      <profile-detail .agentPubKey=${serializeHash(this.store.myAgentPubKey)}>
        <mwc-icon-button
          slot="action"
          icon="edit"
          @click=${() => (this._editing = true)}
        ></mwc-icon-button>
      </profile-detail>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-icon-button': IconButton,
      'profile-detail': ProfileDetail,
      'update-profile': UpdateProfile,
    };
  }

  static styles = [sharedStyles];
}
