'use strict';

// The given argument must be an array of Uint8Arrays.
exports.concat = function (buffers) {
	var bufferCount = buffers.length;
	var totalLength = 0;
	for (var i=0; i<bufferCount; ++i) {
		totalLength += buffers[i].byteLength;
	}
	var output = new Uint8Array(totalLength);
	var offset = 0;
	for (var i=0; i<bufferCount; ++i) {
		var buffer = buffers[i];
		output.set(buffer, offset);
		offset += buffer.byteLength;
	}
	return output;
};

// The first argument must be a Uint8Array.
// Start and end indices will be clamped to the range of the given Uint8Array.
exports.subarray = function (buffer, start, end) {
	start = Math.min(Math.max(0, start), buffer.byteLength);
	return new Uint8Array(buffer.buffer,
		buffer.byteOffset + start,
		Math.min(Math.max(start, end), buffer.byteLength) - start
	);
};
