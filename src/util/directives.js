import Vue from 'vue'
// 插件对象(必须有install方法, 才可以注入到Vue.use中)
export default {
  install () {
    // 自定义input聚焦指令
    Vue.directive('inputFocus', {
      // el是拿到当前的标签
      inserted (el) {
        fn(el)
      },
      update (el) {
        fn(el)
      }
    })
  }
}

function fn (el) {
  // nodeName是拿到当前标签的大写
  if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    // 如果直接是input标签/textarea标签
    el.focus()
  } else {
    // 找到input标签，因为组件封装的标签层级太多了，
    const theInput = el.querySelector('input')
    const theTextarea = el.querySelector('textarea')
    if (theInput || theTextarea) {
      // 如果获取到input输入框
      theInput && theInput.focus()
      // 如果获取到textarea输入框
      theTextarea && theTextarea.focus()
    } else {
      // 本身也不是, 子标签里也没有
      console.error('请把inputFocus用在输入框标签上')
    }
  }
}
