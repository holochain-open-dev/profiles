```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = '10--guides/10--setting-up/20--adding-the-frontend.rocket.md';
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


# Adding the Frontend 

> This guide assumes you are building a web application written in JS or TS, using NPM as the package manager.

> [Go here](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/) to look at examples of integration of this module in different frontend frameworks (Vue, Svelte, etc.).

1. Install this module and its necessary dependencies with:

```bash
npm install @holochain-open-dev/profiles @holochain-open-dev/cell-client  @holochain/client
```

Careful! If you are using NPM workspaces (which is the case for the apps generated with the Holochain scaffolding and RAD tools), you need to specify which workspace you want to install those dependencies to, and run the command from the root folder of the repository. In the case of the apps generated with the RAD tools:

```bash
npm install @holochain-open-dev/profiles @holochain-open-dev/cell-client @holochain/client -w ui
```

2. [Choose which elements you need](../frontend/elements.md) and import them:

**If you are developing a web-app SPA** (and not a library of elements):

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

3. Connect to Holochain with the `HolochainClient`, and create the `ProfilesStore` with it:

```js
import { ProfilesStore, ProfilesService } from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/client";
import { HolochainClient } from "@holochain-open-dev/cell-client";

async function setupProfilesStore() {
  // TODO: change this to the port where holochain is listening,
  // or keep `ws://localhost:${process.env.HC_PORT}` if you used the scaffolding tooling to bootstrap the application
  const appWs = await AppWebsocket.connect(
    `ws://localhost:${process.env.HC_PORT}`
  );

  // TODO: change "MY_APP_ID" for the installed_app_id of your application
  const appInfo = await appWs.appInfo({
    installed_app_id: <MY_APP_ID>,
  });
  // TODO: change "MY_CELL_ROLE" for the roleId that you can find in your "happ.yaml"
  const cell = appInfo.cell_data.find((c) => c.role_id === <MY_CELL_ROLE>);

  if (!cell) {
    throw new Error('There are no cells with the given role id in this app');
  }

  const client = new HolochainClient(appWs);

  const cellClient = new CellClient(client, cell);

  const profilesStore = new ProfilesStore(new ProfilesService(cellClient), {
    avatarMode: "avatar-optional",
  });
  return profilesStore;
}
```

4. Import the `<profiles-context>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the other elements from `@holochain-open-dev/profiles`:

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@holochain-open-dev/profiles/profiles-context";
```

And then add the `<profiles-context>` element in your html:

```html
<profiles-context>
  <!-- Replace <create-profile> with the contents of your application -->
  <create-profile></create-profile>
</profiles-context>
```

5. Attach the `profilesStore` to the `<profiles-context>` element:

- Go to [this page](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/), select the framework you are using, and follow its example.

You need to set the `store` property of it to your already instantiated `ProfilesStore` object:

- If you **are using some JS framework**:

```html
<!-- React -->
<profiles-context store="{profilesStore}"><!-- ... --></profiles-context>

<!-- Angular -->
<profiles-context [store]="profilesStore"><!-- ... --></profiles-context>

<!-- Vue -->
<profiles-context :store="profilesStore"><!-- ... --></profiles-context>

<!-- Svelte -->
<profiles-context store="{profilesStore}"><!-- ... --></profiles-context>

<!-- Lit -->
<profiles-context .store="${profilesStore}"><!-- ... --></profiles-context>
```

OR

- If you **are not using any framework**:

```js
const contextElement = document.querySelector("profiles-context");
contextElement.store = store;
```

> You can read more about the context pattern [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#context).

6. Add the Material Icons font in your `<head>` tag:

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

That's it! You can spend some time now to take a look at [which elements are available for you to reuse](../frontend/elements.md).
