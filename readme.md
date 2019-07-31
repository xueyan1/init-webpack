# 构建工具 webpack 详解

#### 项目准备

1. 创建目录
2. 初始化 npm init --> package.json

   命令行执行 npm init 后需要以下参数，可以一路回车，最后 yes，生成 package.json

```js
package name: (init-webpack)
version: (1.0.0)
description: 详解wevpack
entry point: (index.js)
test command:
git repository: (https://github.com/xueyan1/init-webpack.git)
keywords: webpack
author: xueyan
license: (ISC)
About to write to /Users/liuyangongshouhu/Desktop/init-webpack/package.json:

{
"name": "init-webpack",
"version": "1.0.0",
"description": "详解wevpack",
"main": "index.js",
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
"repository": {
  "type": "git",
  "url": "git+https://github.com/xueyan1/init-webpack.git"
},
"keywords": [
  "webpack"
],
"author": "xueyan",
"license": "ISC",
"bugs": {
  "url": "https://github.com/xueyan1/init-webpack/issues"
},
"homepage": "https://github.com/xueyan1/init-webpack#readme"
}

Is this ok? (yes) yes
```

3. 创建业务目录
   例如：

   app->js->main,APP.vue 等等

   app->css->reset.scss 等等

   app->views->index.html

#### 创建配置文件

1. 创建配置文件 webpack.config.js
2. 文件配置

- 基础配置
  - entry
  - module
  - plugins
  - output

```js
const path = require('path')

module.exports = {
  entry: {
    app: './app/js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/, // 加载html文件
        loader: 'html-loader'
      },
      {
        test: /\.vue$/, // 加载vue文件
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/, // 加载css文件 从右往左运行。
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [], // 插件
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

- 进阶配置
  - resolve
  - devtool
  - devServer

3. 开启 devServer 方法
   [详细](https://webpack.docschina.org/guides/development/#使用-webpack-dev-server)

- 首先执行 npm install --save-dev webpack-dev-server webpack
- 在 配置中添加以下代码

```js
  devServer: {
    contentBase: path.join(__dirname,'dist'),
    compress: true, // 是否压缩
    port: 9000 // 端口
},
```

- 命令行执行以下，安装 loader

  npm install html-loader vue-loader sass-loader css-loader style-loader -D

  注意: 执行完了之后在 package.json 中 会增加以下内容。与之相对应的版本号。

  ```js
    "devDependencies": {
    "css-loader": "^3.1.0",
    "html-loader": "^0.5.5",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "vue-loader": "^15.7.1",
    "webpack-dev-server": "^3.7.2"
  }
  ```

  - 安装过程中会提示 node-sass 安装不了。使用淘宝镜像:

    npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

  - webpack.config.js 中的 loaders 不在新的 API 里，改为 rules。
  - CleanWebpackPlugin 的使用方法改为

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  ```

  - 配置 vue

  ```js
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  ```

  [详情](https://cn.vuejs.org/v2/guide/installation.html)

5. 完整的配置代码。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    app: './app/js/main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // 是否压缩
    port: 9000 // 端口
  },
  module: {
    rules: [
      {
        test: /\.html$/, // 加载html文件
        loader: 'html-loader'
      },
      {
        test: /\.vue$/, // 加载vue文件
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/, // 加载css文件 从右往左运行。
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    }),
    new VueLoaderPlugin()
  ], // 插件
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

6. 完善页面内容。

7. npm run start 正常跑起来了

#### 开发过程中的配置

- 如使用 px2rem

  - 首先安装 npm install px2rem-loader
  - 配置如下: [详情](https://www.npmjs.com/package/px2rem2-loader)

  ```js
  {
      test: /\.vue$/, // 加载vue文件
      loader: 'vue-loader',
      options:{
        css:'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8',
        scss:'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader'
      }
    },
  ```
