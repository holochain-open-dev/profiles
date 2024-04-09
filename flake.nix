{
  description = "Template for Holochain app development";
  
  inputs = {
    nixpkgs.follows = "holochain/nixpkgs";

    versions.url = "github:holochain/holochain?dir=versions/weekly";

    holochain = {
      url = "github:holochain/holochain";
      inputs.versions.follows = "versions";
    };
    hc-infra.url = "github:holochain-open-dev/infrastructure/0.300.0-dev";
  };

  nixConfig = {
		extra-substituters = [
	    "https://holochain-open-dev.cachix.org"
	  ];	
		extra-trusted-public-keys = [
			"holochain-open-dev.cachix.org-1:3Tr+9in6uo44Ga7qiuRIfOTFXog+2+YbyhwI/Z6Cp4U="
	  ];
	};

  outputs = inputs @ { ... }:
    inputs.holochain.inputs.flake-parts.lib.mkFlake
      {
        inherit inputs;
        specialArgs.rootPath = ./.;
      }
      {
        imports = [
          ./crates/coordinator/zome.nix
          ./crates/integrity/zome.nix
        ];

        systems = builtins.attrNames inputs.holochain.devShells;
        perSystem =
          { inputs'
          , config
          , pkgs
          , system
          , lib
          , ...
          }: {
            devShells.default = pkgs.mkShell {
              inputsFrom = [ inputs'.holochain.devShells.holonix ];
              packages = with pkgs; [
                nodejs_20
              ];
            };

            packages.scaffold = pkgs.symlinkJoin {
              name = "scaffold-remote-zome";
              paths = [ inputs'.hc-infra.packages.scaffold-remote-zome ];
              buildInputs = [ pkgs.makeWrapper ];
              postBuild = ''
                wrapProgram $out/bin/scaffold-remote-zome \
                  --add-flags "profiles --integrity-zome-name profiles_integrity --coordinator-zome-name profiles --remote-zome-git-url github:holochain-open-dev/profiles/nixify --remote-npm-package-name @holochain-open-dev/profiles --remote-npm-package-path ui"
              '';
            };
          };
      };
}
