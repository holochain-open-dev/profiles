import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';

import { CellId, AdminWebsocket, AppWebsocket } from '@holochain/conductor-api';
import { Dictionary, serializeHash } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import {
  CompositoryService,
  GetTemplateForDnaOutput,
} from '../services/compository-service';

import { sharedStyles } from './sharedStyles';
import { COMPOSITORY_SERVICE_CONTEXT } from '../types/context';

export class InstalledCells extends ScopedRegistryHost(LitElement) {

  @requestContext(COMPOSITORY_SERVICE_CONTEXT)
  _compositoryService!: CompositoryService;

  @state()
  _installedCellIds!: Array<CellId>;

  _dnaTemplateNames: Dictionary<string> = {};

  firstUpdated() {
    this.loadCellsIds();
  }

  get compositoryDnaHash(): string {
    return serializeHash(this._compositoryService.cellId[0]);
  }

  async loadCellsIds() {
    const cellIds = await this._compositoryService.adminWebsocket.listCellIds();

    const instantiatedDnaHashes = cellIds
      .map(cellId => serializeHash(cellId[0]))
      .filter(hash => hash !== this.compositoryDnaHash);

    this._dnaTemplateNames = await this.fetchDnaTemplateNames(
      instantiatedDnaHashes
    );

    this._installedCellIds = cellIds;
  }

  async fetchDnaTemplateNames(
    instantiatedDnaHashes: string[]
  ): Promise<Dictionary<string>> {
    const templates: Array<GetTemplateForDnaOutput> = [];
    const promises = instantiatedDnaHashes.map(async hash => {
      try {
        const template = await this._compositoryService.getTemplateForDna(hash);
        templates.push(template);
      } catch (e) {
        // Do nothing
      }
    });

    await Promise.all(promises);
    const names: Dictionary<string> = {};
    for (let i = 0; i < templates.length; i++) {
      names[instantiatedDnaHashes[i]] = templates[i].dnaTemplate.name;
    }
    return names;
  }

  getNonCompositoryCellIds() {
    return this._installedCellIds.filter(
      cellId => serializeHash(cellId[0]) !== this.compositoryDnaHash
    );
  }

  render() {
    if (!this._installedCellIds)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;

    return html` <mwc-card class="fill">
      <div class="column fill">
        <span style="margin: 16px; margin-bottom: 0;" class="title"
          >Installed DNAs</span
        >
        ${this.getNonCompositoryCellIds().length === 0
          ? html`
              <div class="fill center-content">
                <div style="margin: 32px; text-align: center;" class="column">
                  <span style="margin-bottom: 16px;" class="placeholder"
                    >You don't have any generated DNAs installed yet.</span
                  >
                  <span class="placeholder"
                    >Discover one of the DNAs available below, or compose some
                    zomes to generate one yourself!</span
                  >
                </div>
              </div>
            `
          : html`
              <div class="flex-scrollable-parent">
                <div class="flex-scrollable-container">
                  <div class="flex-scrollable-y">
                    <mwc-list>
                      ${this.getNonCompositoryCellIds().map(
                        cellId =>
                          html`<mwc-list-item
                            @click=${() =>
                              this.dispatchEvent(
                                new CustomEvent('cell-selected', {
                                  detail: { cellId },
                                })
                              )}
                            twoline
                          >
                            <span
                              >${this._dnaTemplateNames[
                                serializeHash(cellId[0])
                              ]}</span
                            >
                            <span slot="secondary"
                              >${serializeHash(cellId[0])}</span
                            >
                          </mwc-list-item>`
                      )}
                    </mwc-list>
                  </div>
                </div>
              </div>
            `}
      </div>
    </mwc-card>`;
  }

  static get styles() {
    return sharedStyles;
  }

  static get scopedElements() {
    return {
      'mwc-list': List,
      'mwc-list-item': ListItem,
      'mwc-card': Card,
      'mwc-circular-progress': CircularProgress,
    };
  }
}
