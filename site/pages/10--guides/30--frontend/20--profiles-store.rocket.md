```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = '10--guides/30--frontend/20--profiles-store.rocket.md';
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

# ProfilesStore 

The `ProfilesStore` is a JS class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements.

```js
import { ProfilesStore, ProfilesService } from "@holochain-open-dev/profiles";

const config = {
  avatarMode: "identicon",
  additionalFields: ["Location", "Bio"], // Custom app level profile fields
};
const store = new ProfilesStore(new ProfilesService(cellClient), config);
```

> Learn how to setup the `CellClient` object [here](https://www.npmjs.com/package/@holochain-open-dev/cell-client).

The config for the `ProfilesStore` has these options:

```ts
export interface ProfilesConfig {
  avatarMode: "identicon" | "avatar-required" | "avatar-optional"; // default: 'avatar-optional'
  additionalFields: string[]; // default: []
  minNicknameLength: number; // default: 3
}
```

Learn more about the stores and how to integrate them in different frameworks [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#stores).
