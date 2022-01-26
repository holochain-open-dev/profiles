let
  holonixPath = builtins.fetchTarball "https://github.com/holochain/holonix/archive/c72cfede8d1e673fdbd5f1b6e908fa3086f56e8d.tar.gz";
  holonix = import (holonixPath) {
    holochainVersionId = "v0_0_123";
  };
  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  packages = with nixpkgs; [
    # Additional packages go here
    nodejs-16_x
  ];
}
