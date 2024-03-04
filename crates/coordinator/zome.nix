
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
      packages.profiles_coordinator = inputs.hcUtils.outputs.lib.rustZome {
        workspacePath = rootPath;
        holochain = inputs'.holochain;
				cratePath = ./.;
      };
  	};
}

