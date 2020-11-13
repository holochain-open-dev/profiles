import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import '@spectrum-web-components/avatar/sp-avatar.js';
import { Agent } from '../types';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export declare abstract class HodSearchAgent extends LitElement {
    /** Public attributes */
    /**
     * Whether to clear the field when an agent is selected
     * @attr clear-on-select
     */
    clearOnSelect: boolean;
    /**
     * Label for the agent searching field
     * @attr field-label
     */
    fieldLabel: string;
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _searchedAgents: Array<Agent>;
    _lastSearchedPrefix: string | undefined;
    _comboBox: ComboBoxElement;
    _textField: TextFieldBase;
    static get styles(): import("lit-element").CSSResult[];
    searchAgents(usernamePrefix: string): Promise<Array<Agent>>;
    firstUpdated(): void;
    onUsernameSelected(e: CustomEvent): void;
    render(): import("lit-element").TemplateResult;
}
