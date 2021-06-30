'use strict';

exports.type = function (encoder, type) {
	encoder.reserve(1);
	encoder.buffer[encoder.offset++] = type;
};
exports.int8 = function (encoder, type, value) {
	encoder.reserve(2);
	var buffer = encoder.buffer;
	buffer[encoder.offset++] = type;
	buffer[encoder.offset++] = value;
};
exports.int16 = function (encoder, type, value) {
	encoder.reserve(3);
	var buffer = encoder.buffer;
	buffer[encoder.offset++] = type;
	buffer[encoder.offset++] = value >>> 8;
	buffer[encoder.offset++] = value;
};
exports.int32 = function (encoder, type, value) {
	encoder.reserve(5);
	var buffer = encoder.buffer;
	buffer[encoder.offset++] = type;
	buffer[encoder.offset++] = value >>> 24;
	buffer[encoder.offset++] = value >>> 16;
	buffer[encoder.offset++] = value >>> 8;
	buffer[encoder.offset++] = value;
};
exports.float32 = function (encoder, value) {
	encoder.reserve(5);
	var buffer = encoder.buffer;
	buffer[encoder.offset++] = 0xca;
	new DataView(buffer.buffer).setFloat32(buffer.byteOffset + encoder.offset, value);
	encoder.offset += 4;
};
exports.float64 = function (encoder, value) {
	encoder.reserve(9);
	var buffer = encoder.buffer;
	buffer[encoder.offset++] = 0xcb;
	new DataView(buffer.buffer).setFloat64(buffer.byteOffset + encoder.offset, value);
	encoder.offset += 8;
};
