let
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/3e94163765975f35f7d8ec509b33c3da52661bd1.tar.gz";
    sha256 = "sha256:07sl281r29ygh54dxys1qpjvlvmnh7iv1ppf79fbki96dj9ip7d2";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";

    holochainVersion = {
     rev = "09397e68bd3163d3768a085694a6cd451124cc34";
     sha256 = "sha256:0pxjnzf1qfns2smc0h1fkglc86kwyqzwsz908k374rdgh78sba6c";
     cargoSha256 = "sha256:097qvqzpx9vmvz20ya0260mia4y49v66kj9dn1a7bs344w2drpj2";
     bins = {
       holochain = "holochain";
       hc = "hc";
     };
    };
    holochainOtherDepsNames = ["lair-keystore"];
  };
in holonix.main
