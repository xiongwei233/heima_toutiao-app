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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
