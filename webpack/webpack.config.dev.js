const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const resolve = relativePath => {
  return path.resolve(__dirname, '..', relativePath);
};

module.exports = {
  mode: 'development',

  entry: resolve('src/index.js'),

  output: {
    path: resolve('build'),
    filename: 'js/[id].[hash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js',
    publicPath: '/', // 不能使用  ./ 否则会导致css文件无法插入同时浏览器会报错
  },

  resolve: {
    // 如果写 则必须包含'.js' 否则会找不到部分库文件
    extensions: ['.tx', '.tsx', '.js'],
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
        // 如果需要处理HTML文件中的图片引入，则需要使用  html-withimg-loader
        test: /\.(png|jpg|jpeg|gif|svg|bmp|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 超过10k使用外链，否则使用base64编码
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
              name: 'font.[hash:8].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
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

  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      automaticNameDelimiter: '~', // 命名分隔符
      cacheGroups: {
        default: {
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10, // 确定模块打入的优先级
          reuseExistingChunk: true, // 使用复用已经存在的模块
          enforce: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd/,
          name: 'antd',
          priority: 15,
          reuseExistingChunk: true,
        },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts/,
          name: 'echarts',
          priority: 16,
          reuseExistingChunk: true,
        },
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom/,
          name: 'reactDom',
          priority: 18,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: 'react',
          priority: 18,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 热更新时打印文件名称而不是 文件的id  根据需要使用
    new webpack.ProgressPlugin(), // 使用这个插件，可以不用在启动命令中添加 --progress
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('build')],
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:3000`],
      },
    }),
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
    contentBase: resolve('dist'),
    host: 'localhost',
    port: 3000,
    hot: true,
    open: false,
    compress: false,
    overlay: true,
    quiet: true, // 使用  friendly-errors-webpack-plugin 时需要打开
    stats: {
      modules: false,
      debug: false,
      colors: true,
    },
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:8008', // 将所有包含 /ap/ 请求路径的请求代理的 8008端口
        // pathRewrite: {"^/api" : ""}  // 如果后端的请求路径不包含 /api/， 则转发的时候去掉 /api/
      },
    },
    // 可以引入其它文件以及路径mock数据
    before(app) {
      app.get('/api/user', (req, res) => {
        res.json({ name: '张三', age: 24, address: '广顺南大街' });
      });
    },
  },
};
