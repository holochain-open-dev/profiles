import { PropertyValues } from 'lit-element';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { AgentProfile } from '../types';
import { BaseElement } from './base-element';
import { HodCreateProfileForm } from './hod-create-profile-form';
/**
 * @element hod-profile-prompt
 */
export declare class HodProfilePrompt extends BaseElement {
    /** Public attributes */
    /** Private properties */
    _myProfile: AgentProfile | undefined;
    _loading: boolean;
    static get styles(): import("lit-element").CSSResult[];
    updated(changedValues: PropertyValues): void;
    loadMyProfile(): Promise<void>;
    onProfileCreated(e: CustomEvent): void;
    renderPrompt(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
        'hod-create-profile-form': typeof HodCreateProfileForm;
    };
}
