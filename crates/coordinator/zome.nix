{ inputs, ... }:

{
  perSystem = { inputs', config, pkgs, system, lib, options, self', ... }: {
    packages.profiles = inputs.hc-infra.outputs.lib.rustZome {
      inherit system;
      workspacePath = inputs.self.outPath;
      crateCargoToml = ./Cargo.toml;
    };

    checks.profiles = inputs.hc-infra.outputs.lib.sweettest {
      inherit system;
      workspacePath = inputs.self.outPath;
      dna = inputs.hc-infra.outputs.lib.dna {
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
        zomes = inputs.hc-infra.outputs.lib.filterZomes self'.packages;
        inherit system;
      };
      crateCargoToml = ./Cargo.toml;
    };
  };
}

