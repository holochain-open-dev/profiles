import { serializeHash } from '@holochain-open-dev/core-types';
import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
import { Lenses, SetupLenses } from '../types/lenses';
import { importModuleFromFile } from './import-module-from-file';

export async function fetchLensesForZome(
  compositoryService: CompositoryService,
  cellId: CellId,
  zomeIndex: number
): Promise<[ZomeDef, File?]> {
  const dnaHash = serializeHash(cellId[0]);

  const template = await compositoryService.getTemplateForDna(dnaHash);

  const zomeDefHash = template.dnaTemplate.zome_defs[zomeIndex].zome_def_hash;
  return internalFetchLensesForZome(compositoryService, zomeDefHash);
}

export async function fetchLensesForAllZomes(
  compositoryService: CompositoryService,
  cellId: CellId
): Promise<Array<[ZomeDef, File?]>> {
  const dnaHash = serializeHash(cellId[0]);

  const template = await compositoryService.getTemplateForDna(dnaHash);

  const promises = template.dnaTemplate.zome_defs.map(zome_def =>
    internalFetchLensesForZome(
      compositoryService,
      zome_def.zome_def_hash
    )
  );
  return await Promise.all(promises);
}

async function internalFetchLensesForZome(
  compositoryService: CompositoryService,
  zomeDefHash: string
): Promise<[ZomeDef, File?]> {
  // Fetch the appropriate elements bundle for this zome
  const zomeDef = await compositoryService.getZomeDef(zomeDefHash);

  if (!zomeDef.components_bundle_file) {
    return [zomeDef, undefined];
  }

  const file = await compositoryService.downloadFile(
    zomeDef.components_bundle_file
  );

  return [zomeDef, file];
}
