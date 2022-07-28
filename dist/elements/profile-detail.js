import { __decorate } from "tslib";
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { TaskSubscriber } from 'lit-svelte-stores';
import { property } from 'lit/decorators.js';
import { SlSkeleton } from '@scoped-elements/shoelace';
import { profilesStoreContext } from '../context';
import { sharedStyles } from './utils/shared-styles';
import { AgentAvatar } from './agent-avatar';
import { msg } from '@lit/localize';
/**
 * @element profile-detail
 */
export class ProfileDetail extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public properties */
        super(...arguments);
        /** Private properties */
        this._agentProfileTask = new TaskSubscriber(this, () => this.store.fetchAgentProfile(this.agentPubKey), () => [this.store, this.agentPubKey]);
    }
    getAdditionalFields() {
        const fields = {};
        for (const [key, value] of Object.entries(this._agentProfileTask.value.fields)) {
            if (key !== 'avatar') {
                fields[key] = value;
            }
        }
        return fields;
    }
    renderAdditionalField(fieldId, fieldValue) {
        return html `
      <div class="row" style="margin-top: 16px">
        <span style="margin-right: 16px; "> <strong>${fieldId}</strong></span>
        <span>${fieldValue}</span>
      </div>
    `;
    }
    renderProfile(profile) {
        if (!profile)
            return html `<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <span class="placeholder"
          >${msg("This agent hasn't created a profile yet")}</span
        >
      </div>`;
        return html `
      <div class="column">
        <div class="row" style="align-items: center">
          <agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
          <span style="font-size: 16px; margin-left: 8px;"
            >${profile.nickname}</span
          >

          <span style="flex: 1"></span>

          <slot name="action"></slot>
        </div>

        ${Object.entries(this.getAdditionalFields()).map(([key, value]) => this.renderAdditionalField(key, value))}
      </div>
    `;
    }
    render() {
        return this._agentProfileTask.render({
            pending: () => html `
        <div class="column">
          <div class="row" style="align-items: center">
            <sl-skeleton
              effect="pulse"
              style="height: 32px; width: 32px; border-radius: 50%;"
            ></sl-skeleton>
            <div>
              <sl-skeleton
                effect="pulse"
                style="width: 122px; margin-left: 8px;"
              ></sl-skeleton>
            </div>
          </div>

          ${this.store.config.additionalFields.map(() => html `
              <sl-skeleton
                effect="pulse"
                style="width: 200px; margin-top: 16px;"
              ></sl-skeleton>
            `)}
        </div>
      `,
            complete: profile => this.renderProfile(profile),
        });
    }
    /**
     * @ignore
     */
    static get scopedElements() {
        return {
            'agent-avatar': AgentAvatar,
            'sl-skeleton': SlSkeleton,
        };
    }
}
ProfileDetail.styles = [sharedStyles];
__decorate([
    property({ type: Object })
], ProfileDetail.prototype, "agentPubKey", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext, subscribe: true }),
    property({ type: Object })
], ProfileDetail.prototype, "store", void 0);
//# sourceMappingURL=profile-detail.js.map