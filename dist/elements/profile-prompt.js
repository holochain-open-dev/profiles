import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Button, CircularProgress, TextField, } from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@holochain-open-dev/context';
import { StoreSubscriber } from 'lit-svelte-stores';
import { sharedStyles } from './utils/shared-styles';
import { CreateProfile } from './create-profile';
import { profilesStoreContext } from '../context';
/**
 * @element profile-prompt
 * @slot hero - Will be displayed above the create-profile form when the user is prompted with it
 */
export class ProfilePrompt extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._myProfile = new StoreSubscriber(this, () => { var _a; return (_a = this.store) === null || _a === void 0 ? void 0 : _a.myProfile; });
    }
    async firstUpdated() {
        await this.store.fetchMyProfile();
        this._loading = false;
    }
    renderPrompt() {
        return html ` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
            ? html `<mwc-circular-progress indeterminate></mwc-circular-progress>`
            : html ` <div class="column" style="align-items: center;">
            <slot name="hero"></slot>
            <create-profile></create-profile>
          </div>`}
    </div>`;
    }
    render() {
        return html `
      ${!this._loading && this._myProfile.value
            ? html `<slot></slot>`
            : this.renderPrompt()}
    `;
    }
    /**
     * @ignore
     */
    static get scopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-button': Button,
            'mwc-circular-progress': CircularProgress,
            'create-profile': CreateProfile,
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
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], ProfilePrompt.prototype, "store", void 0);
__decorate([
    state()
], ProfilePrompt.prototype, "_loading", void 0);
//# sourceMappingURL=profile-prompt.js.map