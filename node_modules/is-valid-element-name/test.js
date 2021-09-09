var assert = require("assert");
var v = require("./index.js");

describe("reserved names", function(){
  var names = [
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-src",
    "font-face-uri",
    "font-face-format",
    "font-face-name",
    "missing-glyph"
  ];

  it("returns false", function(){
    names.forEach(function(name){
      assert.equal(v(name), false, "reserved names are invalid");
    });
  });
});

describe("names without a -", function(){
  var names = [
    "foo",
    "bar",
    "div"
  ];

  it("returns false", function(){
    names.forEach(function(name){
      assert.equal(v(name), false, "without a - are false");
    });
  });
});

describe("valid names", function(){
  var names = [
    "foo-bar",
    "date-widget",
    "a_2-foo"
  ];

  it("returns true", function(){
    names.forEach(function(name){
      assert.equal(v(name), true, "this is a valid name");
    });
  });
});
