import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { LitElement } from 'lit';
import { ProfilesStore } from '../profiles-store';
import { HoloIdenticon } from './holo-identicon';
import { SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
declare const AgentAvatar_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class AgentAvatar extends AgentAvatar_base {
    /** Public properties */
    /**
     * REQUIRED. The public key identifying the agent whose profile is going to be shown.
     */
    agentPubKey: AgentPubKeyB64;
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
    private _profile;
    firstUpdated(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
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
