{ inputs, ... }:

{
  perSystem = { inputs', self', lib, system, ... }: {
    packages.profiles_test_dna =
      inputs.hc-infra.outputs.builders.${system}.dna {
        dnaManifest = ./dna.yaml;
        zomes = {
          # This overrides all the "bundled" properties for the DNA manifest
          linked_devices_integrity =
            inputs'.linked-devices.packages.linked_devices_integrity;
          linked_devices = inputs'.linked-devices.packages.linked_devices;

          profiles_integrity = self'.packages.profiles_integrity;
          profiles = self'.packages.profiles;
        };
      };
  };
}

