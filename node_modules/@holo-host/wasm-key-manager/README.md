
# Wasm Key Manager

Rust/Wasm key management implementation that uses Ed25519 signing algorithm and Argon2 key
derivation.  The private key remains in Wasm memory with no direct access for Javascript.

![](https://img.shields.io/maintenance/last%20update%202019-12/2019?style=flat-square)
![](https://img.shields.io/badge/dev@latest-1.0.0-orange?style=flat-square)

## Release ![](https://img.shields.io/npm/v/@holo-host/wasm-key-manager/latest?style=flat-square)
Release source - https://github.com/Holo-Host/chaperone-key-manager/


## API Reference

[API Reference](https://holo-host.github.io/chaperone/key-manager/docs/KeyManager.html)


## Usage

```js
const { KeyManager, deriveSeedFrom } = require('@holo-host/wasm-key-manager');
const crypto = require('crypto');

const seed = crypto.randomBytes( 32 );
const hha_id = new Uint8Array([
    66, 123, 133, 136, 133,   6, 247, 116,
     4,  59,  43, 206, 131, 168, 123,  44,
    54,  52,   3,  53, 134,  75, 137,  43,
    63,  26, 216, 191,  67, 117,  38, 142
]);

// or derive seed
const seed = deriveSeedFrom( hha_id, "someone@example.com", "Passw0rd!");

const message = "Hello World";
const keys = new KeyManager( seed );

const signature = keys.sign( message );
const verified = keys.verify( message, signature );

const public_key = keys.publicKey();
const verified = keys.verifyWithPublicKey( message, signature, public_key );
```

## Bundle for web

### `bootstrap.js`
```js
import("./index.js")
    .then(m => Object.assign(window, m))
    .catch(e => console.error("Error importing `index.js`:", e));
```

### `index.js`
```js
const { KeyManager, deriveSeedFrom } = require("@holo-host/wasm-key-manager");

module.exports = {
    KeyManager,
    deriveSeedFrom,
};
```

### `webpack.config.js`
```js
module.exports = {
    target: "web",

    entry: "./bootstrap.js",

    // Assign 'module.exports' to the window variable
    output: {
        libraryTarget: "window",
    },
};
```

## Contributing

- [master/../CONTRIBUTING.md](https://github.com/Holo-Host/chaperone-key-manager/blob/master/README.md)
- [./CONTRIBUTING.md](./CONTRIBUTING.md)
