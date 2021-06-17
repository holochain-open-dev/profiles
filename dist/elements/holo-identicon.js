import { __decorate } from "tslib";
import { deserializeHash } from '@holochain-open-dev/core-types';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import renderIcon from '@holo-host/identicon';
import { classMap } from 'lit/directives/class-map.js';
export class HoloIdenticon extends LitElement {
    constructor() {
        super(...arguments);
        this.size = undefined;
        this.shape = 'circle';
    }
    updated(changedValues) {
        super.updated(changedValues);
        if (changedValues.has('hash') || changedValues.has('size')) {
            renderIcon({
                hash: deserializeHash(this.hash),
                size: this.size,
            }, this._canvas);
        }
    }
    render() {
        return html `
      <canvas
        id="canvas"
        width="1"
        height="1"
        class=${classMap({
            square: this.shape === 'square',
            circle: this.shape === 'circle',
        })}
      ></canvas>
    `;
    }
    static get styles() {
        return css `
      .square {
        border-radius: 0%;
      }

      .circle {
        border-radius: 50%;
      }
    `;
    }
}
__decorate([
    property()
], HoloIdenticon.prototype, "hash", void 0);
__decorate([
    property()
], HoloIdenticon.prototype, "size", void 0);
__decorate([
    property()
], HoloIdenticon.prototype, "shape", void 0);
__decorate([
    query('#canvas')
], HoloIdenticon.prototype, "_canvas", void 0);
//# sourceMappingURL=holo-identicon.js.map