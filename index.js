const path = require("path");
const {
  addBeforeLoader,
  loaderByName,
  getLoader,
  throwUnexpectedConfigError,
} = require("@craco/craco");

// Detect watch
// <https://github.com/purescript/spago#get-started-from-scratch-with-webpack-frontend-projects>
const isWatch = process.argv.some((a) => a === "--watch");
const isWebpackDevServer = process.argv.some(
  (a) => path.basename(a) === "webpack-dev-server"
);

const throwError = (message, githubIssueQuery) =>
  throwUnexpectedConfigError({
    packageName: "craco-purescript-loader",
    githubRepo: "andys8/craco-purescript-loader",
    message,
    githubIssueQuery,
  });

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    // Resolve purescript extension
    if (
      !webpackConfig ||
      !webpackConfig.resolve ||
      !webpackConfig.resolve.extensions ||
      typeof webpackConfig.resolve.extensions !== "object"
    ) {
      throwError("No valid webpackConfig.resolve.extensions");
    }
    webpackConfig.resolve.extensions.push(".purs");

    // Allow imports outside of `src` folder for purescript dependencies
    if (
      !webpackConfig ||
      !webpackConfig.resolve ||
      !webpackConfig.resolve.plugins ||
      typeof webpackConfig.resolve.plugins !== "object"
    ) {
      throwError("No valid webpackConfig.resolve.plugins");
    }
    webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
      ({ constructor }) =>
        !constructor || constructor.name !== "ModuleScopePlugin"
    );

    // PureScript loader
    const defaultOptions = {
      spago: true,
      watch: isWebpackDevServer || isWatch,
    };
    const pursLoader = {
      test: /\.purs$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "purs-loader",
          options: Object.assign({}, defaultOptions, pluginOptions),
        },
      ],
    };

    // Append purs-loader before file-loader
    const babelLoader = loaderByName("babel-loader");
    const { isFound } = getLoader(webpackConfig, babelLoader);
    if (!isFound) {
      throwError("Didn't find expected 'babel-loader'");
    }
    addBeforeLoader(webpackConfig, babelLoader, pursLoader);
    return webpackConfig;
  },
};
