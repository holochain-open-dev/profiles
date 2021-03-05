let 
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/cdf1d199d5489ebc943b88e552507f1063e3e571.tar.gz";
    sha256 = "1b5pdlxj91syg1qqf42f49sxlq9qd3qnz7ccgdncjvhdfyricagh";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";
    
    holochainVersion = { 
     rev = "4e1de9c2209a44c67839b9682ad4c9179a96f6c8";  
     sha256 = "1yqndz2mdmncy5a2j9h3xcabxf62yhr1hdhjdwyghpd42asl8hmr";  
     cargoSha256 = "1ja1h1717jvvgmxghy4al9qbn5kk007914cislp7gzbn1x2kzbz7";
     bins = {
       holochain = "holochain";
     };
    };
  };
in holonix.main