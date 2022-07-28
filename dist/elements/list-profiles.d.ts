import { LitElement } from 'lit';
import { CircularProgress, ListItem, List } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
import { AgentAvatar } from './agent-avatar';
import { Profile } from '../types';
import { HoloHashMap } from '@holochain-open-dev/utils';
declare const ListProfiles_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element list-profiles
 * @fires agent-selected - Fired when the user selects an agent from the list. Detail will have this shape: { agentPubKey: 'uhCAkSEspAJks5Q8863Jg1RJhuJHJpFWzwDJkxVjVSk9JueU' }
 */
export declare class ListProfiles extends ListProfiles_base {
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _allProfilesTask;
    initials(nickname: string): string;
    fireAgentSelected(index: number): void;
    renderList(profiles: HoloHashMap<Profile>): import("lit-html").TemplateResult<1>;
    render(): unknown;
    static styles: import("lit").CSSResult[];
    /**
     * @ignore
     */
    static get scopedElements(): {
        'agent-avatar': typeof AgentAvatar;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
