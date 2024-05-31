{ inputs, ... }:

{
  perSystem = { inputs', config, pkgs, system, lib, options, self', ... }: {
    packages.profiles = inputs.hc-infra.outputs.lib.rustZome {
      workspacePath = inputs.self.outPath;
      holochain = inputs'.holochain;
      crateCargoToml = ./Cargo.toml;
    };

    checks.profiles = inputs.hc-infra.outputs.lib.sweettest {
      workspacePath = inputs.self.outPath;
      holochain = inputs'.holochain;
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
        holochain = inputs'.holochain;
      };
      crateCargoToml = ./Cargo.toml;
    };
  };
}

