import { LitElement } from 'lit';
import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CheckListItem } from 'scoped-material-components/mwc-check-list-item';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { CellId } from '@holochain/conductor-api';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { HoloHashed } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { ZomeDef } from '../types/dnas';
import { InstallDnaDialog } from './install-dna-dialog';
import { CompositoryService } from '../services/compository-service';
declare const ComposeZomes_base: typeof LitElement;
export declare class ComposeZomes extends ComposeZomes_base {
    zomeDefs: Array<HoloHashed<ZomeDef>>;
    _installDnaDialog: InstallDnaDialog;
    /** Dependencies */
    _compositoryService: CompositoryService;
    _dnaTemplateToClone: string | undefined;
    _selectedIndexes: Set<number>;
    _templateName: string | undefined;
    _generatingBundle: boolean;
    firstUpdated(): void;
    loadZomes(): Promise<void>;
    createDnaTemplate(): Promise<void>;
    publishInstantiatedDna(cellId: CellId): Promise<void>;
    renderErrorSnackbar(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-list': typeof List;
        'mwc-check-list-item': typeof CheckListItem;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-linear-progress': typeof LinearProgress;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
        'install-dna-dialog': typeof InstallDnaDialog;
        'mwc-card': typeof Card;
        'mwc-snackbar': typeof Snackbar;
    };
    static get styles(): import("lit").CSSResultGroup[];
}
export {};
