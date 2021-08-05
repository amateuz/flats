const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new FriendlyErrorsWebpackPlugin()],
  },
};
