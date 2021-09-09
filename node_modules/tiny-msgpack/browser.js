'use strict';
var BufferUtil = require('./lib/buffer-util');
var decoder = new TextDecoder;
var encoder = new TextEncoder;

BufferUtil.toString = function (buffer, start, end) {
	return decoder.decode(BufferUtil.subarray(buffer, start, end));
};
BufferUtil.fromString = function (string) {
	return encoder.encode(string);
};

module.exports = require('./lib/msgpack');
