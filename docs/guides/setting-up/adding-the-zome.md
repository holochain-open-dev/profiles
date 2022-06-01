# Setting Up >> Adding the Zome ||10

1. In your `zomes` folder, run `cargo new profiles --lib`.
2. Add this to the `Cargo.toml` file of the new crate:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
name = "profiles"

[dependencies]
hc_zome_profiles = {git = "https://github.com/holochain-open-dev/profiles", rev = "for-hdk-v0.0.130", package = "hc_zome_profiles"}
```

Replace the `rev` field with the holochain version you are using. See [which tags are available](https://github.com/holochain-open-dev/profiles/tags).

3.  Replace the contents of the `lib.rs` with this content:

```rust
extern crate hc_zome_profiles;
```

4. In the `Cargo.toml` at the root of your project, add this new crate to the worskpace `members`.
5. In the `dna.yaml` file for the DNA in which you want to add the `profiles` zome, add this at the  end.

```yaml
  - name: profiles
    bundled: ../../target/wasm32-unknown-unknown/release/profiles.wasm
```

Be careful about the bundled path `../../` , change that to whatever path matches your target folder.

6. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.
