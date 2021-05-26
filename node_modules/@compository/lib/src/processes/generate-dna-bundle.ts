import { CompositoryService } from '../services/compository-service';
import { DnaTemplate, ZomeDef } from '../types/dnas';
import { DnaBundle } from '@holochain/conductor-api';

export async function generateDnaBundle(
  compositoryService: CompositoryService,
  dnaTemplate: DnaTemplate,
  uuid: string,
  properties: any
): Promise<DnaBundle> {
  // Fetch all zomes for that template
  const promises = dnaTemplate.zome_defs.map(async zome_def =>
    fetchZome(compositoryService, zome_def.zome_def_hash)
  );
  const zomes = await Promise.all(promises);

  // Prepare the arguments
  const codesPromises = zomes.map(zome => zome.file.arrayBuffer());
  const codes = await Promise.all(codesPromises);

  const resources = codes.reduce(
    (acc, next, i) => ({
      ...acc,
      [zomes[i].zomeDef.name]: Array.from(new Uint8Array(next)),
    }),
    {}
  );

  // Create bundle
  const dnaBundle: DnaBundle = {
    manifest: {
      manifest_version: '1',
      name: dnaTemplate.name,
      uuid,
      properties,
      zomes: zomes.map(zome => ({
        name: zome.zomeDef.name,
        hash: zome.zomeDef.wasm_hash,
        bundled: zome.zomeDef.name,
      })) as any,
    } as any,
    resources,
  };

  return dnaBundle;
}

async function fetchZome(
  compositoryService: CompositoryService,
  zomeDefHash: string
): Promise<{ zomeDef: ZomeDef; file: File }> {
  const zomeDef = await compositoryService.getZomeDef(zomeDefHash);

  const file = await compositoryService.downloadFile(zomeDef.wasm_file);
  return { zomeDef, file };
}
