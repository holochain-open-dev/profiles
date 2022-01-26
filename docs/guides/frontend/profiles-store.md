# Frontend Docs >> ProfilesStore ||20

The `ProfilesStore` is a JS class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements. 

```js
import { ProfilesStore } from '@holochain-open-dev/profiles';

const config = {
  avatarMode
};
const store = new ProfilesStore(cellClient, config);
```

The config for the `ProfilesStore` has these options:

```ts
export interface ProfilesConfig {
  zomeName: string;                     // default: profiles
  avatarMode: 'identicon' | 'avatar';   // default: 'avatar'
}
```

Learn more about the stores and how to integrate them in different frameworks [here]().