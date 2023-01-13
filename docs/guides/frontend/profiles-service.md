# Frontend Docs >> ProfilesClient ||30

The `ProfilesClient` is a state-less class that provides typings wrapping the zome calls that can be made to `hc_zome_profiles`.

```js
import { ProfilesClient } from '@holochain-open-dev/profiles';

const service = new ProfilesClient(client, 'my-role-name');

service.getMyProfile().then(myProfile => console.log(myProfile));
```

Learn more about the services [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#services). 