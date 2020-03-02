const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  const isProduction = env === "production";
  const MiniCssExtract = new MiniCssExtractPlugin({ filename: "style.css" });
  return {
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
          use: [
            MiniCssExtractPlugin.loader,
            // "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          test: /\.s?css$/
        }
      ]
    },
    plugins: [MiniCssExtract],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      // compress: true,
      port: 9000
    }
  };
};
