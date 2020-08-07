# Craco purescript-loader

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is a [craco](https://github.com/gsoft-inc/craco) plugin to add [purs-loader](https://www.npmjs.com/package/purs-loader) for [PureScript](https://www.purescript.org) with [`create-react-app`](https://facebook.github.io/create-react-app). It allows you to use PureScript code in `create-react-app` without ejecting.

## Installation

```shell
npm install craco-purescript-loader --save-dev
```

or

```shell
yarn add -D craco-purescript-loader
```

## Usage

```js
const cracoPureScriptLoader = require("craco-purescript-loader");
module.exports = {
  plugins: [{ plugin: cracoPureScriptLoader }],
};
```

`craco-purescript-loader` expect a `options` to overwrite `purs-loader` options.
See <https://www.npmjs.com/package/purs-loader#options>

```js
const cracoPureScriptLoader = require("craco-purescript-loader");

module.exports = {
  plugins: [
    {
      plugin: cracoPureScriptLoader,
      options: {
        spago: true,
        pscIde: true,
      },
    },
  ],
};
```
