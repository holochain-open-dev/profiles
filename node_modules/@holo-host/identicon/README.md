# Identicon generator for use with holo hashes

This is a library for rendering identicons from 32 byte holo hashes.

## Installation

```
yarn add @holo-host/identicon
```

## Usage

```html
  <canvas id="identicon" width="1" height="1" />
```

```javascript
import renderIcon from '@holo-host/identicon'

const canvas = document.getElementBy('identicon')
const opts = {
  hash: holoHash,
  size: 32,
}
renderIcon(opts, canvas)
```

### renderIcon(opts, canvas)

Where `opts.hash` is a Uint8Array and `opts.size` is an int that determines the size in pixels.

## Vue Component Example

There's an example of a [vue component](demo-server/src/components/Identicon.vue) using the library in the [demo-server](demo-server) directory of this repo.

## Demo Server

You can run the demo server to test changes in the renderIdenticon code.

```
cd demo-server
yarn serve
```

This will open a server on localhost:8080 with examples of rendered identicons. Make changes to index.js and then reload the browser to see the changes.

## Known issues
There are a couple of issues with the current implementation which will be addressed in a forthcoming update.
1. The algorithm doesn't use all of the bits of every byte, for example when using a whole byte to choose whether numShapes will be 3 or 4, it's ignoring 7 bits from that byte.
  - This is easily fixable by using a bitstream to pull exactly the bits we need from the input.
2. There are possible collisions where two different hashes could produce the same image (for example, if one large shape obscures a smaller shape, then differences in the smaller shape wouldn't show up in the image)
  - This is much trickier to address using the current visualization algorithm and will likely require changing the final appearance of the images significantly.
