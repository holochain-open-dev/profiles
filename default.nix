let 
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/3e94163765975f35f7d8ec509b33c3da52661bd1.tar.gz";
    sha256 = "07sl281r29ygh54dxys1qpjvlvmnh7iv1ppf79fbki96dj9ip7d2";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";
    
    holochainVersion = { 
     rev = "db248066989484297c15626684afd9c5c66d0071";
     sha256 = "1xpxk7w16q20053bsgpwjh3vaqpxjaj2ys9r9mpkbiwvvxqadjfr";
     cargoSha256 = "0kfk8x1yyn2mbi8r4nswi6dwj2fydwandgz9iab7hzrz7p36gyq8";
     bins = {
       holochain = "holochain";
       hc = "hc";
     };
    };
  };
in holonix.main
