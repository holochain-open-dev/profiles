import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { contextProvider } from '@lit-labs/context';
import { property } from 'lit/decorators.js';
import { profilesStoreContext } from '../context';
export class ProfilesContext extends LitElement {
    render() {
        return html `<slot></slot>`;
    }
}
ProfilesContext.styles = css `
    :host {
      display: contents;
    }
  `;
__decorate([
    contextProvider({ context: profilesStoreContext }),
    property({ type: Object })
], ProfilesContext.prototype, "store", void 0);
//# sourceMappingURL=profiles-context.js.map