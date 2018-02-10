const path = require('path')

const webpack = require('webpack')

const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
// 运行环境
  target: 'web',
// 入口文件
  entry: path.join(__dirname, 'src/index.js'),
// 输出文件
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
// 模块加载规则
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
// 将css卸载html中
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
// 当图片文件小于1024时，url-loader（依赖于file-loader）将图片转成Base64写在html中，并通过webpack的选项定义输出名字
      {
        test: /\.(gif|jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
// 使用stylus预处理器，.styl -> .css -> <style/>
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"prodction"'
      }
    }),
    new HTMLPlugin()
  ]
}

if(isDev) {
// 在页面中调试代码，通过source-map进行代码映射
  config.devtool = '#cheap-module-eval-source-map'
// server配置，热更新，以及在webpack编译过程中，如果有错误，则打印在网页上 
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
// 热更新
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config