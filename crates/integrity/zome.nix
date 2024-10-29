{ inputs, ... }:

{
  perSystem = { inputs', config, pkgs, system, lib, options, ... }: rec {
    builders.profiles_integrity = { linked_devices_integrity_zome_name }:
      inputs.hc-infra.outputs.builders.${system}.rustZome {
        workspacePath = inputs.self.outPath;
        crateCargoToml = ./Cargo.toml;
        cargoArtifacts = inputs'.hc-infra.packages.zomeCargoArtifacts;
        zomeEnvironmentVars = {
          LINKED_DEVICES_INTEGRITY_ZOME_NAME =
            linked_devices_integrity_zome_name;
        };
      };

    packages.profiles_integrity = builders.profiles_integrity {
      linked_devices_integrity_zome_name = "linked_devices_integrity";
    };
  };
}

