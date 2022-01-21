# Profiles Module

Small zome to manage the profiles in your DNA, in RSM.

This module is designed to be included in other DNAs, assuming as little as possible from those. It is packaged as a holochain zome, and an npm package that offers native Web Components that can be used across browsers and frameworks.

> Notice that this zome still stores all profiles in the DNA in which the zome is included. Integration and bridging with personas & profiles will be done in the future, maintaining as much as possible the current API.

## Documentation

See our [`storybook`](https://holochain-open-dev.github.io/profiles).

## Assumptions

These are the things you need to know to decide if you can use this module in your happ:

- Profiles:
  - Your profile at least contains a `nickname` field.
  - You can search for all the users starting with the first 3 letters of their `nickname`.

## Installation and usage

### Including the zome in your DNA

1. Create a new `profiles` folder in the `zomes` of the consuming DNA.
2. Add a new `Cargo.toml` in that folder. In its content, paste the `Cargo.toml` content from any zome.
3. Change the `name` properties of the `Cargo.toml` file to `profiles`.
4. Add this zome as a dependency in the `Cargo.toml` file:

```toml
[dependencies]
hc_zome_profiles = {git = "https://github.com/holochain-open-dev/profiles", branch = "main" package = "hc_zome_profiles"}
```

5. Create a `src` folder besides the `Cargo.toml` with this content:

```rust
extern crate hc_zome_profiles;
```

6. Add the zome into your `dna.yaml` file.
7. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.

### Using the UI module

1. Install the module with:

```bash
npm install "https://github.com/holochain-open-dev/profiles#ui-build"
```

2. Import and create the mobx store for profiles and for this module, and define the custom elements you need in your app:

```js
import {
  ProfilePrompt,
  SearchAgent,
  ProfilesStore,
  profilesStoreContext,
  ListProfiles,
} from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/conductor-api";
import { HolochainClient } from "@holochain-open-dev/cell-client";
import { LitElement, html } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { ContextProvider } from "@holochain-open-dev/context";

class ProfilesTest extends ScopedElementsMixin(LitElement) {
  static get properties() {
    return {
      loaded: {
        type: Boolean,
      },
    };
  }

  async firstUpdated() {
    const appWebsocket = await AppWebsocket.connect("ws://localhost:8888");
    const appInfo = await appWebsocket.appInfo({
      installed_app_id: "test-app",
    });

    const cellData = appInfo.cell_data[0];
    const cellClient = new HolochainClient(appWebsocket, cellData);

    new ContextProvider(
      this,
      profilesStoreContext,
      new ProfilesStore(cellClient, {
        avatarMode: "avatar",
      })
    );

    this.loaded = true;
  }

  render() {
    if (!this.loaded) return html`<span>Loading...</span>`;
    return html`
      <profile-prompt>
        <list-profiles></list-profiles>
        <search-agent include-myself></search-agent>
      </profile-prompt>
    `;
  }

  static get scopedElements() {
    return {
      "profile-prompt": ProfilePrompt,
      "search-agent": SearchAgent,
      "list-profiles": ListProfiles,
    };
  }
}

customElements.define("profiles-test", ProfilesTest);
```

```html
...
<body>
  <profiles-test></profiles-test>
</body>
```

Take into account that at this point the elements already expect a holochain conductor running at `ws://localhost:8888`.

If you are using React, you can include custom elements with [this package](https://www.npmjs.com/package/@lit-labs/react).

You can see a full working example [here](/ui/demo/index.html).

## Developer setup

Visit the [developer setup](/dev-setup.md).
