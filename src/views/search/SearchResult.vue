<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <artile-item
        :isRemove="false"
        v-for="item in searchList"
        :key="item.art_id"
        :arrChildren="item"
        @click.native="itemClickFn(item.art_id)"
      ></artile-item>
    </van-list>
  </div>
</template>

<script>
import { searchListApi } from '@/api'
import artileItem from '@/components/ArtileItem'
export default {
  components: { artileItem },
  name: 'SearchResult',
  data () {
    return {
      page: 1,
      searchList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async searchListFn () {
      try {
        const res = await searchListApi({ page: this.page, q: this.$route.params.searchValue })
        this.searchList = res.data.data.results
        console.log(this.searchList)
      } catch (err) {
        this.$toast.fail('搜索内容请求失败')
      }
    },
    // 页面触底，加载数据
    async onLoad () {
      // 如果当前有数据
      if (this.searchList.length > 0) {
        this.page++
        // 发请求
        const res = await searchListApi({ page: this.page, q: this.$route.params.searchValue })
        // 如果当前请求的数据没有了
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 合并数据
        this.searchList = [ ...this.searchList, ...res.data.data.results ]
        this.loading = false
      }
    },
    // 点击新闻
    itemClickFn (id) {
      this.$router.push({ path: `/detail?art_id=${id}` })
    }
  },
  created () {
    this.searchListFn()
  }

}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
