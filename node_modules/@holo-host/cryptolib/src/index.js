const {
  KeyManager,
  deriveSeedFrom
} = require("@holo-host/wasm-key-manager");
const blake = require("blakejs");
const multihash = require("multihashes");
const SerializeJSON = require("json-stable-stringify");
const base36 = require("base-x")("0123456789abcdefghijklmnopqrstuvwxyz");

const HHT = Object.freeze({
  AGENT: "agent",
  HEADER: "header",
  ENTRY: "entry",
  DNA: "dna",
});

const HOLO_HASH_AGENT_PREFIX = Buffer.from(new Uint8Array([0x84, 0x20, 0x24]).buffer);
const HOLO_HASH_HEADER_PREFIX = Buffer.from(new Uint8Array([0x84, 0x29, 0x24]).buffer);
const HOLO_HASH_ENTRY_PREFIX = Buffer.from(new Uint8Array([0x84, 0x21, 0x24]).buffer);
const HOLO_HASH_DNA_PREFIX = Buffer.from(new Uint8Array([0x84, 0x2d, 0x24]).buffer);

const getHoloHashPrefix = holoHashType => {
  let holoHashPrefix;
  switch (holoHashType) {
    case HHT.AGENT:
      holoHashPrefix = HOLO_HASH_AGENT_PREFIX;
      break;
    case HHT.HEADER:
      holoHashPrefix = HOLO_HASH_HEADER_PREFIX;
      break;
    case HHT.ENTRY:
      holoHashPrefix = HOLO_HASH_ENTRY_PREFIX;
      break;
    case HHT.DNA:
      holoHashPrefix = HOLO_HASH_DNA_PREFIX;
      break;
    default:
      throw new Error("Received unsupported HoloHash Type in Codec.Digest : ", holoHashType);
  }
  return holoHashPrefix;
}

function check_length(buf, expectedLength) {
  if (Buffer.byteLength(buf) !== expectedLength)
    throw new Error(`Unexpected buffer length of ${Buffer.byteLength(buf)}.  Buffer should be ${expectedLength} bytes.`);
  return buf;
}

function convert_b64_to_holohash_b64(rawBase64) {
  let holoHashbase64 = '';
  const len = rawBase64.length;
  for (let i = 0; i < len; i++) {
    let char = rawBase64[i];
    if (char === '/') {
      char = '_'
    } else if (char === '+') {
      char = '-'
    }
    holoHashbase64 += char;
  }
  return holoHashbase64;
}

// Generate holohash 4 byte (or u32) dht "location" - used for checksum and dht sharding
function calc_dht_bytes(data) {
  const digest = blake.blake2b(data, null, 16);
  const dht_part = Buffer.from([digest[0], digest[1], digest[2], digest[3]])

  for (let i of [4, 8, 12]) {
    dht_part[0] ^= digest[i];
    dht_part[1] ^= digest[i + 1];
    dht_part[2] ^= digest[i + 2];
    dht_part[3] ^= digest[i + 3];
  }

  return dht_part;
}

const Codec = {
  "AgentId": {
    decode: (base64) => Codec.HoloHash.decode(base64),
    encode: (buf) => Codec.HoloHash.encode("agent", Buffer.from(buf)),
    decodeToHoloHash: (base64) => {
      const buf = Buffer.from(base64.slice(1), "base64");
      check_length(Buffer.from(buf), 39);
      return buf;
    },
  },
  "Base36": {
    decode: (str) => base36.decode(str),
    encode: (buf) => base36.encode(Buffer.from(buf)),
  },
  "HoloHash": {
    holoHashFromBuffer: (holoHashType, buf) => {
      const holoHashPrefix = getHoloHashPrefix(holoHashType);
      check_length(Buffer.from(buf), 32);
      return Buffer.concat([
        holoHashPrefix,
        buf,
        calc_dht_bytes(buf)
      ]);
    },
    encode: (holoHashType, buf) => {
      if (typeof holoHashType !== 'string') {
        throw new Error('First argument must be a string declaring the type of HoloHash to be encoded. Accepted HoloHash types are: header, entry, dna, and agent.')
      }
      if (Buffer.byteLength(buf) === 39) {
        const compareBuf = Buffer.alloc(3);
        buf.copy(compareBuf, 0, 0, 3);
        const holoHashPrefix = getHoloHashPrefix(holoHashType.toLowerCase());
        if (Buffer.compare(compareBuf, holoHashPrefix) === 0) {
          // encoding from holohash buffer
          return "u" + convert_b64_to_holohash_b64(Buffer.from(buf).toString("base64"));
        } else {
          throw new Error(`Unexpected buffer length of ${Buffer.byteLength(buf)}.  Buffer should be 32 bytes.`);
        }
      }
      // encoding from raw buffer
      const rawBase64 = Codec.HoloHash.holoHashFromBuffer(holoHashType.toLowerCase(), Buffer.from(buf)).toString("base64");
      return "u" + convert_b64_to_holohash_b64(rawBase64);
    },
    decode: (base64) => {
      const buf = Buffer.from(base64.slice(1), "base64").slice(3, -4);
      check_length(Buffer.from(buf), 32);
      return buf;
    },
  },
  "Signature": {
    decode: (base64) => Buffer.from(base64, "base64"),
    encode: (buf) => Buffer.from(buf).toString("base64"),
  },
  "Digest": {
    decode: (base64) => multihash.decode(Buffer.from(base64, "base64")).digest,
    encode: (data) => {
      let buf = data;
      if (!Buffer.isBuffer(data)) {
        buf = Buffer.from(typeof data === "string" ? data : SerializeJSON(data));
      }
      return Buffer.from(multihash.encode(buf, "sha2-256")).toString("base64");
    },
  },
};

module.exports = {
  KeyManager,
  deriveSeedFrom,
  Codec,
  HHT,
};