let
  holonixPath = builtins.fetchTarball "https://github.com/holochain/holonix/archive/1cb431ac2d30d6f44dbcb5a40520f7328ae49ec1.tar.gz";
  holonix = import (holonixPath) {
    holochainVersionId = "v0_0_124";
  };
  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  packages = with nixpkgs; [
    # additional packages go here
    nodejs-16_x
  ];
}
