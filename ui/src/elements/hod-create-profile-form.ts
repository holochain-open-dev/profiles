import { LitElement, css, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ApolloClient } from '@apollo/client/core';

import type { TextField } from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
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

  _existingUsernames: { [key: string]: boolean } = {};

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
          username,
        },
      });

      this.dispatchEvent(
        new CustomEvent('profile-created', {
          detail: {
            profile: {
              username,
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

  render() {
    return html`
      <div class="column">
        <mwc-textfield
          id="username-field"
          outlined
          label="Username"
          @input=${() => this._usernameField.reportValidity()}
        ></mwc-textfield>
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
