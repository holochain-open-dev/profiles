import { LitElement } from 'lit';
import { SlSkeleton } from '@scoped-elements/shoelace';
import { AgentPubKey } from '@holochain/client';
import { ProfilesStore } from '../profiles-store';
import { AgentAvatar } from './agent-avatar';
import { Profile } from '../types';
declare const ProfileDetail_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element profile-detail
 */
export declare class ProfileDetail extends ProfileDetail_base {
    /** Public properties */
    /**
     * REQUIRED. Public key identifying the agent for which the profile should be shown
     */
    agentPubKey: AgentPubKey;
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _agentProfileTask;
    getAdditionalFields(): Record<string, string>;
    renderAdditionalField(fieldId: string, fieldValue: string): import("lit-html").TemplateResult<1>;
    renderProfile(profile: Profile | undefined): import("lit-html").TemplateResult<1>;
    render(): unknown;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'agent-avatar': typeof AgentAvatar;
        'sl-skeleton': typeof SlSkeleton;
    };
    static styles: import("lit").CSSResult[];
}
export {};
