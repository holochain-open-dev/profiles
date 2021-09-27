import { deserializeHash, HoloHashB64 } from '@holochain-open-dev/core-types';
import { css, html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import renderIcon from '@holo-host/identicon';
import { classMap } from 'lit/directives/class-map.js';

export class HoloIdenticon extends LitElement {
  @property()
  hash!: HoloHashB64;

  @property()
  size: number | undefined = undefined;

  @property()
  shape: 'square' | 'circle' = 'circle';

  @query('#canvas')
  _canvas!: HTMLCanvasElement;

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (changedValues.has('hash') || changedValues.has('size')) {
      console.log(this.hash, this.size)
      renderIcon(
        {
          hash: deserializeHash(this.hash),
          size: this.size,
        },
        this._canvas
      );
    }
  }

  render() {
    return html`
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
    return css`
      .square {
        border-radius: 0%;
      }

      .circle {
        border-radius: 50%;
      }
    `;
  }
}
