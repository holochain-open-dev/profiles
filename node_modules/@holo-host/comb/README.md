![](https://img.shields.io/npm/v/@holo-host/comb/latest?style=flat-square)

# Cross-origin Message Bus (COMB)

COMB is a library that facilitates the calls between the parent window (hApp UI) and the iframe
(Chaperone).

Used between [Holo Chaperone](https://github.com/Holo-Host/chaperone/tree/develop) and `Holo Hosting
Web SDK`.

## Architecture

COMB is designed to make an iFrame feel like a script.  With this in mind, the expectation is that
the parent window wants to operate the iFrame, not vice-versa.  The purpose of using an iFrame
instead of a script will usually be for isolation and/or security.  The iFrame does not trust the
parent window, but requires input from the parent window to know what to do.

**Features**
- Parent/Child communication line
- Promise wrappers
- Round trip method request
- Restrict domains

### API

[API Reference](https://holo-host.github.io/chaperone/comb/docs/module-COMB.html)

### Example Usage

Both the parent window and iFrame must load COMB.


```html
<script type="text/javascript" src="./holo_hosting_comb.js"></script>
<script type="text/javascript">
(async () => {
    const child = await comb.connect( url, 5000, signal => console.log('comb got signal', signal) );

    await child.set("development_mode", true );
    await child.set("welcome_greeting", "Hello" );

    let response = await child.run("isDevelopmentMode");
    // true
    let response = await child.run("sayWelcome", "world", true );
    // "HELLO WORLD!"
})();
</script>
```

```html
<script type="text/javascript" src="./holo_hosting_comb.js"></script>
<script type="text/javascript">
(async () => {
    const parent = comb.listen({
        "isDevelopmentMode": function () {
            return this.development_mode;
        },
        "sayWelcome": async function ( name, uppercase ) {
            let message = `${this.welcome_greeting}, ${name}!`;
            return uppercase === true ? message.toUpperCase() : message;
        },
    });
})();
</script>
```


## Contributors

We use `Postmate` to set up a message tunnel between the parent and child frames.

`Postmate` provided a `call` child method in its API, but it did not return the result.  COMB's
`Parent` and `Child` classes wrap the communication tunnel in a more useful `request/response` type
API.

**Development environment as of 2019/11**
- Node.js `12`

**Project employs**
- Typescript
- Webpack
- JSDoc

**Setup**

Nix shell will provide packages listed in [../default.nix](../default.nix) `nativeBuildInputs`
```bash
nix-shell ../shell.nix
```

Inside the nix shell
```bash
npm install
```

### Compile (Typescript)

The source is written in Typescript.  Run `npm run compile` or `make build`.

### Bundler (Webpack)

The web distribution is bundled with Webpack.  Run `npm run bundle` or `make dist`.

> **NOTE:** `npm run bundle` will not automatically compile

### Testing

```bash
npm test
```

#### Unit tests
Unit tests are not written because nearly all the complexity is in the integration tests.

#### Integration tests
Integration tests use `puppeteer` to simulate a real browser experience.

**Required setup**
- HTTP Server for parent window (hApp UI)
- HTTP Server for child window (Holo Chaperon)
- Call methods from parent, mock responses from external systems (Resolver, Envoy)
