# lit-svelte-stores

Lit controller to use svelte stores as state management.

## Usage

### StoreController

If your store doesn't change during the element lifecycle, use `StoreController`:

```js
import { LitElement, html } from "lit";
import { writable } from "svelte/store";
import { StoreController } from "lit-svelte-stores";

const store = writable(0);

setInterval(() => {
  store.update((count) => count + 1);
}, 1000);

class SampleElement extends LitElement {
  constructor() {
    super();
    this.store = new StoreController(this, store);
  }

  render() {
    return html`Count: ${this.store.value}`;
  }
}
```

### DynamicStore

If your store changes during the element lifecycle, use the `DynamicStore`

```js
import { LitElement, html } from "lit";
import { get, readable, writable } from "svelte/store";
import { DynamicStore } from "../dist";

let store = writable(0);

let store2 = readable(5000);

class SampleElement extends LitElement {
  static get properties() {
    return {
      loaded: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.store = new DynamicStore(this, () => (!this.loaded ? store : store2));

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  render() {
    return html`Count: ${this.store.value}`;
  }
}
```

## Demo

See a full working example in `demo/index.html`.
