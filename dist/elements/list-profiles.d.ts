import { LitElement } from 'lit';
import { CircularProgress, ListItem, List } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
import { AgentAvatar } from './agent-avatar';
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
    private _loading;
    private _allProfiles;
    firstUpdated(): Promise<void>;
    initials(nickname: string): string;
    fireAgentSelected(index: number): void;
    render(): import("lit").TemplateResult<1>;
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
