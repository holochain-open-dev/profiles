import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CheckListItem } from 'scoped-material-components/mwc-check-list-item';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { sharedStyles } from './sharedStyles';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { serializeHash, } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { InstallDnaDialog } from './install-dna-dialog';
import { generateDnaBundle } from '../processes/generate-dna-bundle';
import { requestContext } from '@holochain-open-dev/context';
import { COMPOSITORY_SERVICE_CONTEXT } from '../types/context';
export class ComposeZomes extends ScopedRegistryHost(LitElement) {
    constructor() {
        super(...arguments);
        this._dnaTemplateToClone = undefined;
        this._selectedIndexes = new Set();
        this._templateName = undefined;
        this._generatingBundle = false;
    }
    firstUpdated() {
        this.loadZomes();
    }
    async loadZomes() {
        // TODO: fix this
        const allZomeDefs = await this._compositoryService.getAllZomeDefs();
        const zomeDefsByName = {};
        for (const zomeDef of allZomeDefs) {
            zomeDefsByName[zomeDef.content.name] = zomeDef;
        }
        this.zomeDefs = Object.values(zomeDefsByName);
    }
    async createDnaTemplate() {
        var _a;
        const zomeDefs = Array.from(this._selectedIndexes).map(i => this.zomeDefs[i]);
        const zomeDefReferences = zomeDefs.map(def => ({
            name: def.content.name,
            zome_def_hash: def.hash,
        }));
        const dnaTemplate = {
            name: this._templateName,
            zome_defs: zomeDefReferences,
        };
        try {
            this._generatingBundle = true;
            this._dnaTemplateToClone = await this._compositoryService.publishDnaTemplate(dnaTemplate);
            const uuid = '';
            const properties = [];
            const dnaBundle = await generateDnaBundle(this._compositoryService, dnaTemplate, uuid, properties);
            this._generatingBundle = false;
            this._installDnaDialog.dnaBundle = dnaBundle;
            this._installDnaDialog.open();
        }
        catch (e) {
            ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('error-snackbar')).show();
        }
    }
    async publishInstantiatedDna(cellId) {
        if (this._dnaTemplateToClone) {
            await this._compositoryService.publishInstantiatedDna({
                dna_template_hash: this._dnaTemplateToClone,
                instantiated_dna_hash: serializeHash(cellId[0]),
                properties: [],
                uuid: '',
            });
        }
    }
    renderErrorSnackbar() {
        return html `
      <mwc-snackbar
        id="error-snackbar"
        labelText="Couldn't generate the DNA due to gossip inconsistencies. Please try again in a few minutes."
      ></mwc-snackbar>
    `;
    }
    render() {
        if (!this.zomeDefs)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        return html ` ${this.renderErrorSnackbar()}
      <install-dna-dialog
        id="install-dna-dialog"
        @dna-installed=${(e) => this.publishInstantiatedDna(e.detail.cellId)}
      ></install-dna-dialog>
      <mwc-card class="fill">
        <div class="column fill" style="margin: 16px; min-height: 0px;">
          <span class="title">Compose zomes</span>
          <mwc-list
            style="overflow-y: auto; flex: 1;"
            multi
            @selected=${(e) => (this._selectedIndexes = e.detail.index)}
          >
            ${this.zomeDefs.map(zomeDef => html `
                <mwc-check-list-item
                  .selected=${zomeDef.content.name === 'grapes' ||
            zomeDef.content.name === 'profiles'}
                  .disabled=${zomeDef.content.name === 'grapes' ||
            zomeDef.content.name === 'profiles'}
                >
                  ${zomeDef.content.name}
                </mwc-check-list-item>
              `)}
          </mwc-list>

          <div class="column">
            <mwc-textfield
              @input=${(e) => (this._templateName = e.target.value)}
              label="Dna Template Name"
              style="margin-bottom: 16px;"
              required
            ></mwc-textfield>

            <mwc-button
              .disabled=${!this._templateName}
              raised
              label="GENERATE DNA"
              @click=${() => this.createDnaTemplate()}
            ></mwc-button>
          </div>
        </div>
        ${this._generatingBundle
            ? html ` <mwc-linear-progress indeterminate></mwc-linear-progress> `
            : html ``}
      </mwc-card>`;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
      `,
        ];
    }
}
ComposeZomes.elementDefinitions = {
    'mwc-list': List,
    'mwc-check-list-item': CheckListItem,
    'mwc-circular-progress': CircularProgress,
    'mwc-linear-progress': LinearProgress,
    'mwc-button': Button,
    'mwc-textfield': TextField,
    'install-dna-dialog': InstallDnaDialog,
    'mwc-card': Card,
    'mwc-snackbar': Snackbar,
};
__decorate([
    property()
], ComposeZomes.prototype, "zomeDefs", void 0);
__decorate([
    query('#install-dna-dialog')
], ComposeZomes.prototype, "_installDnaDialog", void 0);
__decorate([
    requestContext(COMPOSITORY_SERVICE_CONTEXT)
], ComposeZomes.prototype, "_compositoryService", void 0);
__decorate([
    state()
], ComposeZomes.prototype, "_templateName", void 0);
__decorate([
    state()
], ComposeZomes.prototype, "_generatingBundle", void 0);
//# sourceMappingURL=compose-zomes.js.map