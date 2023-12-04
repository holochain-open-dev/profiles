WASMS="./target/wasm32-unknown-unknown/release/*.wasm"
for f in $WASMS; do 
  echo "Optimizing $f zome..."; 
  wasm-opt -Oz -o $f $f
done


