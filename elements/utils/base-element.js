import { MobxReactionUpdate } from '@adobe/lit-mobx';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { LitElement } from 'lit-element';
export class BaseElement extends ScopedElementsMixin(MobxReactionUpdate(LitElement)) {
    connectedCallback() {
        super.connectedCallback();
        for (const [tag, el] of Object.entries(this.getScopedElements())) {
            this.defineScopedElement(tag, el);
        }
    }
    getScopedElements() {
        return {};
    }
}
export function connectProfiles(baseClass, store) {
    return class extends baseClass {
        get profilesStore() {
            return store;
        }
    };
}
//# sourceMappingURL=base-element.js.map