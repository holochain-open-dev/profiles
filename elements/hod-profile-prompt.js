import { __decorate } from "tslib";
import { css, html, property } from 'lit-element';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { sharedStyles } from '../sharedStyles';
import { BaseElement } from './base-element';
import { HodCreateProfileForm } from './hod-create-profile-form';
/**
 * @element hod-profile-prompt
 */
export class HodProfilePrompt extends BaseElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._myProfile = undefined;
        this._loading = true;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
      `,
        ];
    }
    updated(changedValues) {
        super.updated(changedValues);
        if (changedValues.has('membraneContext') &&
            this.membraneContext.appWebsocket) {
            this.loadMyProfile();
        }
    }
    async loadMyProfile() {
        this._loading = true;
        this._myProfile = await this._profilesService.getMyProfile();
        this._loading = false;
    }
    onProfileCreated(e) {
        var _a;
        this._myProfile = {
            agent_pub_key: (_a = this._myProfile) === null || _a === void 0 ? void 0 : _a.agent_pub_key,
            profile: e.detail.profile,
        };
    }
    renderPrompt() {
        return html ` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
            ? html `<mwc-circular-progress></mwc-circular-progress>`
            : html `<hod-create-profile-form
            @profile-created=${this.onProfileCreated}
          ></hod-create-profile-form>`}
    </div>`;
    }
    render() {
        return html `
      ${!this._loading && this._myProfile
            ? html `<slot></slot>`
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
__decorate([
    property({ type: Object })
], HodProfilePrompt.prototype, "_myProfile", void 0);
__decorate([
    property({ type: Boolean })
], HodProfilePrompt.prototype, "_loading", void 0);
//# sourceMappingURL=hod-profile-prompt.js.map