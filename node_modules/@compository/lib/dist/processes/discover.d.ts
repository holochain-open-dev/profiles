import { CompositoryService } from '../services/compository-service';
import { EntryDefLocator } from '../types/dnas';
export declare function discoverEntryDetails(compositoryService: CompositoryService, entryUri: string): Promise<EntryDefLocator>;
