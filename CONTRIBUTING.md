# Contributing

## Developer Setup

> TLDR: run `nix develop`, `npm install` and `npm start` or `npm test` in the root folder of repository.

### Requirements

- Having [nix](https://developer.holochain.org/docs/install) installed.
- Enter the nix-shell on this folder with:

```bash
nix develop
```

This will take a long time the first time you do it. To verify you have `holochain` and `hc` correctly installed:

```bash
holochain --version
```

Should give something like:

```bash
holochain 0.1.3
```

### Install

```bash
npm install
```

### Running

```bash
npm start
```

Or if you want more than 2 agents:

```bash
AGENTS=3 npm run network
```

### Testing

```bash
npm test
```
