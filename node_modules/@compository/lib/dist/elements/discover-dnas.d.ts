import { LitElement } from 'lit';
import { Card } from 'scoped-material-components/mwc-card';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Dictionary } from '@holochain-open-dev/core-types';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CompositoryService, GetTemplateForDnaOutput } from '../services/compository-service';
import { InstallDnaDialog } from './install-dna-dialog';
declare const DiscoverDnas_base: typeof LitElement;
export declare class DiscoverDnas extends DiscoverDnas_base {
    _compositoryService: CompositoryService;
    _loading: boolean;
    _allInstantiatedDnasHashes: Array<string> | undefined;
    _dnaTemplates: Dictionary<GetTemplateForDnaOutput>;
    firstUpdated(): Promise<void>;
    displayInstallDna(dnaHash: string, retriesLeft?: number): Promise<void>;
    renderContent(): import("lit-html").TemplateResult<1>;
    renderErrorSnackbar(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-card': typeof Card;
        'mwc-button': typeof Button;
        'mwc-snackbar': typeof Snackbar;
        'mwc-list': typeof List;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list-item': typeof ListItem;
        'install-dna-dialog': typeof InstallDnaDialog;
    };
}
export {};
