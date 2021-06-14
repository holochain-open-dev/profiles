import { __decorate } from "tslib";
import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { requestContext } from '@holochain-open-dev/context';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import Avatar from '@ui5/webcomponents/dist/Avatar';
import { sharedStyles } from './utils/shared-styles';
export class ListProfiles extends ScopedElementsMixin(MobxLitElement) {
    constructor() {
        /** Private properties */
        super(...arguments);
        this._loading = true;
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
        const allProfiles = this._store.profiles;
        if (Object.keys(allProfiles).length === 0)
            return html `<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;
        return html `
      <mwc-list style="min-width: 80px;">
        ${Object.entries(allProfiles).map(([agent_pub_key, profile]) => html `
            <mwc-list-item graphic="avatar" .value=${agent_pub_key}>
              <ui5-avatar
                slot="graphic"
                .image=${profile.fields.avatar}
                initials=${this.initials(profile.nickname)}
                size="XS"
              ></ui5-avatar>
              <span style="margin-left: 8px;">${profile.nickname}</span>
            </mwc-list-item>
          `)}
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
ListProfiles.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    state()
], ListProfiles.prototype, "_loading", void 0);
__decorate([
    requestContext('hc_zome_profiles/store')
], ListProfiles.prototype, "_store", void 0);
//# sourceMappingURL=list-profiles.js.map