const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = relativePath => {
  return path.resolve(__dirname, '..', relativePath);
};

const baseStyleLoader = ['style-loader', 'css-loader', 'postcss-loader'];

module.exports = {
  mode: 'development',

  entry: resolve('src/index.js'),

  output: {
    path: resolve('build'),
    filename: 'bundle.[hash:8].js',
    chunkFilename: 'thunk.[thunkhash:8].js',
    publicPath: '/',
  },

  resolve: {
    // 如果写 则必须包含'.js' 否则会找不到部分库文件
    extensions: ['.js', '.tx', '.tsx'],
    alias: {
      '@/*': resolve('src/*'),
    },
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        // 处理图片文件，推荐使用url-loader,  url和file 这两个loader 不能组合使用
        test: /\.(png|jpg|jpeg|gif|svg|bmp|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400 * 5,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // 处理字体文件，使用  url-loader 和 file-loader 效果都一样的
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font.[hash:6].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false,
        removeAttributeQuotes: false,
      },
    }),
  ],

  devServer: {
    // progress:true, // 已废弃的API，将只能用于控制台
    contentBase: resolve('dist'),
    host: 'localhost',
    port: 3000,
    hot: true,
    open: false,
    compress: false,
    stats: {
      modules: false,
      debug: false,
      colors: true,
    },
    historyApiFallback: true,
    // proxy: {}
  },
};
