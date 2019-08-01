const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = env => {
  if (!env) {
    env = {}
  }
  let plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    })
  ]
  if (env.production) {
    plugins.push(
      new VueLoaderPlugin(),
      new ExtractTextPlugin('style.css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production'
        }
      })
    )
  }
  return {
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
          loader: 'vue-loader',
          options: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader!px2rem-loader?remUnit=75&remPrecision=8',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use:
                'css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
              fallback: 'vue-style-loader'
            })
          }
        },
        {
          test: /\.scss$/, // 加载css文件 从右往左运行。
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins, // 插件
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.vue'],
      alias: {
        vue$: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
