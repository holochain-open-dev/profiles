import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import { MobxLitElement } from '@adobe/lit-mobx';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles.store';

export class ListProfiles extends ScopedRegistryHost(MobxLitElement) {
  /** Private properties */

  @state()
  _loading = true;

  @requestContext('hc_zome_profiles/store')
  _store!: ProfilesStore;

  async firstUpdated() {
    await this._store.fetchAllProfiles();
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
    const allProfiles = this._store.profiles;

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

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  static elementDefinitions = {
    'ui5-avatar': Avatar,
    'mwc-circular-progress': CircularProgress,
    'mwc-list': List,
    'mwc-list-item': ListItem,
  };
}