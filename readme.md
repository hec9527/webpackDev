# webpack搭建脚手架

脚手架包括react、typescript、babel、antd、以及各种lint

## use

```shell
npm i
npm start
```

## loader

- `ts-loader`
- `style-loader`、 `css-loader`、 `postcss-loader`
- `file-loader`、 `url-loader`
- `sass-loader`
- `less-loader`

## 相关文档地址

- [postcss](https://github.com/postcss/postcss/blob/HEAD/`$1`.md)

- [create-react-app](https://create-react-app.dev/docs/getting-started/)

## 创建目录

```shell
mkdir demo && cd demo
```

## Git配置

### 初始化Git仓库

```shell
git init
```

### 配置git 添加 `.gitignore`

```shell
/node_modules
/public
```

## Npm配置

### 初始化Npm包

```shell
npm init
```

### npm依赖安装

#### webpack

```shell
npm i webpack webpack-cli webpack-dev-server -D
```

#### webpack插件

```shell
npm i html-webpack-plugin clean-webpack-plugin -D
```

#### 其它依赖

```shell
npm i cross-env source-map -D
```

#### babel依赖

```shell
npm i babel-loader @babel/core @babel/preset-react @babel/preset-env -D
```

#### 基础依赖

```shell
npm i react react-dom redux react-redux react-router typescript ts-lint -S
```

#### 安装UI框架

```shell
npm i antd -S
```

### 安装注解依赖

```shell
npm i @types/node @types/react @types/react-dom @types/react-redux @types/react-router-dom -S
```

说明：

- `@types/node:` nodejs的模块申明文件

### 安装loader

```shell
npm i babel-loader ts-loader style-loader css-loader file-loader -s
```

说明：

- `loader`的加载顺序为倒叙加载
- 同一种资源的不同loader需要注意顺序，`style-loader` 就应该在 `css-loader` 前面，
- `style-loader` 将样式以Style 的形式插入的html文件中
- `css-loader` 以字符串形式读取样式
- `file-loader` 用于加载文字图片等资源，可以考虑替换成`url-loader`
- `csv-loader` `xml-loader`处理

### 全局安装

```shell
npm i eslint tslint typescript -g
```

说明：

- 根据需求灵活调节是否需要安装到全局

### typescript 配置初始化

```shell
tsc --init
```

#### `tsconfig.json`配置修改

```json
{
    "compilerOptions": {
        "target": "es5"                        /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
        "module": "es6"                        /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
        "allowJs": true,                       /* Allow javascript files to be compiled. */
        "jsx": "react"                         /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
        "sourceMap": true                      /* Generates corresponding '.map' file. */,
        "outDir": "./dist"                     /* Redirect output structure to the directory. */,
        "strict": true                         /* Enable all strict type-checking options. */,
        "noImplicitAny": true                  /* Raise error on expressions and declarations with an implied 'any' type. */,
        "esModuleInterop": true                /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
        "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
    }
}
// ts配置错误可能会导致项目无法运行
// 项目的source-map需要在tsconfig和webpack.config.json中同时配置
```

#### eslint

> 根据实际需要配置eslint，配置完成之后可以使用 `eslint src --ext .js`测试eslint是否配置成功，以及是否有依赖尚未安装

```shell
npm i eslint -g
eslint --init
```

### 代码格式化 创建文件`.prettierrc`

```shell
{
  "printWidth": 140,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### 创建项目目录

```shell
# 根据自己的习惯安排即可
 + public/
 + dist/
 + src/
    - actions/
    - api/
    - config/
    - reducer/
    - pages/
    - index.tsx
```

## 配置 `webpack`

### webpack核心概念

- entry
  - webpack打包的入口文件， 从这个文件开始构建依赖
- output
  - webpack输出文件，各种loader以及plugins处理之后的文件，根据这个配置输出到指定位置，名称
- loader
  - webpack只能加载JavaScript文件，处理其他文件需要用到各种loader
- plugin
  - 用于处理loader无法完成的工作， webpack就是基于插件构建的，大部分功能都是通过插件实现的

### entry - 入口

> 配置webpack打包的入口文件

```js
// 单文件形式
entry: {
    // 以下形式  保留一种
    index: "src/index.js",
    // about: ["src/index.js"],
    // other: {
    //     index: "src/index.js"
    // }
}
// 多文件形式
entry: {
    // 以下形式  可以同时保留
    index: ['src/index.js','src/app.js'],
    about: 'src/about.js',
    vendors: ['react', 'react-dom', 'redux', 'react-router', 'antd'] // 将公共模块单独作为一个入口打包
}
```

### output - 输出

> 规定了webpack 如何输出文件以及哪里输出等, 有以下几个属性

- `path`: 输出文件的目录
- `filename`: 输出文件名，一般和entry的配置相同，`js/[name].js`中的name表示入口的属性名
- `chunkFilename`: 非entry入口模块，自动拆分文件，按需加载，与路由中的`require.ensure`想呼应
- `publicPath`: 文件输出的公共路径
- `pathinfo`: 保留相互依赖的包中的注释信息，`mode`为`development`时为`true`, `production`时为`false`
- `library`
- `libraryTarget`
- `auxiliaryComment`

```js
output:{
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/static/', //  最终访问资源的路径  localhost:3000/static/js/xxxx.js
    // pathinfo: true
}
```

### hash

> hash值常用的有3中形式
>
> hash 长度默认为20，可以自定义长度[hash:8] [chunkhash:10]
>
> 除了hash以外还有，[ext] [name] 等属性

| hash类型      | 描述                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `hash`        | 模块标识符，一般用于`filename`                                                                               |
| `chunkhash`   | 按需加载块内容hash，根据chunk自身内容计算而来，每次更新内容都会导致chunkhash改变`js/[name].[chunkhash:8].js` |
| `contenthash` | 针对为文件内容级别，自己的文件内容改变了，hash值才会改变                                                     |

### mode - 打包模式

> weboack4 之后新增的内容，有3个可选值 `development`  `production`  `none`

- `development` 开发模式，打包的代码不会被压缩，开启代码调试
- `prodction` 生产模式，压缩代码，关闭调试

```js
 {
     mode: "production", // development  none
 }
```

### devtool - 开发工具

> 控制是否生成以及如何生成`source map`，可以帮助快速定位问题，但是会影响打包和编译速度， **生产模式一定记得关闭**

常用值：

- `source-map` 把映射文件生成到单独文件，最完整最慢
- `cheap-eval-source-map`  在单独的文件中产生一个不带列映射的map
- `eval-source-map`  使用`eval`打包源文件，在同一个文件中生成sourcemap
- `cheap-module-eval-source-map` sourcemap和打包后的js同行显示，没有映射列
- `inline-cheap-module-source-map` sourcemap和打包后的js同行显示，映射列

### optimization - 自定义配置

> 自定义优化构建打包策略

- `minimize`: 是否开启代码压缩
- `minimizer`: 自定义优化配置，压缩
- `removeEmptyChunks`: 检测并且删除空的块
- `nodeEnv`: 设置后可以使用process.env.NODE_ENV==='prodcution'来启用一些优化
- `splitChunks`: 自动分包拆分，默认只作用于异步代码，3个可选值`all`, `asycn`, `initial`

> splitChunks 默认配置

```js
splitChunks: {
  chunks: 'async',  // 自动拆分只作用于异步代码
  minSize: 30000,   // 每个块最低大小，小于30k则合并块
  maxSize: 0,     // 块大小  上限  不限制
  minChunks: 1,  // 最小块数量
  maxAsyncRequests: 5,   // 最大异步请求数量
  maxInitialRequests: 3,   // 最大页面初始请求数量
  automaticNameDelimiter: '~', // 打包分隔符
  name: 'thunk', // 打包后的名称，可以接受function 和string
  cacheGroups: {  // 分组缓存
    vendors: {
      test: /[\\/]node_modules[\\/]/,   // 控制哪些模块会被缓存组匹配
      chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async)
      name: "vendor", // 要缓存的 分隔出来的 chunk 名称
      minSize: 30000,  // 低于这个数值，则合并块
      minChunks: 1,  // 最小打包数量
      enforce: true,
      priority: -10    // 缓存组 打包先后顺序
      maxAsyncRequests: 5, // 最大异步请求数， 默认1
      maxInitialRequests : 3, // 最大初始化请求书，默认1
      reuseExistingChunk: true // 可设置是否重用该chunk
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}
```

- `runtimeChunk` 提取webpack运行时代码， 可以设置为object, boolean, string

```js
optimization:{
    // 方式1
    runtimeChunk: true,   // 默认块名
    // 方式2
    runtimeChunk:{
        name: entrypoint => `webpack-runtime$_${entrypoint.name}` // 自定义块名
    }
}
```

### resolve - 配置模块解析

- `extensions` 自动解析文件后缀，在导入时可以不用写文件后缀
- `alias`: 配置短路径
- `modules`: webpack解析模块时应该搜索的目录
- `plugins`
- `unsafeCache`
- `enforceExtension`

### module.rules - 编译规则

- rules: 数组，包含各个loader的配置对象
- test: 正则表达式，匹配编译文件
- exclude: 排除特定文件，通常会写`/node_nodules/`
- include: 在这些文件中匹配
- use: `test`匹配的文件使用这种`loader`处理， 可选类型字符串, 字符串数组, 对象，对象数组

项目中常用的loader：

- babel-loader,ts-loader
- css-loader, postcss-loader, sass-loader, less-loader, style-loader
- file-loader, url-loader, html-loader

> loader配置示例

```js
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env',
                            {
                                targets: {
                                browsers: CSS_BROWSERS,
                            },
                        }],'react', 'es2015', 'stage-0'
                        ],
                        plugins: [
                            'transform-runtime',
                            'add-module-exports',
                        ],
                    },
                },
            ],
        },
        {
            test: /\.(scss|css)$/,
            use: [
                'style-loader',
                {loader: 'css-loader',options:{plugins: [require('autoprefixer')({browsers: CSS_BROWSERS,}),],sourceMap: true}},
                {loader: 'postcss-loader',options:{plugins: [require('autoprefixer')({browsers: CSS_BROWSERS,}),],sourceMap: true}},
                {loader: 'sass-loader',options:{sourceMap: true}}
            ]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]',
                },
            ],
        },
        {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
                },
            ],
        },
    ],
}
```

### plugins - 插件

常用插件：

- UglifyJsPlugin
- HotModuleReplacementPlugin
- NoEmitOnErrorsPlugin
- HtmlWebPackPlugin
- ExtractTextPlugin
- PreloadWebpackPlugin
- CommonsChunkPlugin
- webpack.DefinePlugin

> plugins的作用在于将loader处理完成的资源进行压缩、处理、优化、公共代码提取、输出指定目录等

### webpack-dev-server

- contentBase: 开发服务器主目录
- historyApiFallback: `boolean`,`object`， 默认响应的入口文件
- compress: 是否启用gzip压缩
- publicPath： 可以覆盖output.publicPath
- stats: 自定义控制编译细节信息
- proxy: http-proxy-middleware，可以进行处理一些代理的请求。

```js
devServer:{
    contentBase:'../dist',
    host: 'localhost',
    port: 10086,
    publicPath: '/static/',
    historyApiFallback: {
        index: '/views/index.html'
    },
    // 匹配路径，进入不同的入口文件
    rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' }
    ],
    compress: true,  // 启用压缩
    noInfo: true,    // 服务器启动之后没有任何stdout信息
    inline: true,    //  ?
    hot: true,   // 模块热更新
    overlay: true,  // ?
    stats: {   // 自定义输出信息
        colors: true, // 彩色输出日志
        chunks: false // 显示打包后的块信息
    },
    proxy:{
        '/mockApi': 'https://easy-mock.com/project/5a0aad39eace86040263d' ,//请求可直接写成  /mockApi/api/login...
    }
}
```

### 代码压缩

#### 压缩js

> 将mode设置为`production`会自动压缩，可以不用配置

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

{
    plugins: [ new UglifyjsWebpackPlugin() ]
}
```

#### 压缩CSS

> 将mode设置为`production`会自动压缩，可以不用配置

```js
{
    test: /\.css$/,
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      use: [
          {
             loader: 'css-laoder',
             options: {minimize: true}
          },
          'postcss-loader'
      ]
    })
},
```

## 配置 `package.json`

### 添加脚本

> 在`package.json`文件中的`scripts`下面添加规则脚本，脚本可以嵌套
>
> 如果脚本启动错误，可以尝试在`package.json`文件中添加`bin`属性来指向脚本位置

```json
{
    "start": "cross-env NODE_ENV=dev webpack-dev-server --config ./src/config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.prod.js",
    "dev": "npm run start"
}
```
