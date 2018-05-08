const HtmlWebPackPlugin = require("html-webpack-plugin");

//const htmlPlugin = new HtmlWebPackPlugin({
 // template: "./public/views/index.ejs",
  //filename: "./index.ejs"
//});

module.exports = {
  entry: {
    index: "./public/scripts/index.js"
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
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  }//,
  //plugins: [htmlPlugin]
};
