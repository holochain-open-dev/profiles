import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { discoverEntryDetails } from '../processes/discover';
import { fetchLensesForZome } from '../processes/fetch-lenses';
import { importModuleFromFile } from '../processes/import-module-from-file';
import { COMPOSITORY_SERVICE_CONTEXT } from '../types/context';
export class DiscoverEntry extends ScopedRegistryHost(LitElement) {
    constructor() {
        super(...arguments);
        this._loading = true;
    }
    async loadRenderers() {
        const { cellId, zomeIndex, entryDefIndex, entryHash, } = await discoverEntryDetails(this._compositoryService, this.entryUri);
        const [def, renderersFile] = await fetchLensesForZome(this._compositoryService, cellId, zomeIndex);
        if (renderersFile) {
            const renderers = await importModuleFromFile(renderersFile);
            const entryIdStr = def.entry_defs[entryDefIndex];
            renderers
                .default(this._compositoryService.appWebsocket, cellId)
                .entryLenses[entryIdStr].render(this._scope.shadowRoot, entryHash);
        }
        this._loading = false;
    }
    render() {
        return html `${this._loading
            ? html `<mwc-circular-progress></mwc-circular-progress>`
            : html ``}
      <compository-scope id="scope"> </compository-scope> `;
    }
    static get scopedElements() {
        return {
            'mwc-circular-progress': CircularProgress,
        };
    }
}
__decorate([
    property({ type: String })
], DiscoverEntry.prototype, "entryUri", void 0);
__decorate([
    requestContext(COMPOSITORY_SERVICE_CONTEXT)
], DiscoverEntry.prototype, "_compositoryService", void 0);
__decorate([
    state()
], DiscoverEntry.prototype, "_loading", void 0);
__decorate([
    query('#scope')
], DiscoverEntry.prototype, "_scope", void 0);
//# sourceMappingURL=discover-entry.js.map