# Setting Up >> Adding the Zome ||10

1. In your `integrity_zomes` folder, run `cargo new profiles --lib`.
2. Add this to the `Cargo.toml` file of the new crate:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
name = "profiles_integrity"

[dependencies]
hc_zome_profiles_integrity = {git = "https://github.com/holochain-open-dev/profiles", tag = "for-hdk-v0.0.146", package = "hc_zome_profiles_integrity"}
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
hc_zome_profiles_coordinator = {git = "https://github.com/holochain-open-dev/profiles", tag = "for-hdk-v0.0.146", package = "hc_zome_profiles_coordinator"}
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
