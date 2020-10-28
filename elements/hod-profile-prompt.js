import { __decorate } from "tslib";
import { LitElement, css, html, property } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { GET_MY_PROFILE } from '../graphql/queries';
import { sharedStyles } from '../sharedStyles';
/**
 * @element hod-profile-prompt
 */
export class HodProfilePrompt extends LitElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._myProfile = undefined;
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
    async firstUpdated() {
        const result = await this._apolloClient.query({
            query: GET_MY_PROFILE,
        });
        this._myProfile = result.data.me;
    }
    agentHasCreatedProfile() {
        return this._myProfile && this._myProfile.profile !== null;
    }
    onProfileCreated(e) {
        var _a;
        this._myProfile = {
            id: (_a = this._myProfile) === null || _a === void 0 ? void 0 : _a.id,
            profile: e.detail.profile,
        };
    }
    renderPrompt() {
        return html ` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._myProfile
            ? html `<hod-create-profile-form
            @profile-created=${this.onProfileCreated}
          ></hod-create-profile-form>`
            : html `<mwc-circular-progress></mwc-circular-progress>`}
    </div>`;
    }
    render() {
        return html `
      ${this.agentHasCreatedProfile()
            ? html `<slot></slot>`
            : this.renderPrompt()}
    `;
    }
}
__decorate([
    property({ type: Object })
], HodProfilePrompt.prototype, "_myProfile", void 0);
//# sourceMappingURL=hod-profile-prompt.js.map