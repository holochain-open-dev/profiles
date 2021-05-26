import { CellId } from '@holochain/conductor-api';
export interface DnaTemplate {
    name: string;
    zome_defs: Array<ZomeDefReference>;
}
export interface ZomeDefReference {
    name: string;
    zome_def_hash: string;
}
export interface ZomeDef {
    name: string;
    wasm_file: string;
    components_bundle_file: string | undefined;
    wasm_hash: string | undefined;
    entry_defs: Array<string>;
    required_properties: Array<string>;
    required_membrane_proof: boolean;
}
export interface EntryDefLocator {
    cellId: CellId;
    zomeIndex: number;
    entryDefIndex: number;
    entryHash: string;
}
export interface PublishInstantiatedDnaInput {
    dna_template_hash: string;
    instantiated_dna_hash: string;
    uuid: string;
    properties: any;
}
