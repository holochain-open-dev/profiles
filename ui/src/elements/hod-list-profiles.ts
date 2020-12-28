import { css, html, query, property, PropertyValues } from 'lit-element';

import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { AgentProfile, Profile } from '../types';
import { sharedStyles } from '../sharedStyles';
import { BaseElement } from './base-element';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';

export class HodListProfiles extends BaseElement {
  /** Private properties */

  @property({ type: Array })
  _allProfiles: Array<AgentProfile> | undefined = undefined;

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
  updated(changedValues: PropertyValues) {
    super.updated(changedValues);
    if (
      changedValues.has('membraneContext') &&
      this.membraneContext.appWebsocket
    ) {
      this.loadAgents();
    }
  }

  async loadAgents() {
    this._allProfiles = await this._profilesService.getAllProfiles();
  }

  initials(nickname: string): string {
    return nickname
      .split(' ')
      .map(name => name[0])
      .join('');
  }

  render() {
    if (!this._allProfiles)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    if (this._allProfiles.length === 0)
      return html`<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;

    return html`
      ${this._allProfiles.map(
        agent => html`
          <mwc-list style="min-width: 80px;">
            <mwc-list-item graphic="avatar" .value=${agent.agent_pub_key}>
              <ui5-avatar
                slot="graphic"
                .image=${agent.profile.fields.avatar}
                initials=${this.initials(agent.profile.nickname)}
                size="XS"
              ></ui5-avatar>
              <span style="margin-left: 8px;">${agent.profile.nickname}</span>
            </mwc-list-item>
          </mwc-list>
        `
      )}
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
