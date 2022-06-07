# Frontend Docs >> ProfilesStore ||20

The `ProfilesStore` is a JS class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements.

```js
import { ProfilesStore } from "@holochain-open-dev/profiles";

const config = {
  avatarMode: "identicon",
  additionalFields: ["Location", "Bio"], // Custom app level profile fields
};
const store = new ProfilesStore(cellClient, config);
```

> Learn how to setup the `CellClient` object [here](https://www.npmjs.com/package/@holochain-open-dev/cell-client).

The config for the `ProfilesStore` has these options:

```ts
export interface ProfilesConfig {
  zomeName: string; // default: 'profiles'
  avatarMode: "identicon" | "avatar-required" | "avatar-optional"; // default: 'avatar-optional'
  additionalFields: string[]; // default: []
  minNicknameLength: number; // default: 3
}
```

Learn more about the stores and how to integrate them in different frameworks [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#stores).
