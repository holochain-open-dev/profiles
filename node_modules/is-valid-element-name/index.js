var isPCEN = require("is-potential-custom-element-name");

module.exports = isValidCustomElementName;

var reservedNames = [
  "annotation-xml",
  "color-profile",
  "font-face",
  "font-face-src",
  "font-face-uri",
  "font-face-format",
  "font-face-name",
  "missing-glyph"
].reduce(function(map, name) {
  map[name] = true;
  return map;
}, {});

function isValidCustomElementName(name) {
  return isPCEN(name) && !reservedNames[name];
}

