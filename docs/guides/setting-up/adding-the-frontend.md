# Setting Up >> Adding the Frontend ||20

> This guide assumes you are building a web application written in JS or TS, using NPM as the package manager.

0. If you haven't yet, install the `@holochain/client`:

```bash
npm install @holochain/client
```

1. Install this module and the necessary packages with:

```bash
npm install @holochain-open-dev/profiles @holochain-open-dev/context @holochain-open-dev/cell-client
```

2. [Choose which elements you need](../frontend/elements/index.html) and import them:

**If you are developing a normal web-app**:

```js
import "@holochain-open-dev/profiles/create-profile";
import "@holochain-open-dev/profiles/list-profiles";
```

This will define all the elements from this module in the global `CustomElementsRegistry`. You can read more about Custom Elements [here](https://developers.google.com/web/fundamentals/web-components/customelements).

OR

**If you are using the `@open-wc/scoped-elements`** pattern (maybe because you are developing a library rather than a full SPA), you can import the elements' classes directly from the `@holochain-open-dev/profiles` package instead of defining them globally:

```js
import { LitElement, html } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { CreateProfile } from "@holochain-open-dev/profiles";

export class ProfilesTest extends ScopedElementsMixin(LitElement) {
  render() {
    return html` <create-profile></create-profile> `;
  }

  static get scopedElements() {
    return {
      "create-profile": CreateProfile,
    };
  }
}
```

3. Import the `<context-provider>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the elements from `@holochain-open-dev/profiles` (you can read more about the context pattern [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#context)):

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@holochain-open-dev/context/context-provider";
```

And then in your `index.html`:

```html
<context-provider id="profiles-context">
  <create-profile></create-profile>
</context-provider>
```

4. After you connect to Holochain and create the `AppWebsocket`, create the `ProfilesStore` and attach it to the `<context-provider>` element:

```js
import {
  ProfilePrompt,
  SearchAgent,
  ProfilesStore,
  ListProfiles,
  profilesStoreContext,
} from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/client";
import { HolochainClient } from "@holochain-open-dev/cell-client";

const appWebsocket = await AppWebsocket.connect("ws://localhost:8888");
const appInfo = await appWebsocket.appInfo({
  installed_app_id: "test-app",
});

const cellData = appInfo.cell_data[0];
const cellClient = new HolochainClient(appWebsocket, cellData);
const store = new ProfilesStore(cellClient, {
  avatarMode: "avatar",
});

const contextElement = document.getElementById("profiles-context");
contextElement.context = profilesStoreContext;
contextElement.value = store;
```

5. Add the Material Icons font in your `<head>` tag:

```html
<head>
  ...
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
    rel="stylesheet"
  />
</head>
```

You can see a full working example of the UI working in [here](https://github.com/holochain-open-dev/profiles/blob/main/ui/demo/index.html).
