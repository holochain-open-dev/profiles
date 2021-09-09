[![](https://img.shields.io/npm/v/@holo-host/data-translator/latest?style=flat-square)](http://npmjs.com/package/@holo-host/data-translator)
[![](https://img.shields.io/github/workflow/status/holo-host/data-translator-js/Node.js%20CI/master?style=flat-square&label=master)](https://github.com/holo-host/data-translator-js)

# Holo Data Translator
A tool for translating payloads across Holo services.

[![](https://img.shields.io/github/issues-raw/holo-host/data-translator-js?style=flat-square)](https://github.com/holo-host/data-translator-js/issues)
[![](https://img.shields.io/github/issues-closed-raw/holo-host/data-translator-js?style=flat-square)](https://github.com/holo-host/data-translator-js/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/holo-host/data-translator-js?style=flat-square)](https://github.com/holo-host/data-translator-js/pulls)

## Overview
The main feature of this tool is packing or unpacking messages.

### Usage

#### Server-side

```javascript
const { Package } = require("@holo-host/data-translator");

...

// Create a normal package
ws.on("message", (msg) => {
    let pack = new Package( "Super normal payload..." );

    ws.send( pack.toString() );
});

// Create an error package
ws.on("message", (msg) => {
    let pack;

    try {
        ...something breaks
    } catch ( err ) {
        pack = Package.createFromError( "HoloError", err ) );
    }

    ws.send( pack.toString() );
});
```

#### Client-side

```javascript
const hhdt = require("@holo-host/data-translator");

...

ws.on("message", (msg) => {
    const pack = hhdt.parse( msg );
    const payload = pack.value();

    // Normal package
    console.log( payload ); // "Super normal payload..."

    // Error package
    console.log( payload instanceof Error ); // true
});
```

### API Reference

See [API.md](API.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
