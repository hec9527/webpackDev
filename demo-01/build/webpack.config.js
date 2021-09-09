const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'production',

  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /.tsx?/,
        use: ['ts-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].[id].[contenthash:5].js',
    clean: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      env: "'production'",
    }),
    new webpack.ProgressPlugin(),
    new htmlWebpackPlugin({
      title: 'webpack插件测试',
      template: './src/index.html',
    }),
  ],
};
