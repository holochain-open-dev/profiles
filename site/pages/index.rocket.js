/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'index.rocket.js';
import { html, setupUnifiedPlugins, components, openGraphLayout } from './recursive.data.js';
export { html, setupUnifiedPlugins, components, openGraphLayout };
export async function registerCustomElements() {
  // server-only components
  customElements.define('rocket-social-link', await import('@rocket/components/social-link.js').then(m => m.RocketSocialLink));
  customElements.define('rocket-header', await import('@rocket/components/header.js').then(m => m.RocketHeader));
  customElements.define('launch-home', await import('@rocket/launch/home.js').then(m => m.LaunchHome));
  customElements.define('rocket-content-area', await import('@rocket/components/content-area.js').then(m => m.RocketContentArea));
  // hydrate-able components
  customElements.define('rocket-search', await import('@rocket/search/search.js').then(m => m.RocketSearch));
  customElements.define('rocket-drawer', await import('@rocket/components/drawer.js').then(m => m.RocketDrawer));
}
export const needsLoader = true;
/* END - Rocket auto generated - do not touch */

import { LayoutHome } from "@rocket/launch";
import { layoutData } from "#src/layouts/layoutData.js";

export const description =
  "Rocket enables everyone to code a website. Use an existing theme or create your own. Be fast by server rendering web components with little to no JavaScript.";
export const subTitle = "Everyone can code a website";

export const layout = new LayoutHome({
  ...layoutData,
  titleWrapperFn: () => "Welcome to Rocket",
});

export default () => html`
  <rocket-content-area>
    <launch-home .reasons=${[]}>
      <div class="column" slot="title">
        <!-- <source srcset="../src/assets/rocket-logo-dark-with-text-below.svg" media="(prefers-color-scheme: dark)"> -->
        <!-- <source srcset="../src/assets/rocket-logo-dark-with-text.svg" media="(prefers-color-scheme: dark) and (min-width: 1024px)"> -->
        <img
          src="../src/assets/logo.svg"
          alt="Profiles"
          width="250"
          height="257.92"
        />
        <h1>@holochain-open-dev/profiles</h1>
      </div>
      <p slot="slogan">
        A Holochain module to handle profiles with at least a nickname
      </p>
      <a slot="cta" role="listitem" href="/guides/">Guides and docs</a>

      <style type="text/css">
        /* workaround until Firefox supports width/height on source tags https://bugzilla.mozilla.org/show_bug.cgi?id=1694741 */
        @media (min-width: 1024px) {
          h1 img {
            height: 67.87px;
          }
        }
      </style>
    </launch-home>
  </rocket-content-area>
`;
