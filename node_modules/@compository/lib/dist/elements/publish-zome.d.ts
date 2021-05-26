import { LitElement } from 'lit';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { UploadFiles } from '@holochain-open-dev/file-storage';
import { Card } from 'scoped-material-components/mwc-card';
import { Button } from 'scoped-material-components/mwc-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CompositoryService } from '../services/compository-service';
declare const PublishZome_base: typeof LitElement;
export declare class PublishZome extends PublishZome_base {
    _compositoryService: CompositoryService;
    _nameField: TextField;
    _zomeWasmHash: string | undefined;
    _uiBundleHash: string | undefined;
    _invalidUiBundle: boolean;
    get publishDisabled(): boolean;
    publishZome(): Promise<void>;
    setUIBundleHash(file: File, hash: string): Promise<void>;
    renderErrorSnackbar(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-card': typeof Card;
        'mwc-snackbar': typeof Snackbar;
        'upload-files': typeof UploadFiles;
    };
    static get styles(): import("lit").CSSResultGroup;
}
export {};
