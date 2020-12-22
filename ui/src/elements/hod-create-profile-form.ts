import { html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { sharedStyles } from '../sharedStyles';
import { BaseElement } from './base-element';

/**
 * @element hod-create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class HodCreateProfileForm extends BaseElement {
  /** Public attributes */

  /**
   * Minimum length that the nickname needs to have
   * @attr min-length
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 3;

  /** Private properties */

  @query('#nickname-field')
  _nicknameField!: TextField;

  @query('#avatar-file-picker')
  _avatarFilePicker!: HTMLInputElement;

  _existingUsernames: { [key: string]: boolean } = {};

  @property({ type: String })
  _avatar: string | undefined = undefined;

  firstUpdated() {
    this._nicknameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.minLength) {
        this._nicknameField.setCustomValidity(
          `Username is too shot, min. ${this.minLength} characters`
        );
        return {
          valid: false,
        };
      } else if (this._existingUsernames[newValue]) {
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
      await this._profilesService.createProfile({
        nickname,
        fields: { avatar: this._avatar as string },
      });

      this.dispatchEvent(
        new CustomEvent('profile-created', {
          detail: {
            profile: {
              nickname,
              fiels: {
                avatar: this._avatar,
              },
            },
          },
          bubbles: true,
          composed: true,
        })
      );
    } catch (e) {
      console.log(e);
      this._existingUsernames[nickname] = true;
      this._nicknameField.reportValidity();
    }
  }

  // Crop the image and return a base64 bytes string of its content
  cropPlusExport(
    img: HTMLImageElement,
    cropX: number,
    cropY: number,
    cropWidth: number,
    cropHeight: number
  ) {
    // create a temporary canvas sized to the cropped size
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = cropWidth;
    canvas1.height = cropHeight;
    // use the extended from of drawImage to draw the
    // cropped area to the temp canvas
    ctx1?.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
    // return the .toDataURL of the temp canvas
    return canvas1.toDataURL();
  }

  onAvatarUploaded() {
    if (this._avatarFilePicker.files && this._avatarFilePicker.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          this._avatar = this.cropPlusExport(img, 0, 0, 100, 100);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(this._avatarFilePicker.files[0]);
    }
  }

  render() {
    return html`
      <input
        type="file"
        id="avatar-file-picker"
        style="display: none;"
        @change=${this.onAvatarUploaded}
      />

      <div class="column">
        <div class="row center-content">
          ${this._avatar
            ? html`
                <ui5-avatar
                  label="Avatar"
                  image="${this._avatar}"
                  style="margin-bottom: 19px;"
                ></ui5-avatar>
              `
            : html`
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

  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-icon-button': IconButton,
      'ui5-avatar': Avatar,
    };
  }
}
