{ inputs, ... }:

{
  perSystem = { inputs', config, pkgs, system, lib, options, self', ... }: {
    packages.profiles = inputs.hc-infra.outputs.builders.${system}.rustZome {
      workspacePath = inputs.self.outPath;
      crateCargoToml = ./Cargo.toml;
    };

    checks.profiles = inputs.hc-infra.outputs.builders.${system}.sweettest {
      workspacePath = inputs.self.outPath;
      dna = inputs.hc-infra.outputs.builders.${system}.dna {
        dnaManifest = builtins.toFile "dna.yaml" ''
          ---
          manifest_version: "1"
          name: test_dna
          integrity:
            network_seed: ~
            properties: ~
            origin_time: 1709638576394039
            zomes: 
              - name: profiles_integrity
          coordinator:
            zomes:
              - name: profiles
                hash: ~
                dependencies: 
                  - name: profiles_integrity
                dylib: ~
        '';
        zomes = {
          profiles = self'.packages.profiles;
          profiles_integrity = self'.packages.profiles_integrity;
        };
      };
      crateCargoToml = ./Cargo.toml;
    };
  };
}

