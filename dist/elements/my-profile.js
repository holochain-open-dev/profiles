import { __decorate } from "tslib";
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { profilesStoreContext } from '../context';
import { sharedStyles } from './utils/shared-styles';
import { ProfileDetail } from './profile-detail';
import { IconButton } from '@scoped-elements/material-web';
import { UpdateProfile } from './update-profile';
/**
 * @element profile-detail
 */
export class MyProfile extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Dependencies */
        super(...arguments);
        /** Private properties */
        this._editing = false;
    }
    render() {
        if (this._editing)
            return html `<update-profile
        @profile-updated=${() => (this._editing = false)}
      ></update-profile>`;
        return html `
      <profile-detail .agentPubKey=${this.store.myAgentPubKey}>
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
}
MyProfile.styles = [sharedStyles];
__decorate([
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], MyProfile.prototype, "store", void 0);
__decorate([
    state()
], MyProfile.prototype, "_editing", void 0);
//# sourceMappingURL=my-profile.js.map