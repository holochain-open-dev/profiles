import { html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Card } from 'scoped-material-components/mwc-card';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { sharedStyles } from './utils/shared-styles';
import { Dictionary } from '../types';
import { Icon } from 'scoped-material-components/mwc-icon';
import { Ripple } from 'scoped-material-components/mwc-ripple';
import { StoreElement } from '@holochain-open-dev/common';
import { ProfilesStore } from '../profiles.store';

/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export abstract class CreateProfileForm extends StoreElement<ProfilesStore> {
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
      const fields: Dictionary<string> = {};
      if (this._avatar) {
        fields['avatar'] = this._avatar;
      }
      await this.store.createProfile({
        nickname,
        fields,
      });

      this.dispatchEvent(
        new CustomEvent('profile-created', {
          detail: {
            profile: {
              nickname,
              fields,
            },
          },
          bubbles: true,
          composed: true,
        })
      );
    } catch (e) {
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
      <mwc-card style="width: auto">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 24px;">Create Profile</span>
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
                  <div
                    @click=${() => this._avatarFilePicker.click()}
                    style="width: 100px; height: 80px; margin-right: 8px; border-radius: 4px; position: relative; background-color: #d3d3d373; cursor: pointer;"
                    class="column center-content"
                  >
                    <mwc-ripple></mwc-ripple>

                    <mwc-icon style="margin-bottom: 8px;">add</mwc-icon>
                    <span>Avatar</span>
                  </div>
                `}

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

  getScopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-icon': Icon,
      'mwc-card': Card,
      'mwc-ripple': Ripple,
      'ui5-avatar': Avatar,
    };
  }
}
