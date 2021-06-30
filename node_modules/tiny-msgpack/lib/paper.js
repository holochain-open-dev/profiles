'use strict';
var BufferUtil = require('./buffer-util');
var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;

var Paper = function (codec) {
	this.codec = codec;
};
Paper.prototype.push = function (chunk) {
	var buffers = this.buffers || (this.buffers = []);
	buffers.push(chunk);
};
Paper.prototype.read = function () {
	this.flush();
	var buffers = this.buffers;
	if (buffers) {
		var chunk = buffers.length > 1 ? BufferUtil.concat(buffers) : buffers[0];
		buffers.length = 0;
		return chunk;
	}
};
Paper.prototype.flush = function () {
	if (this.start < this.offset) {
		this.push(BufferUtil.subarray(this.buffer, this.start, this.offset));
		this.start = this.offset;
	}
};
Paper.prototype.reserve = function (length) {
	if (!this.buffer) {
		return this.alloc(length);
	}
	var size = this.buffer.byteLength;
	// Does it need to be resized?
	if (this.offset + length > size) {
		// Flush current buffer.
		this.offset && this.flush();
		// Resize it to 2x current length.
		this.alloc(Math.max(length, Math.min(size * 2, MAX_BUFFER_SIZE)));
	}
};
Paper.prototype.alloc = function (length) {
	this.setBuffer(new Uint8Array(Math.max(length, MIN_BUFFER_SIZE)));
};
Paper.prototype.setBuffer = function (buffer) {
	this.buffer = buffer;
	this.offset = 0;
	this.start = 0;
};
Paper.prototype.send = function (buffer) {
	var end = this.offset + buffer.byteLength;
	if (this.buffer && end <= this.buffer.byteLength) {
		this.buffer.set(buffer, this.offset);
		this.offset = end;
	} else {
		this.flush();
		this.push(buffer);
	}
};
module.exports = Paper;
