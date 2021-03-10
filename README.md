# Profiles Module

Small zome to manage the profiles in your DNA, in RSM.

This module is designed to be included in other DNAs, assuming as little as possible from those. It is packaged as a holochain zome, and an npm package that offers native Web Components that can be used across browsers and frameworks.

> Notice that this zome still stores all profiles in the DNA in which the zome is included. Integration and bridging with personas & profiles will be done in the future, maintaining as much as possible the current API.

## Documentation

See our [`storybook`](https://holochain-open-dev.github.io/profiles-module).

## Assumptions

These are the things you need to know to decide if you can use this module in your happ:

- Profiles:
  - Your profile at least contains a username field.
  - You can search for all the users starting with the first 3 letters of their username.
- UI module:
  - `ApolloClient` as the state-management and data-fetching engine.
  - The resolvers are declared in the frontend using [`makeExecutableSchema`](https://www.npmjs.com/package/@graphql-tools/schema).
  - No framework or library assumed.

## Installation and usage

### Including the zome in your DNA

1. Create a new `profiles` folder in the `zomes` of the consuming DNA.
2. Add a new `Cargo.toml` in that folder. In its content, paste the `Cargo.toml` content from any zome.
3. Change the `name` properties of the `Cargo.toml` file to `profiles`.
4. Add this zome as a dependency in the `Cargo.toml` file:

```toml
[dependencies]
profiles = {git = "https://github.com/holochain-open-dev/profiles", package = "profiles"}
```

5. Create a `src` folder besides the `Cargo.toml` with this content:

```rust
extern crate profiles;
```

6. Add the zome into your `*.dna.workdir/dna.yaml` file.
7. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.

### Using the UI module

1. Install the module with `npm install git://github.com/holochain-open-dev/profiles.git#ui-build`.


2. Import and create the mobx store for profiles and for this module, and define the custom elements you need in your app:

```js
import { connectStore } from "@holochain-open-dev/common";
import {
  ProfilePrompt,
  ProfilesStore,
  ProfilesService,
} from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/conductor-api";

async function setupProfiles() {
  const appWebsocket = await ConductorApi.AppWebsocket.connect(
    process.env.CONDUCTOR_URL,
    12000
  );
  const appInfo = await appWebsocket.appInfo({
    installed_app_id: "test-app",
  });

  const cellId = appInfo.cell_data[0][0];

  const profilesService = new ProfilesService(appWebsocket, cellId);
  const profilesStore = new ProfilesStore(profilesService);

  customElements.define(
    "profile-prompt",
    connectStore(ProfilePrompt, profilesStore)
  );
}
```

3. All the elements you have defined are now available to use as normal HTML tags:

```html
...
<body>
  <profile-prompt style="height: 400px; width: 500px"></profile-prompt>
</body>
```

Take into account that at this point the elements already expect a holochain conductor running at `ws://localhost:8888`.

You can see a full working example [here](/ui/demo/index.html).

## Extending the profile for your app

> WARNING! This might change in the future

To add new fields to the profile for your app, change the setup of your ApolloClient and add a new GraphQl schema to your type definitions:

```js
import {
  profilesTypeDefs,
} from "@holochain-open-dev/profiles";

const profileExtensionTypeDefs = gql`
  extend type Profile {
    avatar: String!
    name: String!
  }

  extend type ProfileInput {
    avatar: String!
    name: String!
  }
`;

const allTypeDefs = [rootTypeDef, profilesTypeDefs, profileExtensionTypeDefs];

...
```

If you do this, the `<hod-create-profile-form>` will not work (will work in the future to adapt to your profile).

## Developer setup

Visit the [developer setup](/dev-setup.md).