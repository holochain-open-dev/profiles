import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { TextField, Button, Card, Ripple, Icon, } from '@scoped-elements/material-web';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class CreateProfileForm extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Minimum length that the nickname needs to have
         * @attr min-length
         */
        this.minLength = 3;
        this._existingUsernames = {};
    }
    firstUpdated() {
        this._nicknameField.validityTransform = (newValue) => {
            this.requestUpdate();
            if (newValue.length < this.minLength) {
                this._nicknameField.setCustomValidity(`Username is too shot, min. ${this.minLength} characters`);
                return {
                    valid: false,
                };
            }
            else if (this._existingUsernames[newValue]) {
                this._nicknameField.setCustomValidity('This nickname already exists');
                return { valid: false };
            }
            return {
                valid: true,
            };
        };
    }
    static get styles() {
        return sharedStyles;
    }
    async createProfile() {
        const nickname = this._nicknameField.value;
        try {
            const fields = {};
            await this._store.createProfile({
                nickname,
                fields,
            });
            this.dispatchEvent(new CustomEvent('profile-created', {
                detail: {
                    profile: {
                        nickname,
                        fields,
                    },
                },
                bubbles: true,
                composed: true,
            }));
        }
        catch (e) {
            this._existingUsernames[nickname] = true;
            this._nicknameField.reportValidity();
        }
    }
    render() {
        return html `
      <mwc-card style="width: auto">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 24px;">Create Profile</span>
          <div class="row center-content">
            <mwc-textfield
              id="nickname-field"
              outlined
              label="Nickname"
              @input=${() => this._nicknameField.reportValidity()}
              style="margin-left: 8px;"
            ></mwc-textfield>
          </div>
          <mwc-button
            id="create-profile-button"
            raised
            class=${classMap({
            'small-margin': !!this._nicknameField,
            'big-margin': !this._nicknameField,
        })}
            .disabled=${!this._nicknameField ||
            !this._nicknameField.validity.valid}
            label="CREATE PROFILE"
            @click=${() => this.createProfile()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
    }
    static get scopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-button': Button,
            'mwc-icon': Icon,
            'mwc-card': Card,
            'mwc-ripple': Ripple,
        };
    }
}
__decorate([
    property({ type: Number, attribute: 'min-length' })
], CreateProfileForm.prototype, "minLength", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext })
], CreateProfileForm.prototype, "_store", void 0);
__decorate([
    query('#nickname-field')
], CreateProfileForm.prototype, "_nicknameField", void 0);
//# sourceMappingURL=create-profile-form.js.map