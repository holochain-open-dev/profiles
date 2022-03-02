let
  holonixPath = builtins.fetchTarball "https://github.com/holochain/holonix/archive/17bae6b00693f47a09456dec5e42dc54c840a25d.tar.gz";
  holonix = import (holonixPath) {
    holochainVersionId = "v0_0_126";
  };
  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  packages = with nixpkgs; [
    # Additional packages go here
    nodejs-16_x
  ];
}
