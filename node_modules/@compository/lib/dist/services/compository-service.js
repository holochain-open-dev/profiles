import { FileStorageService } from '@holochain-open-dev/file-storage';
import * as msgpack from '@msgpack/msgpack';
export class CompositoryService extends FileStorageService {
    constructor(adminWebsocket, appWebsocket, cellId) {
        super(appWebsocket, cellId, 'file_storage');
        this.adminWebsocket = adminWebsocket;
        this.appWebsocket = appWebsocket;
        this.cellId = cellId;
    }
    /** Getters */
    async getTemplateForDna(dnaHash) {
        const result = await this.callZome('compository', 'get_template_for_dna', dnaHash);
        result.properties = msgpack.decode(result.properties);
        return result;
    }
    uploadFile(file, onProgress) {
        return super.uploadFile(file, onProgress, 10 * 1024 * 1024);
    }
    async getZomeDef(zomeDefHash) {
        return this.callZome('compository', 'get_zome_def', zomeDefHash);
    }
    async getDnaTemplate(dnaTemplateHash) {
        return this.callZome('compository', 'get_dna_template', dnaTemplateHash);
    }
    async getAllZomeDefs() {
        return this.callZome('compository', 'get_all_zome_defs', null);
    }
    async getAllInstantiatedDnas() {
        return this.callZome('compository', 'get_all_instantiated_dnas', null);
    }
    /** Creators */
    async publishZome(zomeDef) {
        return this.callZome('compository', 'publish_zome', zomeDef);
    }
    async publishDnaTemplate(dnaTemplate) {
        return this.callZome('compository', 'publish_dna_template', dnaTemplate);
    }
    async publishInstantiatedDna(input) {
        input.properties = msgpack.encode(input.properties);
        return this.callZome('compository', 'publish_instantiated_dna', input);
    }
    callZome(zome, fnName, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            fn_name: fnName,
            payload: payload,
            provenance: this.cellId[1],
            zome_name: zome,
        });
    }
}
//# sourceMappingURL=compository-service.js.map