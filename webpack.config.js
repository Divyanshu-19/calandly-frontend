const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        utilityVendor: {
          test: /[\\/]node_modules[\\/](axios)[\\/]/,
          name: "utilityVendor",
        },
        bootstrapVendor: {
          test: /[\\/]node_modules[\\/](bootstrap|react-bootstrap-icons|jquery|popper.js)[\\/]/,
          name: "bootstrapVendor",
        },
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-scripts)[\\/]/,
          name: "reactVendor",
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!axios)(!bootstrap)(!react-bootstrap-icons)(!jquery)(!popper.js)(!react)(!react-dom)(!react-router-dom)(!react-scripts)[\\/]/,
          name: "vendors",
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new Dotenv({
      systemvars: true,
    }),
    // new webpack.DefinePlugin({
    //   "process.env.REACT_APP_URL": JSON.stringify("http://localhost:8000"),
    // }),
    // new webpack.EnvironmentPlugin(["REACT_APP_URL"]),
  ],

  mode: "production",
};