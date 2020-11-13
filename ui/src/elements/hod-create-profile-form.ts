import { LitElement, css, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ApolloClient } from '@apollo/client/core';

import type { TextField } from '@material/mwc-textfield';
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
export abstract class HodCreateProfileForm extends LitElement {
  /** Public attributes */

  /**
   * Minimum length that the username needs to have
   * @attr min-length
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 3;

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  @query('#username-field')
  _usernameField!: TextField;

  @query('#avatar-file-picker')
  _avatarFilePicker!: HTMLInputElement;

  _existingUsernames: { [key: string]: boolean } = {};

  @property({ type: String })
  _avatar: string | undefined = undefined;

  firstUpdated() {
    this._usernameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.minLength) {
        this._usernameField.setCustomValidity(
          `Username is too shot, min. ${this.minLength} characters`
        );
        return {
          valid: false,
        };
      } else if (this._existingUsernames[newValue]) {
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

      this.dispatchEvent(
        new CustomEvent('profile-created', {
          detail: {
            profile: {
              username,
              avatar: this._avatar,
            },
          },
          bubbles: true,
          composed: true,
        })
      );
    } catch (e) {
      this._existingUsernames[username] = true;
      this._usernameField.reportValidity();
    }
  }

  cropPlusExport(
    img: HTMLImageElement,
    cropX: number,
    cropY: number,
    cropWidth: number,
    cropHeight: number
  ) {
    // create a temporary canvas sized to the cropped size
    var canvas1 = document.createElement('canvas');
    var ctx1 = canvas1.getContext('2d');
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
                <sp-avatar
                  label="Avatar"
                  src="${this._avatar}"
                  style="margin-bottom: 19px;"
                ></sp-avatar>
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
