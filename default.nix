# Example: Custom Holochain And Binaries
# 
# The following `shell.nix` file can be used in your project's root folder and activated with `nix-shell`.
# It uses a custom revision and a custom set of binaries to be installed.

{ 
  holonixPath ?  builtins.fetchTarball { url = "https://github.com/holochain/holonix/archive/develop.tar.gz"; }
}:

let
  holonix = import (holonixPath) {
    include = {
        # making this explicit even though it's the default
        holochainBinaries = true;
    };

    holochainVersionId = "custom";

    holochainVersion = {
     rev = "363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7";
     sha256 = "sha256:0ssjhang6zljs0zrph998zj7582rf0vdb45p855awa7fmzpd4kfa";
     cargoSha256 = "sha256:0y72lm5b0fl9anb2z9pcx1i3shqdlckz04zx3phc084hbzpig4cq";
     bins = {
       holochain = "holochain";
       hc = "hc";
     };

     lairKeystoreHashes = {
       sha256 = "sha256:05p8j1yfvwqg2amnbqaphc6cd92k65dq10v3afdj0k0kj42gd6ic";
       cargoSha256 = "sha256:0bd1sjx4lngi543l0bnchmpz4qb3ysf8gisary1bhxzq47b286cf";
     };
    };
  };

  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  buildInputs = with nixpkgs; [
    nodejs-16_x
  ];
}