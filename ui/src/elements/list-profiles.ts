import { css, html, query, property, PropertyValues } from 'lit-element';

import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { sharedStyles } from './utils/shared-styles';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { StoreElement } from '@holochain-open-dev/common';
import { ProfilesStore } from '../profiles.store';

export abstract class ListProfiles extends StoreElement<ProfilesStore> {
  /** Private properties */

  @property({ type: Boolean })
  _loading = true;

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

  async firstUpdated() {
    await this.store.fetchAllProfiles();
    this._loading = false;
  }

  initials(nickname: string): string {
    return nickname
      .split(' ')
      .map(name => name[0])
      .join('');
  }

  render() {
    if (this._loading)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    const allProfiles = this.store.profiles;

    if (Object.keys(allProfiles).length === 0)
      return html`<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;

    return html`
      <mwc-list style="min-width: 80px;">
        ${Object.entries(allProfiles).map(
          ([agent_pub_key, profile]) => html`
            <mwc-list-item graphic="avatar" .value=${agent_pub_key}>
              <ui5-avatar
                slot="graphic"
                .image=${profile.fields.avatar}
                initials=${this.initials(profile.nickname)}
                size="XS"
              ></ui5-avatar>
              <span style="margin-left: 8px;">${profile.nickname}</span>
            </mwc-list-item>
          `
        )}
      </mwc-list>
    `;
  }

  static get scopedElements() {
    return {
      'ui5-avatar': Avatar,
      'mwc-circular-progress': CircularProgress,
      'mwc-list': List,
      'mwc-list-item': ListItem,
    };
  }
}
