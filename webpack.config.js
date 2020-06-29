const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash:8].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', 'tsx'],
    alias: {
      '@/*': path.resolve(__dirname, '../src/*'),
    },
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    contentBase: './dist',
    // progress:true, // 已废弃的API，将只能用于控制台
    host: 'localhost',
    port: 3000,
  },
};
