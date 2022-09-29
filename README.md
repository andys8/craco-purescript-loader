# Craco purescript-loader

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is a [craco](https://github.com/gsoft-inc/craco) plugin to add [purs-loader](https://www.npmjs.com/package/purs-loader) with [`create-react-app`](https://facebook.github.io/create-react-app).

It allows you to use [PureScript](https://www.purescript.org) code in `create-react-app` without ejecting.

## Installation

```bash
npm install craco-purescript-loader --save-dev
# or
yarn add -D craco-purescript-loader
```

## Usage

```js
const cracoPureScriptLoader = require("craco-purescript-loader");

module.exports = {
  plugins: [{ plugin: cracoPureScriptLoader }],
};
```

### Overwrite Options

`craco-purescript-loader` configuration `options` will overwrite [`purs-loader` options](https://www.npmjs.com/package/purs-loader#options).

```js
const cracoPureScriptLoader = require("craco-purescript-loader");

module.exports = {
  plugins: [
    {
      plugin: cracoPureScriptLoader,
      options: {
        spago: true,
        pscIde: false,
      },
    },
  ],
};
```

## Example

[Example `create-react-app` project with PureScript](https://github.com/andys8/create-react-app-purescript) using `craco` and this plugin.

## Alternative

An alternative to using craco is to [import the PureScript compiler output directly](https://github.com/purescript/spago/#get-started-from-scratch-with-webpack-frontend-projects).

Or use vite, esbuild or parcel instead of create-react-app.
