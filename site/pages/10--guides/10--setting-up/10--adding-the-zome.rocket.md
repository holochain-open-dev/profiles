```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = '10--guides/10--setting-up/10--adding-the-zome.rocket.md';
import { html, layout, setupUnifiedPlugins, components, openGraphLayout } from '../../recursive.data.js';
export { html, layout, setupUnifiedPlugins, components, openGraphLayout };
export async function registerCustomElements() {
  // server-only components
  customElements.define('rocket-social-link', await import('@rocket/components/social-link.js').then(m => m.RocketSocialLink));
  customElements.define('rocket-header', await import('@rocket/components/header.js').then(m => m.RocketHeader));
  customElements.define('rocket-main-docs', await import('@rocket/components/main-docs.js').then(m => m.RocketMainDocs));
  customElements.define('rocket-content-area', await import('@rocket/components/content-area.js').then(m => m.RocketContentArea));
  // hydrate-able components
  customElements.define('rocket-search', await import('@rocket/search/search.js').then(m => m.RocketSearch));
  customElements.define('rocket-drawer', await import('@rocket/components/drawer.js').then(m => m.RocketDrawer));
}
export const needsLoader = true;
/* END - Rocket auto generated - do not touch */
```

# Adding the Zome 

1. In your `integrity_zomes` folder, run `cargo new profiles --lib`.
2. Add this to the `Cargo.toml` file of the new crate:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
name = "profiles_integrity"

[dependencies]
hc_zome_profiles_integrity = {git = "https://github.com/holochain-open-dev/profiles", tag = "for-hdk-v0.0.152", package = "hc_zome_profiles_integrity"}
```

Replace the `rev` field with the holochain version you are using. See [which tags are available](https://github.com/holochain-open-dev/profiles/tags).

3.  Replace the contents of the `lib.rs` with this content:

```rust
extern crate hc_zome_profiles_integrity;
```

4. In your `coordinator_zomes` folder, run `cargo new profiles --lib`.
5. Add this to the `Cargo.toml` file of the new crate:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
name = "profiles"

[dependencies]
hc_zome_profiles_coordinator = {git = "https://github.com/holochain-open-dev/profiles", tag = "for-hdk-v0.0.152", package = "hc_zome_profiles_coordinator"}
```

6.  Replace the contents of the `lib.rs` with this content:

```rust
extern crate hc_zome_profiles_coordinator;
```

7. In the `Cargo.toml` at the root of your project, add these 2 new crates to the worskpace `members`.
8. In the `dna.yaml` file for the DNA in which you want to add the `profiles` zome, add the 2 new zomes.

```yaml
integrity:
  zomes:
    - name: profiles_integrity
      bundled: ../../target/wasm32-unknown-unknown/release/profiles_integrity.wasm

...

coordinator:
  zomes:
    - name: profiles
      bundled: ../../target/wasm32-unknown-unknown/release/profiles.wasm
      dependencies:
        - name: profiles_integrity
```

Be careful about the bundled path `../../` , change that to whatever path matches your target folder.

9. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.
