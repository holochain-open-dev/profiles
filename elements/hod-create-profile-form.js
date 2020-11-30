import { __decorate } from "tslib";
import { LitElement, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@spectrum-web-components/avatar/sp-avatar.js';
import { CREATE_PROFILE } from '../graphql/queries';
import { sharedStyles } from '../sharedStyles';
/**
 * @element hod-create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class HodCreateProfileForm extends LitElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Minimum length that the username needs to have
         * @attr min-length
         */
        this.minLength = 3;
        this._existingUsernames = {};
        this._avatar = undefined;
    }
    firstUpdated() {
        this._usernameField.validityTransform = (newValue) => {
            this.requestUpdate();
            if (newValue.length < this.minLength) {
                this._usernameField.setCustomValidity(`Username is too shot, min. ${this.minLength} characters`);
                return {
                    valid: false,
                };
            }
            else if (this._existingUsernames[newValue]) {
                this._usernameField.setCustomValidity('This username already exists');
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
        const username = this._usernameField.value;
        try {
            await this._apolloClient.mutate({
                mutation: CREATE_PROFILE,
                variables: {
                    profile: {
                        username,
                        avatar: this._avatar,
                    },
                },
            });
            this.dispatchEvent(new CustomEvent('profile-created', {
                detail: {
                    profile: {
                        username,
                        avatar: this._avatar,
                    },
                },
                bubbles: true,
                composed: true,
            }));
        }
        catch (e) {
            console.log(e);
            this._existingUsernames[username] = true;
            this._usernameField.reportValidity();
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
        <div class="row center-content">
          ${this._avatar
            ? html `
                <sp-avatar
                  label="Avatar"
                  src="${this._avatar}"
                  style="margin-bottom: 19px;"
                ></sp-avatar>
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
            id="username-field"
            outlined
            label="Username"
            @input=${() => this._usernameField.reportValidity()}
            style="margin-left: 8px;"
          ></mwc-textfield>
        </div>
        <mwc-button
          id="create-profile-button"
          raised
          class=${classMap({
            'small-margin': !!this._usernameField,
            'big-margin': !this._usernameField,
        })}
          .disabled=${!this._usernameField ||
            !this._usernameField.validity.valid}
          label="CREATE PROFILE"
          @click=${() => this.createProfile()}
        ></mwc-button>
      </div>
    `;
    }
}
__decorate([
    property({ type: Number, attribute: 'min-length' })
], HodCreateProfileForm.prototype, "minLength", void 0);
__decorate([
    query('#username-field')
], HodCreateProfileForm.prototype, "_usernameField", void 0);
__decorate([
    query('#avatar-file-picker')
], HodCreateProfileForm.prototype, "_avatarFilePicker", void 0);
__decorate([
    property({ type: String })
], HodCreateProfileForm.prototype, "_avatar", void 0);
//# sourceMappingURL=hod-create-profile-form.js.map