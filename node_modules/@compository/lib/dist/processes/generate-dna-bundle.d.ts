import { CompositoryService } from '../services/compository-service';
import { DnaTemplate } from '../types/dnas';
import { DnaBundle } from '@holochain/conductor-api';
export declare function generateDnaBundle(compositoryService: CompositoryService, dnaTemplate: DnaTemplate, uuid: string, properties: any): Promise<DnaBundle>;
