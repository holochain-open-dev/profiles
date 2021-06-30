'use strict';
var msgpack = require('../.');
var expect = require('chai').expect;

var codec = new msgpack.Codec;
codec.register(0x42, Date, function (date) {
	return msgpack.encode(+date);
}, function (buffer) {
	return new Date(msgpack.decode(buffer));
}).register(0x43, Error, function (error) {
	return msgpack.encode(error.message);
}, function (buffer) {
	return new Error(msgpack.decode(buffer));
}).register(0x44, AggregateError, function (aggErrors) {
	return msgpack.encode(aggErrors.errors, codec);
}, function (buffer) {
	return new AggregateError(msgpack.decode(buffer, codec));
});

function AggregateError(errors) {
	this.errors = errors;
}

describe('msgpack.Codec', function () {
	specify('Date', function () {
		var date = new Date;
		new Uint8Array(0xfffff).fill(0x77); // take up time
		var date2 = msgpack.decode(msgpack.encode(date, codec), codec);
		expect(date2).to.be.an.instanceof(Date);
		expect(+date).to.equal(+date2);
	});
	specify('Error', function () {
		var err = new Error('foobar');
		var err2 = msgpack.decode(msgpack.encode(err, codec), codec);
		expect(err2).to.be.an.instanceof(Error);
		expect(err.message).to.equal(err2.message);
	});
	specify('AggregateError', function () {
		var errs = [new Error('foo'), new Error('bar'), new Error('baz')];
		var errs2 = msgpack.decode(msgpack.encode(errs, codec), codec);
		expect(errs2).to.be.an.instanceof(Array);
		expect(errs.length).to.equal(errs2.length);
		expect(errs2[0]).to.be.an.instanceof(Error);
		expect(errs2[1]).to.be.an.instanceof(Error);
		expect(errs2[2]).to.be.an.instanceof(Error);
		expect(errs).to.deep.equal(errs2);
	});
});
