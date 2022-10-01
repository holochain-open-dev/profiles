```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = '10--guides/30--frontend/30--profiles-service.rocket.md';
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

# ProfilesService

The `ProfilesService` is a state-less class that provides typings wrapping the zome calls that can be made to `hc_zome_profiles`.

```js
import { ProfilesService } from '@holochain-open-dev/profiles';

const service = new ProfilesService(cellClient);

service.getMyProfile().then(myProfile => console.log(myProfile));
```

Learn more about the services [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#services). 