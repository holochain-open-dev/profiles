'use strict';
var encode = require('../.').encode;
var officialEncode = require('msgpack').pack;
var officialDecode = require('msgpack').unpack;
var util = require('util');
var expect = require('chai').expect;

function expectToEqualOfficial(value, expectedBytes) {
	var encoded = encode(value);
	expect(encoded).to.be.an.instanceof(Uint8Array);
	expect(encoded).to.not.be.an.instanceof(Buffer);
	if (encoded.byteLength !== expectedBytes) {
		throw new Error('\nExpected ' + value + ' to encode to ' + expectedBytes + ' bytes, not ' + encoded.byteLength + '.');
	}
	var officialEncoded = officialEncode(value);
	if (!Buffer.from(encoded).equals(officialEncoded)) {
		throw new Error(util.format('\nExpected:\n', officialEncoded, '\nInstead got:\n', Buffer.from(encoded)));
	}
}

function expectToBeUnderstoodByOfficial(value, expectedBytes) {
	var encoded = encode(value);
	expect(encoded).to.be.an.instanceof(Uint8Array);
	expect(encoded).to.not.be.an.instanceof(Buffer);
	if (encoded.byteLength !== expectedBytes) {
		throw new Error('\nExpected ' + value + ' to encode to ' + expectedBytes + ' bytes, not ' + encoded.byteLength + '.');
	}
	expect(officialDecode(Buffer.from(encoded))).to.deep.equal(value);
}

function stringOf(length) {
	var str = '';
	while (str.length < length) {str += 'x';}
	return str;
}

function objectOf(keyCount) {
	var obj = {};
	for (var i=0; i<keyCount; ++i) {obj[-1000000 - i] = true;}
	return obj;
}

describe('msgpack.encode()', function () {
	this.timeout(5000);
	this.slow(5000);
	specify('null', function () {
		expectToEqualOfficial(null, 1);
	});
	specify('undefined', function () {
		expectToEqualOfficial(undefined, 1);
	});
	specify('boolean', function () {
		expectToEqualOfficial(true, 1);
		expectToEqualOfficial(false, 1);
	});
	specify('fixint', function () {
		expectToEqualOfficial(0, 1);
		expectToEqualOfficial(127, 1);
		expectToEqualOfficial(-1, 1);
		expectToEqualOfficial(-32, 1);
	});
	specify('uint', function () {
		expectToEqualOfficial(128, 2);
		expectToEqualOfficial(255, 2);
		expectToEqualOfficial(256, 3);
		expectToEqualOfficial(65535, 3);
		expectToEqualOfficial(65536, 5);
		expectToEqualOfficial(4294967295, 5);
	});
	specify('int', function () {
		expectToEqualOfficial(-33, 2);
		expectToEqualOfficial(-128, 2);
		expectToEqualOfficial(-129, 3);
		expectToEqualOfficial(-32768, 3);
		expectToEqualOfficial(-32769, 5);
		expectToEqualOfficial(-2147483648, 5);
	});
	specify('float', function () {
		expectToBeUnderstoodByOfficial(4294967296, 5);
		expectToBeUnderstoodByOfficial(-2147483904, 5);
		expectToBeUnderstoodByOfficial(0.5, 5);
		expectToBeUnderstoodByOfficial(0.25, 5);
		expectToBeUnderstoodByOfficial(-0.5, 5);
		expectToBeUnderstoodByOfficial(-0.25, 5);
		expectToBeUnderstoodByOfficial(4e39, 9);
		expectToBeUnderstoodByOfficial(-4e39, 9);
		expectToEqualOfficial(0.3, 9);
		expectToEqualOfficial(-0.3, 9);
	});
	specify('string', function () {
		expectToEqualOfficial('', 1);
		expectToEqualOfficial('x', 2);
		expectToEqualOfficial(stringOf(31), 32);
		expectToEqualOfficial(stringOf(32), 34);
		expectToEqualOfficial(stringOf(255), 257);
		expectToEqualOfficial(stringOf(256), 259);
		expectToEqualOfficial(stringOf(65535), 65538);
		expectToEqualOfficial(stringOf(65536), 65541);
	});
	specify('binary', function () {
		expectToEqualOfficial(new Uint8Array(0).fill(0x77), 2);
		expectToEqualOfficial(new Uint8Array(1).fill(0x77), 3);
		expectToEqualOfficial(new Uint8Array(31).fill(0x77), 33);
		expectToEqualOfficial(new Uint8Array(32).fill(0x77), 34);
		expectToEqualOfficial(new Uint8Array(255).fill(0x77), 257);
		expectToEqualOfficial(new Uint8Array(256).fill(0x77), 259);
		expectToEqualOfficial(new Uint8Array(65535).fill(0x77), 65538);
		expectToEqualOfficial(new Uint8Array(65536).fill(0x77), 65541);
	});
	specify('array', function () {
		expectToEqualOfficial(new Array(0).fill(true), 1);
		expectToEqualOfficial(new Array(1).fill(true), 2);
		expectToEqualOfficial(new Array(15).fill(true), 16);
		expectToEqualOfficial(new Array(16).fill(true), 19);
		expectToEqualOfficial(new Array(255).fill(true), 258);
		expectToEqualOfficial(new Array(256).fill(true), 259);
		expectToEqualOfficial(new Array(65535).fill(true), 65538);
		expectToEqualOfficial(new Array(65536).fill(true), 65541);
	});
	specify('object', function () {
		expectToEqualOfficial({}, 1);
		expectToEqualOfficial({0: true}, 3);
		expectToEqualOfficial({127: true}, 3);
		expectToEqualOfficial({128: true}, 4);
		expectToEqualOfficial({255: true}, 4);
		expectToEqualOfficial({256: true}, 5);
		expectToEqualOfficial({'-1': true}, 5);
		expectToEqualOfficial({'0.5': true}, 6);
		expectToEqualOfficial({'': true}, 3);
		expectToEqualOfficial({'foo': true}, 6);
		expectToEqualOfficial({'foo': true}, 6);
		expectToEqualOfficial(objectOf(15), 1 + 15 * 10);
		expectToEqualOfficial(objectOf(16), 3 + 16 * 10);
		expectToEqualOfficial(objectOf(65535), 3 + 65535 * 10);
		expectToEqualOfficial(objectOf(65536), 5 + 65536 * 10);
	});
	specify('symbol', function () {
		Buffer.from(encode(Symbol())).equals(Buffer.from(encode(null)));
	});
	specify('function', function () {
		Buffer.from(encode(function () {})).equals(Buffer.from(encode(null)));
	});
});
