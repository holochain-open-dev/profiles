[![](https://img.shields.io/npm/v/@holo-host/cryptolib/latest?style=flat-square)](http://npmjs.com/package/@holo-host/cryptolib)
[![](https://img.shields.io/github/workflow/status/holo-host/cryptolib-js/Node.js%20CI/master?style=flat-square&label=master)](https://github.com/holo-host/cryptolib-js)

# Cross-compatible Cryptographic Utilities (Node/Web)
Contains Holo specific key management implementation (`@holo-host/wasm-key-manager`); as well as
utilities for some internally standardized codecs (signatures, digests, and Agent IDs).

[![](https://img.shields.io/github/issues-raw/holo-host/cryptolib-js?style=flat-square)](https://github.com/holo-host/cryptolib-js/issues)
[![](https://img.shields.io/github/issues-closed-raw/holo-host/cryptolib-js?style=flat-square)](https://github.com/holo-host/cryptolib-js/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/holo-host/cryptolib-js?style=flat-square)](https://github.com/holo-host/cryptolib-js/pulls)

## Usage

```javascript
const crypto = require('crypto');
const expect = require('chai').expect;

const { Codec } = require('@holo-host/cryptolib');

const sha256 = (buf) => crypto.createHash('sha256').update( Buffer.from(buf) ).digest();


/* AgentId */
const agentHoloHashb64 = "uhCAkod6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHGQCkSp"
Codec.AgentId.decodeToHoloHash( agentHoloHashb64 );
// Buffer.from( "hCAkod6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHGQCkSp", "base64" );

const holoHashAgentId = "uhCAkod6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHGQCkSp"
Codec.AgentId.decode(holoHashAgentId);
// Buffer.from( "od6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHE", "base64" );

const publicKeyb64 = "od6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHE";
const publicKeyBuffer =  Buffer.from(publicKeyb64, "base64");
Codec.AgentId.encode(publicKeyBuffer);
// "uhCAkod6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHGQCkSp"


/* HoloHash */
const hashString = "uhCEkWCsAgoKkkfwyJAglj30xX_GLLV-3BXuFy436a2SqpcEwyBzm";
Codec.Digest.decode(hashString);
// Buffer.from("WCsAgoKkkfwyJAglj30xX/GLLV+3BXuFy436a2SqpcE=", "base64");

const holoHashType = "entry";
const rawBuffer = Buffer.from("WCsAgoKkkfwyJAglj30xX/GLLV+3BXuFy436a2SqpcE=", "base64");
Codec.Digest.holoHashFromBuffer(holoHashType, rawBuffer);
// Buffer.from("hCEkWCsAgoKkkfwyJAglj30xX/GLLV+3BXuFy436a2SqpcEwyBzm", "base64");

const holoHashType = "entry";
const rawBuffer = Buffer.from("WCsAgoKkkfwyJAglj30xX/GLLV+3BXuFy436a2SqpcE=", "base64");
Codec.Digest.encode(holoHashType, rawBuffer);
// uhCEkWCsAgoKkkfwyJAglj30xX_GLLV-3BXuFy436a2SqpcEwyBzm

const holoHashType = "entry";
const holoHashBuffer = Buffer.from("uhCEkWCsAgoKkkfwyJAglj30xX_GLLV-3BXuFy436a2SqpcEwyBzm", "base64");
Codec.Digest.encode(holoHashType, holoHashBuffer);
// uhCEkWCsAgoKkkfwyJAglj30xX_GLLV-3BXuFy436a2SqpcEwyBzm

/* Signature */
const messageBytes = Buffer.from("example 1");
const base64String = "ZXhhbXBsZSAx";

expect( Codec.Signature.decode(base64String) ).to.deep.equal(messageBytes)


const base64String = "ZXhhbXBsZSAy";
const messageBytes = Buffer.from("example 2");

expect( Codec.Signature.encode(messageBytes) ).to.equal(base64String);


/* Digest */
const hashString				=  "EnV7InN0ZXBzIjp7ImJhc2UiOjY0LCJwcm9jZXNzIjpbImRhdGEgd2lsbCBiZSBoYXNoZWQgaW50byBhIiwic2hhMjU2IG11bHRpaGFzaCB0aGVuIiwiZW5jb2RlZCJdfSwidGVzdCI6ImluZm9ybWF0aW9uIn0=";
Codec.Digest.decode(hashString)
// Buffer.from("eyJzdGVwcyI6eyJiYXNlIjo2NCwicHJvY2VzcyI6WyJkYXRhIHdpbGwgYmUgaGFzaGVkIGludG8gYSIsInNoYTI1NiBtdWx0aWhhc2ggdGhlbiIsImVuY29kZWQiXX0sInRlc3QiOiJpbmZvcm1hdGlvbiJ9", "base64")

const jsonData				=  {
    "test": "information",
    "steps": {
      "process": ["data will be hashed into a", "sha256 multihash then", "encoded"],
      "base": 64
    }
  };
Codec.Digest.encode(jsonData);
// "EnV7InN0ZXBzIjp7ImJhc2UiOjY0LCJwcm9jZXNzIjpbImRhdGEgd2lsbCBiZSBoYXNoZWQgaW50byBhIiwic2hhMjU2IG11bHRpaGFzaCB0aGVuIiwiZW5jb2RlZCJdfSwidGVzdCI6ImluZm9ybWF0aW9uIn0="

const base64Buffer = Buffer.from("eyJzdGVwcyI6eyJiYXNlIjo2NCwicHJvY2VzcyI6WyJkYXRhIHdpbGwgYmUgaGFzaGVkIGludG8gYSIsInNoYTI1NiBtdWx0aWhhc2ggdGhlbiIsImVuY29kZWQiXX0sInRlc3QiOiJpbmZvcm1hdGlvbiJ9", "base64" );
Codec.Digest.encode(base64Buffer);
// "EnV7InN0ZXBzIjp7ImJhc2UiOjY0LCJwcm9jZXNzIjpbImRhdGEgd2lsbCBiZSBoYXNoZWQgaW50byBhIiwic2hhMjU2IG11bHRpaGFzaCB0aGVuIiwiZW5jb2RlZCJdfSwidGVzdCI6ImluZm9ybWF0aW9uIn0="

```
