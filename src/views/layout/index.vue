<template>
  <div class="home_container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <van-tabbar v-model="active" route>
      <van-tabbar-item name="home" replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="user" replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayOut',
  data () {
    return {
      active: 'home'
    }
  },
  created () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="less" scoped >
// 内容底部内边距(把内容往上挤，防止内部被底部导航挡住)
.home_container {
  padding-bottom: 50px;
}
// 底部导航上边框
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
