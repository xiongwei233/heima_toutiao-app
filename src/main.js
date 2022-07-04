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

// 自定义input聚焦指令
const directiveFocus = {
  install (Vue) {
    Vue.directive('inputFocus', {
      // el是拿到当前的标签
      inserted (el) {
        // nodeName是拿到当前标签的大写
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // 找到input标签，因为组件封装的标签层级太多了，
          const theInput = el.querySelector('input')
          const theTextarea = el.querySelector('textarea')

          // 如果获取到input输入框
          if (theInput) theInput.focus()
          // 如果获取到textarea输入框
          if (theTextarea) theInput.focus()
        }
      }
    })
  }
}
// 执行目标对象里的install方法并传入Vue类
// 这里只是让你知道 Vue.use是这样执行的
Vue.use(directiveFocus)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
