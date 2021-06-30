'use strict';
var Benchmark = require('benchmark');
var clc = require('cli-color');
var tinyMsgpack = require('../.');
var msgpackLite = require('msgpack-lite');
var msgpack = require('msgpack');
Benchmark.options.maxTime = 1;
var data = {
	boolean: true,
	undefined: undefined,
	null: null,
	integer: [25, -20, 250, 60000, 100000, -100, -30000, -60000],
	float: [0.5, 0.3, 0.25, 1.5e40, -1.5e40, 0.57, 1.2, Infinity],
	tinyString: 'foo bar.',
	smallString: repeat('foo bar.', 8),
	mediumString: repeat('foo bar.', 64),
	largeString: repeat('foo bar.', 9000),
	smallBinary: new Uint8Array(64).fill(0x77),
	mediumBinary: new Uint8Array(512).fill(0x77),
	largeBinary: new Uint8Array(72000).fill(0x77),
	tinyArray: new Array(8).fill([]),
	mediumArray: new Array(512).fill([]),
	largeArray: new Array(72000).fill([]),
	tinyObject: {a: {a: {a: {a: {a: {a: {a: {}}}}}}}}
};
var buffers = (function () {
	var ret = {};
	for (var key in data) {
		ret[key] = msgpack.pack(data[key]);
	}
	return ret;
}());

Object.keys(data).forEach(function (key) {
	benchmark(key);
});

function benchmark(key) {
	var suite1 = new Benchmark.Suite;
	suite1.add('tiny-msgpack encode ' + key, (function (value) {
		return function () {tinyMsgpack.encode(value);}
	}(data[key])));
	suite1.add('msgpack-lite encode ' + key, (function (value) {
		return function () {msgpackLite.encode(value);}
	}(data[key])));
	suite1.on('cycle', function (ev) {
		console.log(String(ev.target));
	});
	suite1.on('complete', function() {
		console.log(clc.cyan('Fastest is ' + this.filter('fastest').map('name').toString().replace(/\s.*/, '')));
	});
	
	var suite2 = new Benchmark.Suite;
	suite2.add('tiny-msgpack decode ' + key, (function (value) {
		return function () {tinyMsgpack.decode(value);}
	}(buffers[key])));
	suite2.add('msgpack-lite decode ' + key, (function (value) {
		return function () {msgpackLite.decode(value);}
	}(buffers[key])));
	suite2.on('cycle', function (ev) {
		console.log(String(ev.target));
	});
	suite2.on('complete', function() {
		console.log(clc.cyan('Fastest is ' + this.filter('fastest').map('name').toString().replace(/\s.*/, '')));
	});
	suite1.run();
	suite2.run();
}

function repeat(string, n) {
	var ret = '';
	while (n--) {
		ret += string;
	}
	return ret;
}
