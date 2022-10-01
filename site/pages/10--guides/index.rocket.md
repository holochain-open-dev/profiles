```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = '10--guides/index.rocket.md';
import { html, layout, setupUnifiedPlugins, components, openGraphLayout } from '../recursive.data.js';
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



# Guides

The profiles zome and its accompanying frontend module are designed to implement and export useful functionality around personal profile information about the agents in a Holochain DHT.

The only field that this module assumes 

Existing functionalities:

- Creating a profile.
- Updating a profile.
- Searching agents by nickname.
- Getting the profile for a list of agents.

Future functionality will include:

- Configurable profile fields.
- Profile detail frontend element.

> In the future, when the personas & profiles application is fully developed, this module will switch to storing data in it, and will serve only as a bridge to get that private data. We hope to maintain the modules and their interfaces as similar as they are now, and that the migration friction is low.

Get started with adding the module into your Holochain app by reading the [Setting Up section](./setting-up/adding-the-zome.md).