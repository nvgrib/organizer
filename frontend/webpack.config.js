// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const BundleTracker  = require('webpack-bundle-tracker');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    library: "main"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
    ]
  },

  plugins: [

  ],

  devtool: "source-map",

  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    poll: 1000,
  }
};