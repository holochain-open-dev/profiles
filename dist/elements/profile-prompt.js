import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Button, CircularProgress, TextField, } from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@lit-labs/context';
import { StoreSubscriber } from 'lit-svelte-stores';
import { sharedStyles } from './utils/shared-styles';
import { CreateProfileForm } from './create-profile-form';
import { profilesStoreContext } from '../context';
/**
 * @element profile-prompt
 */
export class ProfilePrompt extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._myProfile = new StoreSubscriber(this, () => this._store.myProfile);
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
      ${!this._loading && this._myProfile.value
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
    contextProvided({ context: profilesStoreContext })
], ProfilePrompt.prototype, "_store", void 0);
__decorate([
    property({ type: Boolean })
], ProfilePrompt.prototype, "_loading", void 0);
//# sourceMappingURL=profile-prompt.js.map