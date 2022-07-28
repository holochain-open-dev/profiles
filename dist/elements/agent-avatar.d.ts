import { HoloIdenticon } from '@holochain-open-dev/utils';
import { LitElement } from 'lit';
import { SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
import { TaskSubscriber } from 'lit-svelte-stores';
import { AgentPubKey } from '@holochain/client';
import { ProfilesStore } from '../profiles-store';
import { Profile } from '../types';
declare const AgentAvatar_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class AgentAvatar extends AgentAvatar_base {
    /** Public properties */
    /**
     * REQUIRED. The public key identifying the agent whose profile is going to be shown.
     */
    agentPubKey: AgentPubKey;
    /**
     * Size of the avatar image in pixels.
     */
    size: number;
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    _profileTask: TaskSubscriber<(Uint8Array | ProfilesStore)[], Profile | undefined>;
    renderIdenticon(): import("lit-html").TemplateResult<1>;
    renderProfile(profile: Profile | undefined): import("lit-html").TemplateResult<1>;
    render(): unknown;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'holo-identicon': typeof HoloIdenticon;
        'sl-avatar': typeof SlAvatar;
        'sl-skeleton': typeof SlSkeleton;
    };
    static styles: import("lit").CSSResult[];
}
export {};
