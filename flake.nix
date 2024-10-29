{
  description = "Template for Holochain app development";

  inputs = {
    nixpkgs.follows = "holonix/nixpkgs";
    holonix.url = "github:holochain/holonix/main-0.3";
    hc-infra.url = "github:holochain-open-dev/infrastructure";
    p2p-shipyard.url = "github:darksoil-studio/p2p-shipyard/develop";
    playground.url = "github:darksoil-studio/holochain-playground";
    linked-devices.url = "github:darksoil-studio/linked-devices";
  };

  nixConfig = {
    extra-substituters = [ "https://holochain-open-dev.cachix.org" ];
    extra-trusted-public-keys = [
      "holochain-open-dev.cachix.org-1:3Tr+9in6uo44Ga7qiuRIfOTFXog+2+YbyhwI/Z6Cp4U="
    ];
  };

  outputs = inputs@{ ... }:
    inputs.holonix.inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        ./crates/coordinator/zome.nix
        ./crates/integrity/zome.nix
        ./workdir/dna.nix
        ./workdir/happ.nix
        inputs.hc-infra.outputs.flakeModules.builders
      ];

      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, lib, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.hc-infra.devShells.synchronized-pnpm
            inputs'.holonix.devShells.default
          ];
          packages = [
            inputs'.p2p-shipyard.packages.hc-pilot
            inputs'.playground.packages.hc-playground
          ];
        };

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.hc-infra.packages.scaffold-remote-zome ];
          buildInputs = [ pkgs.makeWrapper ];
          postBuild = ''
            wrapProgram $out/bin/scaffold-remote-zome \
              --add-flags "profiles \
                --integrity-zome-name profiles_integrity \
                --coordinator-zome-name profiles \
                --remote-zome-git-url github:holochain-open-dev/profiles \
                --remote-zome-git-branch nixify \
                --remote-npm-package-name @holochain-open-dev/profiles \
                --remote-npm-package-path ui"
          '';
        };
      };
    };
}
