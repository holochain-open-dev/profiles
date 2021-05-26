import { LitElement } from 'lit';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Button } from 'scoped-material-components/mwc-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { DnaBundle } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
declare const InstallDnaDialog_base: typeof LitElement;
export declare class InstallDnaDialog extends InstallDnaDialog_base {
    dnaBundle: DnaBundle;
    _compositoryService: CompositoryService;
    _dialog: Dialog;
    _dnaPath: string;
    open(opened?: boolean): void;
    installDna(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-dialog': typeof Dialog;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
    };
    static get styles(): import("lit").CSSResultGroup;
}
export {};
