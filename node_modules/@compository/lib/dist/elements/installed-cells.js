import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';
import { serializeHash } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { sharedStyles } from './sharedStyles';
import { COMPOSITORY_SERVICE_CONTEXT } from '../types/context';
export class InstalledCells extends ScopedRegistryHost(LitElement) {
    constructor() {
        super(...arguments);
        this._dnaTemplateNames = {};
    }
    firstUpdated() {
        this.loadCellsIds();
    }
    get compositoryDnaHash() {
        return serializeHash(this._compositoryService.cellId[0]);
    }
    async loadCellsIds() {
        const cellIds = await this._compositoryService.adminWebsocket.listCellIds();
        const instantiatedDnaHashes = cellIds
            .map(cellId => serializeHash(cellId[0]))
            .filter(hash => hash !== this.compositoryDnaHash);
        this._dnaTemplateNames = await this.fetchDnaTemplateNames(instantiatedDnaHashes);
        this._installedCellIds = cellIds;
    }
    async fetchDnaTemplateNames(instantiatedDnaHashes) {
        const templates = [];
        const promises = instantiatedDnaHashes.map(async (hash) => {
            try {
                const template = await this._compositoryService.getTemplateForDna(hash);
                templates.push(template);
            }
            catch (e) {
                // Do nothing
            }
        });
        await Promise.all(promises);
        const names = {};
        for (let i = 0; i < templates.length; i++) {
            names[instantiatedDnaHashes[i]] = templates[i].dnaTemplate.name;
        }
        return names;
    }
    getNonCompositoryCellIds() {
        return this._installedCellIds.filter(cellId => serializeHash(cellId[0]) !== this.compositoryDnaHash);
    }
    render() {
        if (!this._installedCellIds)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        return html ` <mwc-card class="fill">
      <div class="column fill">
        <span style="margin: 16px; margin-bottom: 0;" class="title"
          >Installed DNAs</span
        >
        ${this.getNonCompositoryCellIds().length === 0
            ? html `
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
            : html `
              <div class="flex-scrollable-parent">
                <div class="flex-scrollable-container">
                  <div class="flex-scrollable-y">
                    <mwc-list>
                      ${this.getNonCompositoryCellIds().map(cellId => html `<mwc-list-item
                            @click=${() => this.dispatchEvent(new CustomEvent('cell-selected', {
                detail: { cellId },
            }))}
                            twoline
                          >
                            <span
                              >${this._dnaTemplateNames[serializeHash(cellId[0])]}</span
                            >
                            <span slot="secondary"
                              >${serializeHash(cellId[0])}</span
                            >
                          </mwc-list-item>`)}
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
__decorate([
    requestContext(COMPOSITORY_SERVICE_CONTEXT)
], InstalledCells.prototype, "_compositoryService", void 0);
__decorate([
    state()
], InstalledCells.prototype, "_installedCellIds", void 0);
//# sourceMappingURL=installed-cells.js.map