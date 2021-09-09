'use strict';
var BufferUtil = require('./buffer-util');
var decode = require('./decode');

var map = function (decoder, len) {
	var value = {};
	for (var i=0; i<len; ++i) {
		value[decode(decoder)] = decode(decoder);
	}
	return value;
};

var array = function (decoder, len) {
	var value = new Array(len);
	for (var i=0; i<len; ++i) {
		value[i] = decode(decoder);
	}
	return value;
};

var str = function (decoder, len) {
	var start = decoder.offset;
	var end = decoder.offset = start + len;
	if (end > decoder.buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return BufferUtil.toString(decoder.buffer, start, end);
};

var bin = function (decoder, len) {
	var start = decoder.offset;
	var end = decoder.offset = start + len;
	if (end > decoder.buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return BufferUtil.subarray(decoder.buffer, start, end);
};

var ext = function (decoder, len) {
	var start = decoder.offset;
	var end = decoder.offset = start + len + 1;
	if (end > decoder.buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	var etype = decoder.buffer[start];
	var unpacker;
	if (decoder.codec && (unpacker = decoder.codec._unpackerFor(etype))) {
		return unpacker(BufferUtil.subarray(decoder.buffer, start + 1, end));
	}
	throw new Error('Unrecognized extension type: ' + (etype ? ('0x' + etype.toString(16)) : etype));
};

var uint8 = function (decoder) {
	var buffer = decoder.buffer;
	if (decoder.offset >= buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return buffer[decoder.offset++];
};

var uint16 = function (decoder) {
	var buffer = decoder.buffer;
	if (decoder.offset + 2 > buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return (buffer[decoder.offset++] << 8) | buffer[decoder.offset++];
};

var uint32 = function (decoder) {
	var buffer = decoder.buffer;
	if (decoder.offset + 4 > buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return (buffer[decoder.offset++] * 0x1000000) +
		((buffer[decoder.offset++] << 16) |
		(buffer[decoder.offset++] << 8) |
		buffer[decoder.offset++]);
};

var int8 = function (decoder) {
	var val = uint8(decoder);
	return !(val & 0x80) ? val : (0xff - val + 1) * -1;
};

var int16 = function (decoder) {
	var val = uint16(decoder);
	return (val & 0x8000) ? val | 0xFFFF0000 : val;
};

var int32 = function (decoder) {
	var buffer = decoder.buffer;
	if (decoder.offset + 4 > buffer.byteLength) throw new RangeError('BUFFER_SHORTAGE');
	return (buffer[decoder.offset++] << 24) |
		(buffer[decoder.offset++] << 16) |
		(buffer[decoder.offset++] << 8) |
		buffer[decoder.offset++];
};

var float32 = function (decoder) {
	var buffer = decoder.buffer;
	var offset = decoder.offset;
	decoder.offset += 4;
	return new DataView(buffer.buffer).getFloat32(buffer.byteOffset + offset);
};

var float64 = function (decoder) {
	var buffer = decoder.buffer;
	var offset = decoder.offset;
	decoder.offset += 8;
	return new DataView(buffer.buffer).getFloat64(buffer.byteOffset + offset);
};

module.exports = {
	map: map,
	array: array,
	str: str,
	bin: bin,
	ext: ext,
	uint8: uint8,
	uint16: uint16,
	uint32: uint32,
	int8: int8,
	int16: int16,
	int32: int32,
	float32: float32,
	float64: float64
};
