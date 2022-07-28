import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Button, CircularProgress, TextField, } from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@lit-labs/context';
import { TaskSubscriber } from 'lit-svelte-stores';
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
        this._myProfileTask = new TaskSubscriber(this, () => this.store.fetchMyProfile(), () => [this.store]);
    }
    renderPrompt(myProfile) {
        if (myProfile)
            return html `<slot></slot>`;
        return html `
      <div class="flex-scrollable-parent">
        <div class="flex-scrollable-container">
          <div class="flex-scrollable-y">
            <div
              class="column"
              style="align-items: center; justify-content: center; flex: 1; padding-bottom: 10px;"
            >
              <div class="column" style="align-items: center;">
                <slot name="hero"></slot>
                <create-profile></create-profile>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    render() {
        return this._myProfileTask.render({
            pending: () => html ` <div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`,
            complete: profile => this.renderPrompt(profile),
        });
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
          flex: 1;
        }
      `,
        ];
    }
}
__decorate([
    contextProvided({ context: profilesStoreContext, subscribe: true }),
    property({ type: Object })
], ProfilePrompt.prototype, "store", void 0);
//# sourceMappingURL=profile-prompt.js.map