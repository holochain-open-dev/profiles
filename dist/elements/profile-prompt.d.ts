import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { MobxLitElement } from '@adobe/lit-mobx';
import { CreateProfileForm } from './create-profile-form';
import { ProfilesStore } from '../profiles.store';
declare const ProfilePrompt_base: typeof MobxLitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element profile-prompt
 */
export declare class ProfilePrompt extends ProfilePrompt_base {
    /** Public attributes */
    /** Private properties */
    _loading: boolean;
    _store: ProfilesStore;
    firstUpdated(): Promise<void>;
    renderPrompt(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
        'create-profile-form': typeof CreateProfileForm;
    };
    static get styles(): import("lit").CSSResultGroup[];
}
export {};
