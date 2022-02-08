import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Card, CircularProgress, } from '@scoped-elements/material-web';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
import { EditProfile } from './edit-profile';
import { StoreSubscriber } from 'lit-svelte-stores';
/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class UpdateProfile extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Dependencies */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._myProfile = new StoreSubscriber(this, () => { var _a; return (_a = this.store) === null || _a === void 0 ? void 0 : _a.myProfile; });
    }
    async firstUpdated() {
        await this.store.fetchMyProfile();
        this._loading = false;
    }
    async updateProfile(profile) {
        await this.store.updateProfile(profile);
        this.dispatchEvent(new CustomEvent('profile-updated', {
            detail: {
                profile,
            },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        if (this._loading)
            return html `<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        return html `
      <edit-profile
        .profile=${this._myProfile.value}
        save-profile-label="Update Profile"
        @save-profile=${(e) => this.updateProfile(e.detail.profile)}
      ></edit-profile>
    `;
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
__decorate([
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], UpdateProfile.prototype, "store", void 0);
__decorate([
    state()
], UpdateProfile.prototype, "_loading", void 0);
//# sourceMappingURL=update-profile.js.map