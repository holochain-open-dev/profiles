import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { query, state } from 'lit/decorators.js';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { requestContext } from '@holochain-open-dev/context';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { UploadFiles } from '@holochain-open-dev/file-storage';
import { Card } from 'scoped-material-components/mwc-card';
import { Button } from 'scoped-material-components/mwc-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { importModuleFromFile } from '../processes/import-module-from-file';
import { sharedStyles } from './sharedStyles';
import { COMPOSITORY_SERVICE_CONTEXT } from '../types/context';
export class PublishZome extends ScopedRegistryHost(LitElement) {
    constructor() {
        super(...arguments);
        this._zomeWasmHash = undefined;
        this._uiBundleHash = undefined;
        this._invalidUiBundle = false;
    }
    get publishDisabled() {
        return (!this._zomeWasmHash ||
            !this._nameField ||
            !this._nameField.value ||
            this._invalidUiBundle);
    }
    async publishZome() {
        if (this._zomeWasmHash) {
            const result = await this._compositoryService.publishZome({
                name: this._nameField.value,
                components_bundle_file: this._uiBundleHash,
                entry_defs: [],
                wasm_file: this._zomeWasmHash,
                wasm_hash: undefined,
                required_membrane_proof: false,
                required_properties: [],
            });
            this.dispatchEvent(new CustomEvent('zome-published', {
                detail: {
                    zomeDefHash: result,
                },
            }));
        }
    }
    async setUIBundleHash(file, hash) {
        var _a;
        try {
            const mod = await importModuleFromFile(file);
            const setupLenses = mod.default;
            const lenses = setupLenses(this._compositoryService.appWebsocket, this._compositoryService.cellId);
            if (!lenses.standalone ||
                !lenses.entryLenses ||
                !lenses.attachmentsLenses) {
                throw new Error('Malformed lenses');
            }
            this._uiBundleHash = hash;
            this._invalidUiBundle = false;
        }
        catch (e) {
            ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('error-snackbar')).show();
            this._invalidUiBundle = true;
        }
    }
    renderErrorSnackbar() {
        return html `
      <mwc-snackbar id="error-snackbar" labelText="Invalid UI bundle">
        <mwc-button
          slot="action"
          label="See Documentation"
          @click=${() => window.open('https://github.com/compository/lib')}
        ></mwc-button>
      </mwc-snackbar>
    `;
    }
    render() {
        return html `
      ${this.renderErrorSnackbar()}
      <mwc-card style="width: auto; flex: 1;">
        <div class="column" style="padding: 16px;">
          <span class="title" style="margin-bottom: 16px;">Publish Zome</span>
          <mwc-textfield
            id="zome-name"
            label="Zome Name"
            required
            @input=${() => this.requestUpdate()}
            style="margin-bottom: 24px;"
          ></mwc-textfield>

          <span style="margin-bottom: 8px;">Zome Wasm File (required)</span>
          <upload-files
            one-file
            accepted-files=".wasm"
            @file-uploaded=${(e) => (this._zomeWasmHash = e.detail.hash)}
          ></upload-files>
          <span style="margin-bottom: 8px; margin-top: 24px;"
            >UI Bundle File (optional)</span
          >
          <upload-files
            one-file
            accepted-files=".js"
            @file-uploaded=${(e) => this.setUIBundleHash(e.detail.file, e.detail.hash)}
          ></upload-files>

          <mwc-button
            style="margin-top: 24px;"
            label="PUBLISH"
            raised
            @click=${() => this.publishZome()}
            .disabled=${this.publishDisabled}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
    }
    static get styles() {
        return sharedStyles;
    }
}
PublishZome.elementDefinitions = {
    'mwc-textfield': TextField,
    'mwc-button': Button,
    'mwc-card': Card,
    'mwc-snackbar': Snackbar,
    'upload-files': UploadFiles,
};
__decorate([
    requestContext(COMPOSITORY_SERVICE_CONTEXT)
], PublishZome.prototype, "_compositoryService", void 0);
__decorate([
    query('#zome-name')
], PublishZome.prototype, "_nameField", void 0);
__decorate([
    state()
], PublishZome.prototype, "_zomeWasmHash", void 0);
__decorate([
    state()
], PublishZome.prototype, "_invalidUiBundle", void 0);
//# sourceMappingURL=publish-zome.js.map