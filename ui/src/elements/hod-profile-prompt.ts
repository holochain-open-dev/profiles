import { css, html, property, PropertyValues } from 'lit-element';

import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { sharedStyles } from '../sharedStyles';
import { AgentProfile } from '../types';
import { BaseElement } from './base-element';
import { HodCreateProfileForm } from './hod-create-profile-form';

/**
 * @element hod-profile-prompt
 */
export class HodProfilePrompt extends BaseElement {
  /** Public attributes */

  /** Private properties */

  @property({ type: Object })
  _myProfile: AgentProfile | undefined = undefined;

  @property({ type: Boolean })
  _loading = true;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);
    if (
      changedValues.has('membraneContext') &&
      this.membraneContext.appWebsocket
    ) {
      this.loadMyProfile();
    }
  }

  async loadMyProfile() {
    this._loading = true;
    this._myProfile = await this._profilesService.getMyProfile();
    this._loading = false;
  }

  onProfileCreated(e: CustomEvent) {
    this._myProfile = {
      agent_pub_key: this._myProfile?.agent_pub_key as string,
      profile: e.detail.profile,
    };
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
        ? html`<mwc-circular-progress></mwc-circular-progress>`
        : html`<hod-create-profile-form
            @profile-created=${this.onProfileCreated}
          ></hod-create-profile-form>`}
    </div>`;
  }

  render() {
    return html`
      ${!this._loading && this._myProfile
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
      'hod-create-profile-form': HodCreateProfileForm,
    };
  }
}
