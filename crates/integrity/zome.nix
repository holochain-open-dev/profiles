{ inputs, rootPath, ... }:

{
  perSystem =
    { inputs'
    , config
    , pkgs
    , system
    , lib
    , options
    , ...
    }: {
      packages.profiles_integrity = inputs.hc-infra.outputs.lib.rustZome {
        workspacePath = rootPath;
        holochain = inputs'.holochain;
			  crateCargoToml = ./Cargo.toml;
      };
  	};
}

