import { Constructor, LitElement } from 'lit-element';
import { ProfilesStore } from '../../profiles.store';
import { Dictionary } from '../../types';
declare const BaseElement_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost> & typeof import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost;
export declare abstract class BaseElement extends BaseElement_base {
    connectedCallback(): void;
    abstract get profilesStore(): ProfilesStore;
    getScopedElements(): Dictionary<Constructor<HTMLElement>>;
}
export declare function connectProfiles<T extends typeof BaseElement>(baseClass: T, store: ProfilesStore): Constructor<HTMLElement>;
export {};
