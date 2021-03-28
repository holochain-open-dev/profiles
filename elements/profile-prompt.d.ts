import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { BaseElement, DepsElement } from '@holochain-open-dev/common';
import { ProfilesStore } from '../profiles.store';
declare const ProfilePrompt_base: typeof BaseElement;
/**
 * @element profile-prompt
 */
export declare abstract class ProfilePrompt extends ProfilePrompt_base implements DepsElement<ProfilesStore> {
    /** Public attributes */
    /** Private properties */
    _loading: boolean;
    static get styles(): import("lit-element").CSSResult[];
    abstract get _deps(): ProfilesStore;
    firstUpdated(): Promise<void>;
    renderPrompt(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
        'create-profile-form': import("lit-element").Constructor<HTMLElement>;
    };
}
export {};
