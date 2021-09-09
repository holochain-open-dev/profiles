# is-valid-element-name

[![Build Status](https://travis-ci.org/matthewp/is-valid-element-name.svg?branch=master)](https://travis-ci.org/matthewp/is-valid-element-name)
[![npm version](https://badge.fury.io/js/is-valid-element-name.svg)](http://badge.fury.io/js/is-valid-element-name)


Determines if an string is a valid element name. Like [validate-element-name](https://github.com/sindresorhus/validate-element-name) but without opinions on what a custom element name should be.

Backed by [is-potential-custom-element-name](https://github.com/mathiasbynens/is-potential-custom-element-name) which does the heavy lifting, but also checks against reserved names.

## Install

```
npm install is-valid-element-name --save
```

## Use

```js
var isValidElementName = require("is-valid-element-name");

isValidElementName("hello-world"); // -> true
isValidElementName("div"); // -> false
isValidElementName("f0_0_0-what"); // -> true

// This is a reserved name.
isvalidElementName("font-face"); // -> false
```

## License

BSD 2 Clause
