# ProfilesStore

The `ProfilesStore` is a typescript class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements.

```js
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

const config = {
  avatarMode: "identicon",

  // Custom app level profile fields
  additionalFields: [
    {
      name: "location",
      label: "Location",
      required: true, 
    },
    {
      name: "bio",
      label: "Bio",
      required: false,
    }
  ], 
};
const store = new ProfilesStore(new ProfilesClient(appAgentClient, 'my-role-name'), config);
```

> Learn how to setup the `AppClient` object [here](https://www.npmjs.com/package/@holochain/client).

The config for the `ProfilesStore` has these options:

```ts
export interface ProfilesConfig {
  avatarMode: "identicon" | "avatar-required" | "avatar-optional"; // default: 'avatar-optional'
  additionalFields: FieldConfig[]; // default: []
  minNicknameLength: number; // default: 3
}
```

The `FieldConfig` has these options:

```ts
export interface FieldConfig {
  name: string,
  label: string,
  required: boolean,
}
```

Learn more about the stores and how to integrate them in different frameworks [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#stores).
