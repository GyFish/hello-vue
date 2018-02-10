import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/images/wall1.jpg'
import './assets/styles/test.stylus.styl'

// 为当前页面创建一个div块
const root = document.createElement('div')
document.body.appendChild(root)

// 通过Vue构造器，将app.vue渲染成html，并挂载到页面中的div
new Vue({
  render: h => h(App)
}).$mount(root)