let 
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/cdf1d199d5489ebc943b88e552507f1063e3e571.tar.gz";
    sha256 = "1b5pdlxj91syg1qqf42f49sxlq9qd3qnz7ccgdncjvhdfyricagh";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";
    
    holochainVersion = { 
     rev = "fd8049a48ac12ef3e190b48a79ffe8d8b5948caa";  
     sha256 = "065kkmmr8b5ngjqpr7amd7l4dcakj2njx168qvr5z47mmqs9xbgw";  
     cargoSha256 = "1ix8ihlizjsmx8xaaxknbl0wkyck3kc98spipx5alav8ln4wf46s";
     bins = {
       holochain = "holochain";
     };
    };
  };
in holonix.main