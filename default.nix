let
  holonixPath = builtins.fetchTarball "https://github.com/holochain/holonix/archive/f23119746d05fda8c62fd0e8b3874335b0258447.tar.gz";
  holonix = import (holonixPath) {
    holochainVersionId = "v0_0_128";
  };
  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  packages = with nixpkgs; [
    # Additional packages go here
    nodejs-16_x
  ];
}
