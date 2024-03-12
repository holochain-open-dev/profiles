{ inputs, rootPath, ... }:

{
  perSystem =
    { inputs'
    , config
    , pkgs
    , system
    , lib
    , options
    , self'
    , ...
    }: {
      packages.profiles_ui =
        let 
          packageJson = builtins.fromJSON (builtins.readFile ./package.json);
        in
          pkgs.buildNpmPackage {
            pname = packageJson.name;
            version = packageJson.version;
            src = ../.;
            npmWorkspace = packageJson.name;
            npmDeps = pkgs.importNpmLock {
              npmRoot = ../.;
              # packageLock = ./package-lock.json;
            };
            npmDepsHash = "sha256-ZM3FT9zPS1rE2ke5i1X0Vhmoe3VtXC+E9NNtla1TIIU=";
          };
  	};
}

