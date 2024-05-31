# Setup


## Template Setup (recommended)

**If you are starting a new application from scratch**, you can use the [holochain-open-dev template](https://github.com/holochain-open-dev/templates) to automatically get the profiles module in your application.

Run this follow its instructions:

```bash
nix run github:holochain-open-dev/templates#hc-scaffold-app-template -- web-app
```

## Manual Setup

> [!NOTE]
> This guide assumes you have a flake.nix in your repository that you created with the [holochain-open-dev scaffolding template](https://github.com/holochain-open-dev/templates)

1. In your `flake.nix`, add the profiles repository to the inputs and to the `holochainSources` list:

```nix
{
  description = "Template for Holochain app development";

  inputs = {
    versions.url  = "github:holochain/holochain?dir=versions/weekly";

    holochain.url = "github:holochain/holochain";
    holochain.inputs.versions.follows = "versions";

    nixpkgs.follows = "holochain/nixpkgs";
    flake-parts.follows = "holochain/flake-parts";

    scaffolding.url = "github:holochain-open-dev/templates";
    hcInfra.url = "github:holochain-open-dev/infrastructure";

    # Holochain dependencies (zomes, DNAs and hApps)
    profiles.url = "github:holochain-open-dev/profiles/nixify"; # [!code ++]
    # Add more repositories here...
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake
      {
        inherit inputs;
      }
      {
        imports = [
          ./happ.nix
        ];
      
        systems = builtins.attrNames inputs.holochain.devShells;
        perSystem =
          { inputs'
          , config
          , pkgs
          , system
          , ...
          }: {
            devShells.default = pkgs.mkShell {
              inputsFrom = [ inputs'.holochain.devShells.holonix ];

              packages = with pkgs; [
                nodejs_20
                cargo-nextest
              ] ++ [
                inputs'.scaffolding.packages.hc-scaffold-app-template
                inputs'.hcInfra.packages.pnpm
                inputs'.hcInfra.packages.sync-npm-git-dependencies-with-nix
              ];
              
              shellHook = ''
                sync-npm-git-dependencies-with-nix
              '';

            };
          };
      };
}
```

2. Go in to the `dna.yaml` for the DNA in which you want to scaffold this zome, and add the `profiles` and `profiles_integrity` zomes to it:

```yaml
---
manifest_version: "1"
name: my_dna
integrity:
  network_seed: ~
  properties: ~
  origin_time: 1711032942640745
  zomes:
    - name: profiles_integrity # [!code ++]
coordinator:
  zomes:
    - name: profiles # [!code ++]
      dependencies: # [!code ++]
        - name: profiles_integrity # [!code ++]
```

3.a. **If you already have a `dna.nix` in your DNA**, you don't need to do anything else for the zomes to be included in your DNA.

3.b. **If you don't have a `dna.nix` already**, create one with this content in the top level folder for your DNA (should contain the `zomes` and `workdir` folder):

```
├── dna.nix # [!code ++]
├── workdir
│  ├── dna.yaml
├── zomes
   ├── coordinator
   ├── integrity
```

```nix
# dna.nix
{ inputs, allZomes, ... }:

{
  # Import all ./zomes/coordinator/*/zome.nix and ./zomes/integrity/*/zome.nix  
  imports = (
      map (m: "${./.}/zomes/coordinator/${m}/zome.nix")
        (builtins.attrNames (builtins.readDir ./zomes/coordinator))
    )
    ++ 
    (
      map (m: "${./.}/zomes/integrity/${m}/zome.nix")
        (builtins.attrNames (builtins.readDir ./zomes/integrity))
    )
  ;
  perSystem =
    { inputs'
    , self'
    , ...
    }: {
  	  packages.MY_DNA = inputs.hcInfra.outputs.lib.dna {
        dnaManifest = ./workdir/dna.yaml; # Point to your DNA manifest
        holochain = inputs'.holochain;
        zomes = (allZomes { inherit inputs' self'; }) // {
          # Override specific zomes here, e.g.:
          # profiles_integrity = inputs'.profiles.packages.profiles_integrity;
        };
      };
  	};
}
```

Now you should be able build your dna with `nix build .#MY_DNA` from the top level of your repository.

4. Install the UI for this module and its necessary dependencies with:

```bash
pnpm install github:holochain-open-dev/profiles/main?path:ui
```

> [!WARNING]
> Careful! If you are using PNPM workspaces (which is the case for the apps generated with the holochain-open-dev scaffolding tool) you need to specify which workspace you want to install those dependencies to, and run the command from the root folder of the repository. In the case of the apps generated with the holochain-open-dev scaffolding tool:
>
>```bash
>pnpm -F ui install @holochain-open-dev/profiles
>```

5. Connect to Holochain with the `AppClient`, and create the `ProfilesStore` with it:

```js
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";
import { AppWebsocket, AppWebsocket } from "@holochain/client";

async function setupProfilesStore() {
  const client = await AppWebsocket.connect('MY_APP_ID');

  // TODO: change "MY_CELL_ROLE" for the roleId that you can find in your "happ.yaml"
  const profilesStore = new ProfilesStore(new ProfilesClient(client, '<MY_CELL_ROLE>'), {
    avatarMode: "avatar-optional",
  });
  return profilesStore;
}
```

6. Import the `<profiles-context>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the other elements from `@holochain-open-dev/profiles`:

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
```

And then add the `<profiles-context>` element in your html:

```html
<profiles-context>
  <!-- Replace <create-profile> with the contents of your application -->
  <create-profile></create-profile>
</profiles-context>
```

7. Attach the `profilesStore` to the `<profiles-context>` element:

You need to set the `store` property of it to your already instantiated `ProfilesStore` object:

- If you **are using some JS framework**:

::: code-group
```html [React]
<profiles-context store={profilesStore}><!-- ... --></profiles-context>
```

```html [Angular]
<profiles-context [store]="profilesStore"><!-- ... --></profiles-context>
```

```html [Vue]
<profiles-context :store="profilesStore"><!-- ... --></profiles-context>
```

```html [Svelte]
<profiles-context store={profilesStore}><!-- ... --></profiles-context>
```

```html [Lit]
<profiles-context .store=${profilesStore}><!-- ... --></profiles-context>
```
:::

OR

- If you **are not using any framework**:

```js
const contextElement = document.querySelector("profiles-context");
contextElement.store = store;
```

> [!NOTE]
> You can read more about the context pattern [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#context).

> [!NOTE]
> Go to [this page](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/), to see examples on integrating this module in each javascript framework.

8. [Choose which elements you need](./elements/profile-prompt.md) and import them like this:

```js
import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
```

And then they are ready be used inside the `<profiles-context>` just like any other HTML tag.

This will define all the elements from this module in the global `CustomElementsRegistry`. You can read more about Custom Elements [here](https://developers.google.com/web/fundamentals/web-components/customelements).

9. Like all the other holochain-open-dev modules, the profiles module uses [shoelace](https://shoelace.style) as its component library. Add your preferred shoelace theme in your `<head>` tag:

```html
<head>
  <link rel="stylesheet" href="path/to/shoelace/dist/themes/light.css" />
</head>
```

or in JS:

```js
import '@shoelace-style/shoelace/dist/themes/light.css';
```

You can read more about how to initialize the shoelace theme [here](https://shoelace.style/getting-started/themes?id=activating-themes).

---

That's it! You have now integrated both the backend and the frontend for the profiles module.

# Example

You can see a full working example of the UI working in [here](https://github.com/holochain-open-dev/profiles/blob/main/ui/demo/index.html).

