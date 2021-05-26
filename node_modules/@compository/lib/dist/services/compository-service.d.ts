import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { FileStorageService } from '@holochain-open-dev/file-storage';
import { DnaTemplate, PublishInstantiatedDnaInput, ZomeDef } from '../types/dnas';
import { HoloHashed } from '@holochain-open-dev/core-types';
export interface GetTemplateForDnaOutput {
    dnaTemplate: DnaTemplate;
    properties: any;
    uuid: string;
}
export declare class CompositoryService extends FileStorageService {
    adminWebsocket: AdminWebsocket;
    appWebsocket: AppWebsocket;
    cellId: CellId;
    constructor(adminWebsocket: AdminWebsocket, appWebsocket: AppWebsocket, cellId: CellId);
    /** Getters */
    getTemplateForDna(dnaHash: string): Promise<GetTemplateForDnaOutput>;
    uploadFile(file: File, onProgress?: undefined | ((percentatgeProgress: number, bytesSent: number) => void)): Promise<string>;
    getZomeDef(zomeDefHash: string): Promise<ZomeDef>;
    getDnaTemplate(dnaTemplateHash: string): Promise<DnaTemplate>;
    getAllZomeDefs(): Promise<Array<HoloHashed<ZomeDef>>>;
    getAllInstantiatedDnas(): Promise<Array<string>>;
    /** Creators */
    publishZome(zomeDef: ZomeDef): Promise<string>;
    publishDnaTemplate(dnaTemplate: DnaTemplate): Promise<string>;
    publishInstantiatedDna(input: PublishInstantiatedDnaInput): Promise<string>;
    private callZome;
}
