import { LitElement } from 'lit';
import { CellId } from '@holochain/conductor-api';
import { Dictionary } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CompositoryService } from '../services/compository-service';
declare const InstalledCells_base: typeof LitElement;
export declare class InstalledCells extends InstalledCells_base {
    _compositoryService: CompositoryService;
    _installedCellIds: Array<CellId>;
    _dnaTemplateNames: Dictionary<string>;
    firstUpdated(): void;
    get compositoryDnaHash(): string;
    loadCellsIds(): Promise<void>;
    fetchDnaTemplateNames(instantiatedDnaHashes: string[]): Promise<Dictionary<string>>;
    getNonCompositoryCellIds(): CellId[];
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup;
    static get scopedElements(): {
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-card': typeof Card;
        'mwc-circular-progress': typeof CircularProgress;
    };
}
export {};
