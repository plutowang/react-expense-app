const path = require("path");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.js"),
  // entry: path.resolve(__dirname, "src/playground/HOC.js"),
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.s?css$/
      }
    ]
  },
  devtool: "eval-cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    // compress: true,
    port: 9000
  }
};
