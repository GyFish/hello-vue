
# 一、webpack + vue 工程配置

[vue-loader](#vue-loader)

[样式处理](#%E6%A0%B7%E5%BC%8F%E5%A4%84%E7%90%86)

[webpack-dev-server](#webpack-dev-server)

---
## vue-loader

webpack的作用就是将所用到的静态资源，全部打包在一起，减少HTTP请求数。

1. npm初始化，会在当前文件夹创建一个package.json
```
npm init
```

2. 安装webpack，vue及相关依赖
```
npm i webpack vue vue-loader css-loader vue-template-complier
```

3. 编写app.vue组件
```
// vue文件提供了一个全新的开发方式

// html模板
<template>
  <div id="test">{{name}}</div>
</template>

// js脚本
<script>
export default {
  data() {
    return {
      name: 'aaa'
    }
  }
}
</script>

// 样式
<style>
  #test {
    color:  blue;
  }
</style>
```

4. 通过js加载vue组件，同时也是webpack的入口文件
```
import Vue from 'vue'
import App from './app.vue'

// 为当前页面创建一个div块
const root = document.createElement('div')
document.body.appendChild(root)

// 通过Vue构造器，加载app.vue，渲染成html，并挂载到页面中的div
new Vue({
  render: h => h(App)
}).$mount(root)
```

5. 配置webpack.config.js
```
module.exports = {
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
        test: /.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
```

6. 编写npm启动脚本，卸载里面可以确保使用的是当前项目安装的webpack
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.config.js"
}
```

7. 打包
```
npm run build
```

---

## 样式处理

1. 安装预处理器stylus
```
npm i stylus-loader stylus
```

2. 配置webpack
```
webpack.config.js --- module.rules

// 使用stylus预处理器，.styl -> .css -> <style/>
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
```

3. test.styl
```
body
  font-size: 20px
```

4. 入口文件index.js中引入
```
import './assets/styles/test.css'
import './assets/images/wall1.jpg'
import './assets/styles/test.stylus.styl'
```

---

## webpack dev server

1. 安装 webpack-dev-server
```
npm i webpack-dev-server
```

2. 安装 cross-env，设置环境变量的统一写法
```
npm i cross-env
```

2. dev 脚本
```
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
}
```

3. 添加配置
```
webpack.config.js

// 设置打包目标为web
module.exports.target = 'web'

// 启动脚本时设置的环境变量，都可以通过process.env获得
const isDev = process.env.NODE_ENV === 'development'
if(isDev) {
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
// 在webpack编译过程中，如果有错误，则打印在网页上 
    overlay: {
      errors: true
    }
  }
}
```

4. 安装html插件，以自动包含容纳js等，并加入配置，在安装变量定义插件
```
// shell
npm i html-webpack-plugin

// webpack.config.js
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"prodction"'
      }
    }),
    new HTMLPlugin()
  ]
```

5. 热加载及代码映射
```
// 热更新
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  
// 在页面中调试代码，通过source-map进行代码映射
  config.devtool = '#cheap-module-eval-source-map'
```
