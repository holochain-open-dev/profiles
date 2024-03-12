{ ... }:

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
          rootPackageJson = builtins.fromJSON (builtins.readFile ../package.json);
          packageJson = builtins.fromJSON (builtins.readFile ./package.json);
          builtNodeModules = pkgs.buildNpmPackage {
            pname = packageJson.name;
            version = "0.0.0";
            src = ../.;
            npmWorkspace = "ui";
            npmDeps = pkgs.importNpmLock {
              npmRoot = ../.;
            };
            npmConfigHook = pkgs.importNpmLock.npmConfigHook;
          };
        in
          pkgs.runCommandLocal packageJson.name {} ''
            set -e
            cd ${builtNodeModules}/lib/node_modules/${rootPackageJson.name}
            mkdir $out
            ${pkgs.rsync}/bin/rsync -aP --exclude=node_modules ./* $out
          '';
      # packages.deps = builtins.trace (pkgs.importNpmLock {
      #   npmRoot = ../.;
      #   # packageLock = ./package-lock.json;
      # }) (pkgs.importNpmLock {
      #   npmRoot = ../.;
      #   # packageLock = ./package-lock.json;
      # });
  	};
}

