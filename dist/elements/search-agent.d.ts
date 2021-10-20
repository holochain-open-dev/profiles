import { LitElement } from 'lit';
import { MenuSurface, List, ListItem, TextField } from '@scoped-elements/material-web';
import { StoreSubscriber } from 'lit-svelte-stores';
import { AgentProfile } from '../types';
import { ProfilesStore } from '../profiles-store';
import { AgentAvatar } from './agent-avatar';
declare const SearchAgent_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export declare class SearchAgent extends SearchAgent_base {
    /** Public attributes */
    /**
     * Whether to clear the field when an agent is selected
     * @attr clear-on-select
     */
    clearOnSelect: boolean;
    /**
     * Whether to include my own agent as a possible agent to select
     * @attr include-myself
     */
    includeMyself: boolean;
    /**
     * Label for the agent searching field
     * @attr field-label
     */
    fieldLabel: string;
    /** Dependencies */
    _store: ProfilesStore;
    /** Private properties */
    _knownProfiles: StoreSubscriber<import("@holochain-open-dev/core-types").Dictionary<import("../types").Profile>>;
    get _filteredAgents(): Array<AgentProfile>;
    _currentFilter: string | undefined;
    _lastSearchedPrefix: string | undefined;
    _textField: TextField;
    _overlay: MenuSurface;
    firstUpdated(): void;
    searchAgents(nicknamePrefix: string): Promise<void>;
    onFilterChange(): void;
    onUsernameSelected(agent: AgentProfile): void;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult[];
    static get scopedElements(): {
        'agent-avatar': typeof AgentAvatar;
        'mwc-textfield': typeof TextField;
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
