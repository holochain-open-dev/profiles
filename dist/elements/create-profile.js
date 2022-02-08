import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Card, } from '@scoped-elements/material-web';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
import { EditProfile } from './edit-profile';
/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class CreateProfile extends ScopedElementsMixin(LitElement) {
    /** Private properties */
    async createProfile(profile) {
        await this.store.createProfile(profile);
        this.dispatchEvent(new CustomEvent('profile-created', {
            detail: {
                profile,
            },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <mwc-card>
        <div class="column" style="margin: 16px;">
          <span
            class="title"
            style="margin-bottom: 24px; align-self: flex-start"
            >Create Profile</span
          >
          <edit-profile
            save-profile-label="Create Profile"
            @save-profile=${(e) => this.createProfile(e.detail.profile)}
          ></edit-profile></div
      ></mwc-card>
    `;
    }
    /**
     * @ignore
     */
    static get scopedElements() {
        return {
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
], CreateProfile.prototype, "store", void 0);
//# sourceMappingURL=create-profile.js.map