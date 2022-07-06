import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant组件
import '@/vant/index'

// 全局样式
import './styles/global.less'
// reset重置
import 'normalize.css'

// 请求
import '@/api'

// 代码高亮
import 'highlight.js/styles/default.css'

// 自定义input聚焦指令
import directiveFocus from '@/util/directives'
// 执行目标对象里的install方法并传入Vue类
// 这里只是让你知道 Vue.use是这样执行的
Vue.use(directiveFocus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// process是Node环境全部变量, 运行时根据敲击的命令不同, 脚手架会取环境变量给env添加属性和值
if (process.env.NODE_ENV !== 'development') {
  console.log = function () {}
  console.error = function () {}
  console.dir = function () {}
}
