const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const resolve = str => {
  return path.resolve(__dirname, '..', str);
};

module.exports = {
  mode: 'development',

  entry: resolve('src/index.tsx'),

  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          // {
          //     loader: 'babel-loader',
          //     options: {
          //     presets: ['@babel/env', '@babel/react'],
          //     },
          // },
          'ts-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      '@/': resolve('src'),
    },
    // modules: ['node_modules', 'src'],
  },

  optimization: {
    minimize: false,
    removeEmptyChunks: true,
    runtimeChunk: {
      name: 'runtime',
    },
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 100000,
    //   maxSize: 50000000,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   cacheGroups: {
    //     vendor: {
    //       test: /node_modules/,
    //       priority: -10,
    //       name: 'vendor',
    //     },
    //   },
    // },
  },

  devServer: {
    contentBase: resolve('dist'),
    // clientLogLevel: 'warning',
    host: 'localhost',
    port: 3000,
    hot: true,
    quiet: false,
    compress: false,
    overlay: true,
    // open:true,
    stats: { colors: true, debug: true, chunks: false },
    // historyApiFallback: true,
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:8008',
    //   },
    // },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new FriendlyErrorsPlugin({
    //   compilationSuccessInfo: {
    //     notes: ['compilation Success!'],
    //     messages: ['Your application is running here: http://localhost:3000'],
    //   },
    // }),
    new HtmlWebpackPlugin({
      // 编译时使用的模板
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
