# Compository Library

UI-side library that exposes elements and processes related to the compository DNA.

## How to create a compository bundle

If you want to create a UI bundle compatible with the compository, follow these steps:

1. Install the compository UI library:

```bash
npm i https://github.com/compository/lib#build
```

2. Create a bundle file, with an object of type `Lenses` as default export:

```ts
import { Lenses } from '@compository/lib';
import { AppWebsocket, CellId } from '@holochain/conductor-api';

export default function lenses(
  appWebsocket: AppWebsocket,
  cellId: CellId
): Lenses {
  return {
    standalone: [
      {
        name: 'My Events Calendar',
        render(root: ShadowRoot) {
          root.innerHTML = `<span>My sample calendar!</span>`;
        },
      },
    ],
    entryLenses: {
      calendar_event: {
        name: 'Calendar Event',
        render: (root: ShadowRoot, entryHash: string) => {
          root.innerHTML = `<span>This is the calendar event with hash ${entryHash}</span>`;
        },
      },
    },
    attachmentsLenses: [],
  };
}
```

3. Bundle your UI file with a bundler (eg rollup, webpack) with all the dependencies already compiled. Note that the UI bundle needs to be a standalone ES module interpretable directly by the browser.

> [Example rollup.config.js](https://github.com/holochain-open-dev/calendar-events/blob/master/ui/rollup-bundle.config.js).

4. Add your `bundle.js` to your `*.dna.workdir/dna.json` file:

```json
{
  "name": "calendar-events",
  "uuid": "",
  "properties": null,
  "zomes": {
    "calendar_events": {
      "wasm_path": "../target/wasm32-unknown-unknown/release/calendar_events.wasm",
      "ui_path": "../../ui/bundle/bundle.js"
    }
  }
}
```

5. Follow [How to publish a zome into the compository](https://github.com/compository/cli) to publish your zome.

### Example repositories

- [Calendar Events](https://github.com/holochain-open-dev/calendar-events)
- [Profiles](https://github.com/holochain-open-dev/profiles)
- [File Storage](https://github.com/holochain-open-dev/file-storage-module)
- [Blocky](https://github.com/compository/blocky)
- [Membrane Roles](https://github.com/holochain-open-dev/membrane-roles)
