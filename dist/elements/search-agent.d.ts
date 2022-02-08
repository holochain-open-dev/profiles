import { LitElement } from 'lit';
import { MenuSurface, List, ListItem, TextField } from '@scoped-elements/material-web';
import { AgentProfile } from '../types';
import { ProfilesStore } from '../profiles-store';
import { AgentAvatar } from './agent-avatar';
declare const SearchAgent_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: 'uhCAkSEspAJks5Q8863Jg1RJhuJHJpFWzwDJkxVjVSk9JueU' }
 */
export declare class SearchAgent extends SearchAgent_base {
    /** Public attributes */
    /**
     * Whether to clear the field when an agent is selected.
     * @attr clear-on-select
     */
    clearOnSelect: boolean;
    /**
     * Whether to include my own agent as a possible agent to select.
     * @attr include-myself
     */
    includeMyself: boolean;
    /**
     * Label for the agent searching field.
     * @attr field-label
     */
    fieldLabel: string;
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _knownProfiles;
    private get _filteredAgents();
    private _currentFilter;
    private _lastSearchedPrefix;
    private _textField;
    private _overlay;
    firstUpdated(): void;
    searchAgents(nicknamePrefix: string): Promise<void>;
    onFilterChange(): void;
    onUsernameSelected(agent: AgentProfile): void;
    render(): import("lit").TemplateResult<1>;
    static get styles(): import("lit").CSSResult[];
    /**
     * @ignore
     */
    static get scopedElements(): {
        'agent-avatar': typeof AgentAvatar;
        'mwc-textfield': typeof TextField;
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
