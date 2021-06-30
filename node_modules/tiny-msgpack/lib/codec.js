'use strict';
function Codec() {
	if (!(this instanceof Codec)) {
		throw new TypeError('Codecs must be constructed with the "new" keyword.');
	}
	this._packers = [];
	this._packerClasses = [];
	this._unpackers = {};
}
Codec.prototype.register = function (etype, Class, packer, unpacker) {
	if (Array.isArray(packer)) {
		packer = join(packer);
	}
	if (Array.isArray(unpacker)) {
		unpacker = join(unpacker);
	}
	if (~~etype !== etype || !(etype >= 0 && etype < 128)) {
		throw new TypeError('Invalid extension type (must be between 0 and 127).');
	}
	if (typeof Class !== 'function') {
		throw new TypeError('Expected second argument to be a constructor function.');
	}
	this._packers.push(function (value) {
		var buffer = packer(value);
		if (!(buffer instanceof Uint8Array)) {
			throw new TypeError('Codec must return a Uint8Array (encoding "' + Class.name + '").');
		}
		return new ExtensionBuffer(buffer, etype);
	});
	this._packerClasses.push(Class);
	this._unpackers[etype] = unpacker;
	return this;
};
Codec.prototype._packerFor = function (value) {
	return getPacker(value.constructor, this._packerClasses, this._packers);
};
Codec.prototype._unpackerFor = function (etype) {
	return this._unpackers[etype];
};
module.exports = Codec;

// This is isolated for optimization purposes.
var getPacker = function (constructor, classes, packers) {
	for (var i=0, len=classes.length; i<len; ++i) {
		if (constructor === classes[i]) {
			return packers[i];
		}
	}
};

var join = function (filters) {
	filters = filters.slice();
	var iterator = function (value, filter) {
		return filter(value);
	};
	return function (value) {
		return filters.reduce(iterator, value);
	};
};

var ExtensionBuffer = function (buffer, etype) {
	this.buffer = buffer;
	this.etype = etype;
};
