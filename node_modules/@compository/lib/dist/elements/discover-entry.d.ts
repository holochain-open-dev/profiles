import { LitElement } from 'lit';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { CompositoryScope } from './compository-scope';
import { CompositoryService } from '../services/compository-service';
declare const DiscoverEntry_base: typeof LitElement;
export declare class DiscoverEntry extends DiscoverEntry_base {
    entryUri: string;
    _compositoryService: CompositoryService;
    _loading: boolean;
    _scope: CompositoryScope;
    loadRenderers(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
    };
}
export {};
