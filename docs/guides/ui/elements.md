# UI Documentation >> create-profile-form ||20

```js story
import { html } from "@mdjs/mdjs-preview";
import "api-viewer-element";
import "@holochain-open-dev/profiles/define-elements";
import { ContextProviderElement } from "@holochain-open-dev/context";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/mocks";
import { profilesStoreContext } from "@holochain-open-dev/profiles";

customElements.define("context-provider", ContextProviderElement);

const store = new ProfilesStore(new ProfilesZomeMock());

export const foo = () => html`
  <context-provider .context=${profilesStoreContext} .value=${store}>
    <api-viewer
      src="/_merged_assets/custom-elements.json"
      selected="create-profile-form"
    ></api-viewer>
  </context-provider>
`;
```
