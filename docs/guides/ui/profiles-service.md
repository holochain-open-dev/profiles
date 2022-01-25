# UI Documentation >> ProfilesService ||30

The `ProfilesService` is a state-less class that provides typings wrapping the zome calls that can be made to `hc_zome_profiles`.

```js
import { ProfilesService } from '@holochain-open-dev/profiles';

const service = new ProfilesService(cellClient);

service.getMyProfile().then(myProfile => console.log(myProfile));
```

Learn more about the services [here](). 