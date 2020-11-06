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
profiles = {git = "https://github.com/holochain-open-dev/profiles-module", package = "profiles"}
```

5. Create a `src` folder besides the `Cargo.toml` with this content:

```rust
extern crate profiles;
```

6. Add the zome into your `*.dna.workdir/dna.json` file.
7. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.

### Using the UI module

1. Install the module with `npm install git://github.com/holochain-open-dev/profiles-module.git#ui-build`.

2. Add the GraphQl schema and resolvers to your `ApolloClient` setup:

```js
import { AppWebsocket } from "@holochain/conductor-api";
import {
  profilesTypeDefs,
  profilesResolvers,
} from "@holochain-open-dev/profiles";

export async function setupClient(url) {
  const appWebsocket = await AppWebsocket.connect(url);

  const appInfo = await appWebsocket.appInfo({ app_id: "test-app" });

  const cellId = appInfo.cell_data[0][0];

  const executableSchema = makeExecutableSchema({
    typeDefs: [rootTypeDef, profilesTypeDefs],
    resolvers: [profilesResolvers(appWebsocket, cellId)],
  });

  const schemaLink = new SchemaLink({ schema: executableSchema });

  return new ApolloClient({
    typeDefs: allTypeDefs,
    cache: new InMemoryCache(),
    link: schemaLink,
  });
}
```

3. In the root file of your application, install the module:

```js
import { ProfilesModule } from "@holochain-open-dev/profiles";
async function initApp() {
  const client = await setupClient(`ws://localhost:8888`);

  const profilesModule = new ProfilesModule({ apolloClient: client });

  await profilesModule.install();
}
```

4. Once you have installed the module, all the elements you see in our storybook will become available for you to use in your HTML, like this:

```html
...
<body>
  <hod-profiles-prompt>
    <span>Here we should put the content of our application</span>
  </hod-profiles-prompt>
</body>
```

Take into account that at this point the elements already expect a holochain conductor running at `ws://localhost:8888`.

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

This respository is structured in the following way:

- `ui/`: UI library.
- `zome/`: example DNA with the `profiles` code.
- Top level `Cargo.toml` is a virtual package necessary for other DNAs to include this zome by pointing to this git repository.

Read the [UI developer setup](/ui/README.md) and the [Zome developer setup](/zome/README.md).
