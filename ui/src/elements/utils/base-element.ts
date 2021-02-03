import { MobxReactionUpdate } from '@adobe/lit-mobx';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Constructor, LitElement } from 'lit-element';
import { ProfilesStore } from '../../profiles.store';
import { Dictionary } from '../../types';

export abstract class BaseElement extends ScopedElementsMixin(
  MobxReactionUpdate(LitElement)
) {
  connectedCallback() {
    super.connectedCallback();
    for (const [tag, el] of Object.entries(this.getScopedElements())) {
      this.defineScopedElement(tag, el);
    }
  }

  abstract get profilesStore(): ProfilesStore;

  getScopedElements(): Dictionary<Constructor<HTMLElement>> {
    return {};
  }
}

export function connect<T extends typeof BaseElement>(
  baseClass: T,
  store: ProfilesStore
): Constructor<HTMLElement> {
  return class extends ((baseClass as unknown) as typeof HTMLElement) {
    get profilesStore(): ProfilesStore {
      return store;
    }
  };
}
