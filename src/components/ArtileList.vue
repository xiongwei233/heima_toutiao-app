<template>
  <div style="margin-top: 1.333333vw">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="50"
        @load="onLoad"
        :immediate-check="false"
      >
        <artile-item
          @dislikes="dislikesFn"
          v-for="arr in list"
          :key="arr.art_id"
          :arrChildren="arr"
          @reports="reportsFn"
        ></artile-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import artileItem from '@/components/ArtileItem'
import { getUsersArticlesAPI, notArtile, reportArtile } from '@/api'
import { Notify } from 'vant'

export default {
  name: 'ArtileList',
  props: {
    channelId: Number
  },
  components: {
    artileItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 时间戳，这里是用来做加载更多数据的请求值, 数据不同，值就不同，
      theTime: '',
      isLoading: false
    }
  },
  created () {
    this.changeChangeFn()
  },
  methods: {
    // 优化请求，封装
    async getArticleListFn () {
      const res = await getUsersArticlesAPI({
        channel_id: this.channelId, // 默认请求推荐频道
        timestamp: this.theTime || new Date().getTime() // 时间戳
      })

      // 合并数据到 一个数组，
      this.list = [ ...this.list, ...res.data.data.results ]
      // 拿到新的时间戳,保存下一页数据的时间(做分页用)
      this.theTime = res.data.data.pre_timestamp
      // 等待网络请求结果后
      // 底部加载更多状态
      this.loading = false

      // 如果返回的数据没有了，那么就停在触底发请求
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      // 下拉刷新
      this.isLoading = false
    },

    // 文章列表
    async changeChangeFn () {
      try {
        this.getArticleListFn()
      } catch (err) {
        this.$toast.fail('获取用户的频道的数据失败')
      }
    },
    // 底部加载事件
    async onLoad () {
      try {
        // 如果当前没有数据了，那么finished就为false
        if (this.list.length === 0) {
          // 告诉list组件直接底部显示没有更多数
          this.finished = true
          return
        }
        this.getArticleListFn()
      } catch (err) {
        this.$toast.fail('获取用户的频道的数据失败')
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 清空数据和，重置时间戳
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },

    // 子组件的自定义事件，对文章不喜欢
    async dislikesFn (id) {
      try {
        await notArtile(id)
        Notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        Notify({ type: 'danger', message: err.message })
      }
    },
    // 子组件的自定义事件，对文章的举报
    async reportsFn (target, type, remark) {
      try {
        await reportArtile({ target, type, remark })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
