import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
export declare function fetchLensesForZome(compositoryService: CompositoryService, cellId: CellId, zomeIndex: number): Promise<[ZomeDef, File?]>;
export declare function fetchLensesForAllZomes(compositoryService: CompositoryService, cellId: CellId): Promise<Array<[ZomeDef, File?]>>;
