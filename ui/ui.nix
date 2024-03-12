{ inputs, ... }:

{
  perSystem =
    { inputs'
    , config
    , pkgs
    , system
    , lib
    , options
    , self'
    , ...
    }: {
      packages.profiles_ui = inputs.hcUtils.lib.npmPackage {
        rootPath = ../.;
        workspacePath = ./.;
        inherit system;
      };
  	};
}

