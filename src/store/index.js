import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置默认头像路径
    userPhoto:
      'https://img1.baidu.com/it/u=1737887932,2007087118&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500'
  },
  mutations: {
    // 修改图片
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
