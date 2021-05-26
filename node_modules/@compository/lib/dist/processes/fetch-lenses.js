import { serializeHash } from '@holochain-open-dev/core-types';
export async function fetchLensesForZome(compositoryService, cellId, zomeIndex) {
    const dnaHash = serializeHash(cellId[0]);
    const template = await compositoryService.getTemplateForDna(dnaHash);
    const zomeDefHash = template.dnaTemplate.zome_defs[zomeIndex].zome_def_hash;
    return internalFetchLensesForZome(compositoryService, zomeDefHash);
}
export async function fetchLensesForAllZomes(compositoryService, cellId) {
    const dnaHash = serializeHash(cellId[0]);
    const template = await compositoryService.getTemplateForDna(dnaHash);
    const promises = template.dnaTemplate.zome_defs.map(zome_def => internalFetchLensesForZome(compositoryService, zome_def.zome_def_hash));
    return await Promise.all(promises);
}
async function internalFetchLensesForZome(compositoryService, zomeDefHash) {
    // Fetch the appropriate elements bundle for this zome
    const zomeDef = await compositoryService.getZomeDef(zomeDefHash);
    if (!zomeDef.components_bundle_file) {
        return [zomeDef, undefined];
    }
    const file = await compositoryService.downloadFile(zomeDef.components_bundle_file);
    return [zomeDef, file];
}
//# sourceMappingURL=fetch-lenses.js.map