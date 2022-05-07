const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const isDev = mode == "development";

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: mode,
  entry: "./src/index.tsx",
  devtool: "cheap-source-map",
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      cache: true,
      minify: !isDev,
      title: "React App", // TODO Change it to take arguments from the build script or env or config file
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          "babel-loader",
        ],
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
      },
      {
        test: /.(scss|css)$/,
        // loaders loaded bottom to top in order i.e sass-loader at first , style-loader is last
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-modules-typescript-loader",
            options:{
              banner : "// This file is automatically generated by typings-for-css-modules.\n// Please do not change this file!"
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
              modules: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },

    ],
  },

  resolve: {
    extensions: ["css", "scss", ".tsx", ".ts", ".js"],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[/\\]node_modules[/\\]/,
        },
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "build"),
    publicPath: "/",
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "./build"),
    },
    devMiddleware: {
      writeToDisk: true
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};
