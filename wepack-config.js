const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: process.cwd();
  entry: "./public/scripts/index.js",
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};
