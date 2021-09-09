'use strict';
var BufferUtil = require('./lib/buffer-util');

BufferUtil.toString = function (buffer, start, end) {
	return Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
		.toString('utf8', start, end);
};
BufferUtil.fromString = function (string) {
	var buffer = Buffer.from(string);
	return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
};

module.exports = require('./lib/msgpack');
