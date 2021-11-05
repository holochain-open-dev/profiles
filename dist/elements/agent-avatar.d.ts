import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { LitElement } from 'lit';
import { ProfilesStore } from '../profiles-store';
import { HoloIdenticon } from './holo-identicon';
import { StoreSubscriber } from 'lit-svelte-stores';
declare const AgentAvatar_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class AgentAvatar extends AgentAvatar_base {
    /** Public properties */
    agentPubKey: AgentPubKeyB64;
    size: number;
    /** Dependencies */
    _store: ProfilesStore;
    _profile: StoreSubscriber<import("..").Profile>;
    firstUpdated(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    static get scopedElements(): {
        'holo-identicon': typeof HoloIdenticon;
        'sl-avatar': typeof import("@scoped-elements/shoelace/dist/sl-avatar").SlAvatar;
        'sl-skeleton': typeof import("@shoelace-style/shoelace").SlSkeleton;
    };
    static styles: import("lit").CSSResult[];
}
export {};
