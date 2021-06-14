import { __decorate } from "tslib";
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { MobxLitElement } from '@adobe/lit-mobx';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { requestContext } from '@holochain-open-dev/context';
import { sharedStyles } from './utils/shared-styles';
import { CreateProfileForm } from './create-profile-form';
import { PROFILES_STORE_CONTEXT } from '../types';
/**
 * @element profile-prompt
 */
export class ProfilePrompt extends ScopedElementsMixin(MobxLitElement) {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._loading = true;
    }
    async firstUpdated() {
        await this._store.fetchMyProfile();
        this._loading = false;
    }
    renderPrompt() {
        return html ` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
            ? html `<mwc-circular-progress indeterminate></mwc-circular-progress>`
            : html `<create-profile-form></create-profile-form>`}
    </div>`;
    }
    render() {
        return html `
      ${!this._loading && this._store.myProfile
            ? html `<slot></slot>`
            : this.renderPrompt()}
    `;
    }
    static get scopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-button': Button,
            'mwc-circular-progress': CircularProgress,
            'create-profile-form': CreateProfileForm,
        };
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
}
__decorate([
    property({ type: Boolean })
], ProfilePrompt.prototype, "_loading", void 0);
__decorate([
    requestContext(PROFILES_STORE_CONTEXT)
], ProfilePrompt.prototype, "_store", void 0);
//# sourceMappingURL=profile-prompt.js.map