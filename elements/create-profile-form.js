import { __decorate } from "tslib";
import { html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import Avatar from '@ui5/webcomponents/dist/Avatar';
import { sharedStyles } from './utils/shared-styles';
import { BaseElement } from './utils/base-element';
/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class CreateProfileForm extends BaseElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Minimum length that the nickname needs to have
         * @attr min-length
         */
        this.minLength = 3;
        this._existingUsernames = {};
        this._avatar = undefined;
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
            if (this._avatar) {
                fields['avatar'] = this._avatar;
            }
            await this.profilesStore.createProfile({
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
    // Crop the image and return a base64 bytes string of its content
    cropPlusExport(img, cropX, cropY, cropWidth, cropHeight) {
        // create a temporary canvas sized to the cropped size
        const canvas1 = document.createElement('canvas');
        const ctx1 = canvas1.getContext('2d');
        canvas1.width = cropWidth;
        canvas1.height = cropHeight;
        // use the extended from of drawImage to draw the
        // cropped area to the temp canvas
        ctx1 === null || ctx1 === void 0 ? void 0 : ctx1.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        // return the .toDataURL of the temp canvas
        return canvas1.toDataURL();
    }
    onAvatarUploaded() {
        if (this._avatarFilePicker.files && this._avatarFilePicker.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                var _a;
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    this._avatar = this.cropPlusExport(img, 0, 0, 100, 100);
                };
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(this._avatarFilePicker.files[0]);
        }
    }
    render() {
        return html `
      <input
        type="file"
        id="avatar-file-picker"
        style="display: none;"
        @change=${this.onAvatarUploaded}
      />

      <div class="column">
        <span class="title" style="margin-bottom: 8px;">Create Profile</span>
        <div class="row center-content">
          ${this._avatar
            ? html `
                <ui5-avatar
                  label="Avatar"
                  image="${this._avatar}"
                  style="margin-bottom: 19px;"
                ></ui5-avatar>
              `
            : html `
                <mwc-icon-button
                  label="Add avatar"
                  icon="add"
                  @click=${() => this._avatarFilePicker.click()}
                >
                </mwc-icon-button>
              `}

          <mwc-textfield
            id="nickname-field"
            outlined
            label="Username"
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
    `;
    }
    getScopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-button': Button,
            'mwc-icon-button': IconButton,
            'ui5-avatar': Avatar,
        };
    }
}
__decorate([
    property({ type: Number, attribute: 'min-length' })
], CreateProfileForm.prototype, "minLength", void 0);
__decorate([
    query('#nickname-field')
], CreateProfileForm.prototype, "_nicknameField", void 0);
__decorate([
    query('#avatar-file-picker')
], CreateProfileForm.prototype, "_avatarFilePicker", void 0);
__decorate([
    property({ type: String })
], CreateProfileForm.prototype, "_avatar", void 0);
//# sourceMappingURL=create-profile-form.js.map