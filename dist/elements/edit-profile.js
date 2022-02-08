import { __decorate } from "tslib";
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Button, Fab, IconButton, TextField, } from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';
import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { profilesStoreContext } from '../context';
import { resizeAndExport } from './utils/image';
import { sharedStyles } from './utils/shared-styles';
/**
 * @element edit-profile
 * @fires save-profile - Fired when the save profile button is clicked
 */
export class EditProfile extends ScopedElementsMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * Label for the save profile button.
         */
        this.saveProfileLabel = 'Save Profile';
        this._existingUsernames = {};
    }
    firstUpdated() {
        var _a;
        this._avatar = (_a = this.profile) === null || _a === void 0 ? void 0 : _a.fields['avatar'];
        this._nicknameField.validityTransform = (newValue) => {
            this.requestUpdate();
            if (newValue.length < this.store.config.minNicknameLength) {
                this._nicknameField.setCustomValidity(`Nickname is too short`);
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
    onAvatarUploaded() {
        if (this._avatarFilePicker.files && this._avatarFilePicker.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                var _a;
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    this._avatar = resizeAndExport(img);
                    this._avatarFilePicker.value = '';
                };
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(this._avatarFilePicker.files[0]);
        }
    }
    avatarMode() {
        return this.store.config.avatarMode === 'avatar';
    }
    renderAvatar() {
        if (!this.avatarMode())
            return html ``;
        return html `
      <div
        style="width: 80px; height: 80px; justify-content: center;"
        class="row"
      >
        ${this._avatar
            ? html `
              <div class="column" style="align-items: center; ">
                <sl-avatar
                  image="${this._avatar}"
                  alt="Avatar"
                  style="margin-bottom: 4px; --size: 3.5rem;"
                  initials=""
                ></sl-avatar>
                <span
                  class="placeholder label"
                  style="cursor: pointer;   text-decoration: underline;"
                  @click=${() => (this._avatar = undefined)}
                  >Clear</span
                >
              </div>
            `
            : html ` <div class="column" style="align-items: center;">
              <mwc-fab
                icon="add"
                @click=${() => this._avatarFilePicker.click()}
                style="margin-bottom: 4px;"
              ></mwc-fab>
              <span class="placeholder label">Avatar</span>
            </div>`}
      </div>
    `;
    }
    shouldSaveButtonBeEnabled() {
        if (!this._nicknameField)
            return false;
        if (!this._nicknameField.validity.valid)
            return false;
        if (this.avatarMode() && !this._avatar)
            return false;
        if (Object.values(this.getAdditionalTextFields()).find(t => !t.validity.valid))
            return false;
        return true;
    }
    textfieldToFieldId(field) {
        return field.id.split('-')[2];
    }
    getAdditionalFieldsValues() {
        const textfields = this.getAdditionalTextFields();
        const values = {};
        for (const [id, textfield] of Object.entries(textfields)) {
            values[id] = textfield.value;
        }
        return values;
    }
    getAdditionalTextFields() {
        const textfields = Array.from(this.shadowRoot.querySelectorAll('mwc-textfield')).filter(f => f.id !== 'nickname-field');
        const fields = {};
        for (const field of textfields) {
            const id = this.textfieldToFieldId(field);
            fields[id] = field;
        }
        return fields;
    }
    fireSaveProfile() {
        const nickname = this._nicknameField.value;
        const fields = this.getAdditionalFieldsValues();
        if (this._avatar) {
            fields['avatar'] = this._avatar;
        }
        const profile = {
            fields,
            nickname,
        };
        this.dispatchEvent(new CustomEvent('save-profile', {
            detail: {
                profile,
            },
            bubbles: true,
            composed: true,
        }));
    }
    renderField(fieldName) {
        var _a;
        return html `
      <mwc-textfield
        id="profile-field-${fieldName}"
        outlined
        required
        autoValidate
        validationMessage="This field is required"
        .label=${fieldName}
        .value=${((_a = this.profile) === null || _a === void 0 ? void 0 : _a.fields[fieldName]) || ''}
        @input=${() => this.requestUpdate()}
        style="margin-top: 8px;"
      ></mwc-textfield>
    `;
    }
    render() {
        var _a;
        return html `
      ${this.avatarMode()
            ? html `<input
              type="file"
              id="avatar-file-picker"
              style="display: none;"
              @change=${this.onAvatarUploaded}
            />`
            : html ``}
        <div class="column">

          <div class="row" style="justify-content: center; margin-bottom: 8px; align-self: start;" >
            ${this.renderAvatar()}

            <mwc-textfield
              id="nickname-field"
              outlined
              label="Nickname"
              .value=${((_a = this.profile) === null || _a === void 0 ? void 0 : _a.nickname) || ''}
              .helper=${`Min. ${this.store.config.minNicknameLength} characters`}
              @input=${() => this._nicknameField.reportValidity()}
              style="margin-left: 8px;"
            ></mwc-textfield>
          </div>

          ${this.store.config.additionalFields.map(field => this.renderField(field))}

          <mwc-button
            raised
            style="margin-top: 8px;"
            .disabled=${!this.shouldSaveButtonBeEnabled()}
            .label=${this.saveProfileLabel}
            @click=${() => this.fireSaveProfile()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
    }
    /**
     * @ignore
     */
    static get scopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-button': Button,
            'mwc-fab': Fab,
            'mwc-icon-button': IconButton,
            'sl-avatar': SlAvatar,
        };
    }
}
EditProfile.styles = [sharedStyles];
__decorate([
    property({ type: Object })
], EditProfile.prototype, "profile", void 0);
__decorate([
    property({ type: String, attribute: 'save-profile-label' })
], EditProfile.prototype, "saveProfileLabel", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], EditProfile.prototype, "store", void 0);
__decorate([
    query('#nickname-field')
], EditProfile.prototype, "_nicknameField", void 0);
__decorate([
    query('#avatar-file-picker')
], EditProfile.prototype, "_avatarFilePicker", void 0);
__decorate([
    state()
], EditProfile.prototype, "_avatar", void 0);
//# sourceMappingURL=edit-profile.js.map