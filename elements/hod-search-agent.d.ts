import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { Agent } from '../types';
/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export declare abstract class HodSearchAgent extends LitElement {
    /** Public attributes */
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _searchedAgents: Array<Agent>;
    _lastSearchedPrefix: string | undefined;
    _comboBox: ComboBoxElement;
    static get styles(): import("lit-element").CSSResult[];
    searchAgents(usernamePrefix: string): Promise<Array<Agent>>;
    firstUpdated(): void;
    onUsernameSelected(e: CustomEvent): void;
    render(): import("lit-element").TemplateResult;
}
