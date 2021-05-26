import { serializeHash } from '@holochain-open-dev/core-types';
async function fetchZomeAndEntryIndexes(appWebsocket, cellId, entryHash) {
    const details = await appWebsocket.callZome({
        cap: null,
        cell_id: cellId,
        provenance: cellId[1],
        zome_name: 'common',
        fn_name: 'get_entry_details',
        payload: entryHash,
    });
    const header = details.headers[0].header;
    const create = header.content;
    const appEntryType = create.entry_type.App;
    return {
        cellId,
        zomeIndex: appEntryType.zome_id,
        entryDefIndex: appEntryType.id,
        entryHash,
    };
}
export async function discoverEntryDetails(compositoryService, entryUri) {
    // For now only <DNA_HASH>://<ENTRY_HASH>
    const [dnaHash, entryHash] = entryUri.split('://');
    // Find the cellId corresponding to the given dna
    const cellIds = await compositoryService.adminWebsocket.listCellIds();
    let cellId = cellIds.find(cellId => serializeHash(cellId[0]) === dnaHash);
    // If we don't have the dna installed, install it
    if (!cellId) {
        // TODO: Fix this
        // cellId = await installDna(adminWebsocket, compositoryService, dnaHash);
    }
    // Fetch information about the entry from its header
    return fetchZomeAndEntryIndexes(compositoryService.appWebsocket, cellId, entryHash);
}
//# sourceMappingURL=discover.js.map