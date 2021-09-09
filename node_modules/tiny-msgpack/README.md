# tiny-msgpack [![Build Status](https://travis-ci.org/JoshuaWise/tiny-msgpack.svg?branch=master)](https://travis-ci.org/JoshuaWise/tiny-msgpack)

A minimalistic [MessagePack](http://msgpack.org/index.html) encoder and decoder for JavaScript.

- Tiny Size (2.63 kB minified and gzipped)
- Fast performance (Slightly faster than [msgpack-lite](https://github.com/kawanet/msgpack-lite/))
- Extension support
- No other bells or whistles

By default, `msgpack` can encode numbers, strings, booleans, nulls, arrays, objects, and binary data (`Uint8Array`). However, additional types can be registered by using [extensions](#extensions).

## Installation

```bash
npm install --save tiny-msgpack
```

## Usage

```js
var msgpack = require('tiny-msgpack');

var uint8array = msgpack.encode({foo: 'bar', baz: 123});
var object = msgpack.decode(uint8array);
```

## Extensions

```js
var msgpack = require('tiny-msgpack');
var codec = new msgpack.Codec;

function encodeDate(date) {
  return msgpack.encode(+date);
}
function decodeDate(uint8array) {
  return new Date(msgpack.decode(uint8array));
}
codec.register(0x42, Date, encodeDate, decodeDate);

var uint8array = msgpack.encode({timestamp: new Date}, codec);
var object = msgpack.decode(uint8array, codec);
console.log(object.timestamp instanceof Date); // => true
```

## Browser Support

In the browser, `tiny-msgpack` requires the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API), which is currently only implemented by Chrome and Firefox. However, if you polyfill it, this package is supported by the following browsers:

- Chrome 9+
- Firefox 15+
- Safari 5.1+
- Opera 12.1+
- Internet Explorer 10+

## Zero copy

In the [MessagePack](http://msgpack.org/index.html) format, binary data is encoded as... binary data! To maximize performance, `tiny-msgpack` does not copy binary data when encoding or decoding it. So after decoding, the contents of a returned `Uint8Array` can be affected by modifying the input `Uint8Array` (the same can happen with encoding).

## License

[MIT](https://github.com/JoshuaWise/tiny-msgpack/blob/master/LICENSE)
