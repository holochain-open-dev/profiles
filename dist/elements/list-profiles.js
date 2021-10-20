import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { StoreSubscriber } from 'lit-svelte-stores';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@lit-labs/context';
import { CircularProgress, ListItem, List, } from '@scoped-elements/material-web';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
import { AgentAvatar } from './agent-avatar';
export class ListProfiles extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Dependencies */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._allProfiles = new StoreSubscriber(this, () => this._store.knownProfiles);
    }
    async firstUpdated() {
        await this._store.fetchAllProfiles();
        this._loading = false;
    }
    initials(nickname) {
        return nickname
            .split(' ')
            .map(name => name[0])
            .join('');
    }
    render() {
        if (this._loading)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        if (Object.keys(this._allProfiles.value).length === 0)
            return html `<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;
        return html `
      <mwc-list style="min-width: 80px;">
        ${Object.entries(this._allProfiles.value).map(([agent_pub_key, profile]) => html `
            <mwc-list-item
              graphic="avatar"
              .value=${agent_pub_key}
              style="--mdc-list-item-graphic-size: 32px;"
            >
              <agent-avatar slot="graphic" .agentPubKey=${agent_pub_key}>
              </agent-avatar>
              <span>${profile.nickname}</span>
            </mwc-list-item>
          `)}
      </mwc-list>
    `;
    }
    static get scopedElements() {
        return {
            'agent-avatar': AgentAvatar,
            'mwc-circular-progress': CircularProgress,
            'mwc-list': List,
            'mwc-list-item': ListItem,
        };
    }
}
ListProfiles.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    contextProvided({ context: profilesStoreContext })
], ListProfiles.prototype, "_store", void 0);
__decorate([
    state()
], ListProfiles.prototype, "_loading", void 0);
//# sourceMappingURL=list-profiles.js.map