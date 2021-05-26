import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { FileStorageService } from '@holochain-open-dev/file-storage';
import {
  DnaTemplate,
  PublishInstantiatedDnaInput,
  ZomeDef,
} from '../types/dnas';
import { HoloHashed } from '@holochain-open-dev/core-types';
import * as msgpack from '@msgpack/msgpack';

export interface GetTemplateForDnaOutput {
  dnaTemplate: DnaTemplate;
  properties: any;
  uuid: string;
}

export class CompositoryService extends FileStorageService {
  constructor(
    public adminWebsocket: AdminWebsocket,
    public appWebsocket: AppWebsocket,
    public cellId: CellId
  ) {
    super(appWebsocket, cellId, 'file_storage');
  }

  /** Getters */

  async getTemplateForDna(dnaHash: string): Promise<GetTemplateForDnaOutput> {
    const result = await this.callZome(
      'compository',
      'get_template_for_dna',
      dnaHash
    );
    result.properties = msgpack.decode(result.properties);
    return result;
  }
  
  uploadFile(
    file: File,
    onProgress?:
      | undefined
      | ((percentatgeProgress: number, bytesSent: number) => void)
  ): Promise<string> {
    return super.uploadFile(file, onProgress, 10 * 1024 * 1024);
  }

  async getZomeDef(zomeDefHash: string): Promise<ZomeDef> {
    return this.callZome('compository', 'get_zome_def', zomeDefHash);
  }
  async getDnaTemplate(dnaTemplateHash: string): Promise<DnaTemplate> {
    return this.callZome('compository', 'get_dna_template', dnaTemplateHash);
  }

  async getAllZomeDefs(): Promise<Array<HoloHashed<ZomeDef>>> {
    return this.callZome('compository', 'get_all_zome_defs', null);
  }

  async getAllInstantiatedDnas(): Promise<Array<string>> {
    return this.callZome('compository', 'get_all_instantiated_dnas', null);
  }

  /** Creators */

  async publishZome(zomeDef: ZomeDef): Promise<string> {
    return this.callZome('compository', 'publish_zome', zomeDef);
  }
  async publishDnaTemplate(dnaTemplate: DnaTemplate): Promise<string> {
    return this.callZome('compository', 'publish_dna_template', dnaTemplate);
  }
  async publishInstantiatedDna(
    input: PublishInstantiatedDnaInput
  ): Promise<string> {
    input.properties = msgpack.encode(input.properties);
    return this.callZome('compository', 'publish_instantiated_dna', input);
  }

  private callZome(zome: string, fnName: string, payload: any) {
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
