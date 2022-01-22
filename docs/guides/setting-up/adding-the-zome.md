# Setting Up >> Adding the Zome ||10


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
