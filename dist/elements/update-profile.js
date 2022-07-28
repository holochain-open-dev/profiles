import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Card, CircularProgress } from '@scoped-elements/material-web';
import { msg } from '@lit/localize';
import { TaskSubscriber } from 'lit-svelte-stores';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
import { EditProfile } from './edit-profile';
/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class UpdateProfile extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Dependencies */
        super(...arguments);
        /** Private properties */
        this._myProfileTask = new TaskSubscriber(this, () => this.store.fetchMyProfile(), () => [this.store]);
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
        return this._myProfileTask.render({
            pending: () => html `<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`,
            complete: profile => html ` <edit-profile
        .profile=${profile}
        .save-profile-label=${msg('Update Profile')}
        @save-profile=${(e) => this.updateProfile(e.detail.profile)}
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
__decorate([
    contextProvided({ context: profilesStoreContext, subscribe: true }),
    property({ type: Object })
], UpdateProfile.prototype, "store", void 0);
//# sourceMappingURL=update-profile.js.map