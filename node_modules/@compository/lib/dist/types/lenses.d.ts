import { AppWebsocket, CellId } from '@holochain/conductor-api';
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface Lenses {
    standalone: Array<StandaloneLens>;
    entryLenses: Dictionary<EntryLens>;
    attachmentsLenses: Array<AttachmentLens>;
}
export interface Lens {
    name: string;
}
export interface StandaloneLens extends Lens {
    render: (root: ShadowRoot) => void;
}
export interface EntryLens extends Lens {
    render: (root: ShadowRoot, entryHash: string) => void;
}
export interface AttachmentLens extends Lens {
    render: (root: ShadowRoot, entryHash: string) => void;
}
export declare type SetupLenses = (appWebsocket: AppWebsocket, cellId: CellId) => Lenses;
