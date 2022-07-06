<template>
  <div>
    <!-- headers -->
    <van-nav-bar fixed>
      <template v-slot:left>
        <img class="logo" src="@/assets/toutiao_logo.png" />
      </template>
      <template #right>
        <van-icon name="search" size="4.8vw" color="#fff" @click="moveSearch" />
      </template>
    </van-nav-bar>

    <!-- tab标签 -->
    <van-tabs
      v-model="channelId"
      duration="0"
      animated
      @change="changeChangeFn"
      sticky
      offset-top="12.266667vw"
    >
      <van-tab
        v-for="channel in channelsList"
        :name="channel.id"
        :key="channel.id"
        :title="channel.name"
      >
        <artile-list :channelId="channelId"></artile-list>
      </van-tab>
    </van-tabs>

    <van-icon name="plus" class="pushClass" @click="addchannel" />

    <van-popup class="popupClass" v-model="isShow">
      <channel-edit
        :channel="channelsList"
        @closePopup="closePopupFn"
        :unCheckChannel="unCheckChannelsList"
        @addEv="addEvFn"
        @removeEv="removeEvFn"
        ref="editRef"
        v-model="channelId"
        @closeEv="closeEvFn"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUsersChannelsAPI, getUsersArticlesAPI, getAllUsersChannelsAPI, putChannelsAPI, deleteChannelsAPI } from '@/api'
import artileList from '@/components/ArtileList.vue'
import channelEdit from '@/views/home/channelEdit.vue'
export default {
  name: 'layoutHome',
  data () {
    return {
      // 这里的值是 van-tab的name传过来的,
      // 文档规定了  name: 标签名称，作为匹配的标识符/标签的索引值
      // 所以这里绑定的是当前 选中频道的id，
      channelId: 0,
      // 用户的频道
      channelsList: [],
      // 所有频道
      allChannelsList: [],
      // 内容区域的数据
      artileList: [],
      isShow: false,

      // 设置每个频道的滚动位置
      channelScrollTObj: {}
      // 值{频道id:滚动位置, 频道id2:滚动位置2,}
    }
  },
  async created () {
    this.getChannelsList()
  },
  methods: {
    async getChannelsList () {
      try {
        // 用户频道列表
        const res = await getUsersChannelsAPI()
        this.channelsList = res.data.data.channels

        // 所有频道列表
        const res2 = await getAllUsersChannelsAPI()
        this.allChannelsList = res2.data.data.channels

        // 文章列表
        this.changeChangeFn()
      } catch (err) {
        this.$toast.fail('获取用户的频道失败')
      }
    },
    // 文章频道列表channge事件
    async changeChangeFn (name) {
      this.$nextTick(() => {
        // 频道切换，滚到到 每个频道保存的滚动位置，
        document.documentElement.scrollTop = this.channelScrollTObj[ this.channelId ]
        console.log(this.channelScrollTObj[ this.channelId ])
      })

      console.log('name的值' + name)
      try {
        const res2 = await getUsersArticlesAPI({
          channel_id: this.channelId, // 默认请求推荐频道
          timestamp: new Date().getTime()
        })
        this.artileList = res2.data.data.results
      } catch (err) {
        this.$toast.fail('获取用户的频道的数据失败')
      }
    },
    // 添加频道的按钮
    addchannel () {
      this.isShow = true
    },
    // 关闭遮罩层
    closePopupFn () {
      this.isShow = false
      this.$refs.editRef.isEdit = false
    },
    // 选择频道之后
    closeEvFn () {
      this.isShow = false
    },
    // 添加频道
    async addEvFn (item) {
      try {
        this.channelsList.push(item)
        // 去掉推荐的频道
        const newArr = this.channelsList.filter(item => item.id !== 0)
        // 浅拷贝一下, 并对值进行修改
        // map(): 根据对每个元素调用 func 的结果创建一个新数组
        const newChannelsList = newArr.map((item, index) => {
          const newObj = { ...item } // 浅拷贝
          delete newObj.name
          newObj.seq = index
          return newObj
        })
        await putChannelsAPI({ channels: newChannelsList })
      } catch (err) {
        this.$toast.fail('频道添加失败')
        // 当我添加频道失败，那么就重新获取频道数据，重置掉旧数据
        this.getChannelsList()
      }
    },
    // 删除频道
    async removeEvFn (item) {
      try {
        const index = this.channelsList.findIndex(channel => channel.id === item.id)
        this.channelsList.splice(index, 1)
        await deleteChannelsAPI({ id: item.id })
      } catch (err) {
        this.$toast.fail('频道删除失败')
        // 当我删除频道失败，那么就重新获取频道数据，重置掉旧数据
        this.getChannelsList()
      }
    },
    // 搜索图标
    moveSearch () {
      this.$router.push('/search')
    },
    // 监听网页的滚动事件
    scrollFn () {
      // 把把页面内容卷入的距离，保存在路由设置的值上
      this.$route.meta.scrollTValue = document.documentElement.scrollTop
      // 保存每个频道的滚动位置
      this.channelScrollTObj[ this.channelId ] = document.documentElement.scrollTop
      console.log(this.channelScrollTObj)
    }
  },
  computed: {
    // 计算频道
    unCheckChannelsList () {
      // 方法1
      // return this.allChannelsList.filter(allchannel => {
      //   return this.channelsList.find(userchannel => {
      //     return userchannel.id === allchannel.id
      //   })
      // })
      // }

      // 方法2
      // const arr = []
      // this.allChannelsList.forEach(channel => {
      //   let falg = false
      //   for (let i = 0; i < this.channelsList.length; i++) {
      //     if (this.channelsList[ i ].id === channel.id) {
      //       falg = true
      //       break
      //     }
      //   }
      //   if (!falg) {
      //     arr.push(channel)
      //   }
      // })
      // return arr

      // 方法3
      // const newArr = this.allChannelsList.filter(allChannel => {
      //   // findIndex: 在channelsList里面查找，如果channelsList.id和allChannelsList.id一样，当前符合条件的索引号，不一样返回-1
      //   const index = this.channelsList.findIndex(channel => {
      //     return channel.id === allChannel.id
      //   })

      //   // 如果没有找到返回false， 找到了返回true，因为filter接收布尔值
      //   if (index > -1) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      // return newArr

      // 方法3 简写：
      return this.allChannelsList.filter(
        allChannel => (this.channelsList.findIndex(channel => allChannel.id === channel.id) === -1
        )
      )
    }
  },
  // 页面打开
  activated () {
    console.log(this.$route)
    // 监听 scroll 滚动事件
    window.addEventListener('scroll', this.scrollFn)
    // 设置滚动条的位置
    document.documentElement.scrollTop = this.$route.meta.scrollTValue
  },
  // 页面刷新
  deactivated () {
    // 销毁事件，提高性能
    window.removeEventListener('scroll', this.scrollFn)
  },
  components: {
    artileList,
    channelEdit
  }
}
</script>

<style lang="less" scoped >
.logo {
  width: 100px;
  height: 30px;
}
.van-tabs {
  padding-top: 12.266667vw;
}

/deep/.van-tabs__wrap {
  position: fixed;
  top: 12.266667vw;
  left: 0;
  right: 0;
}
/deep/.van-tabs__content {
  margin-top: 44px;
  // font-size: 3.733333vw; // 把内容区域的字体都固定了
}
.pushClass {
  font-size: 4.5vw;
  position: fixed;
  right: 0;
  top: 46px;
  line-height: 44px;
  padding: 0 8px;
  background-color: #fff;
  display: block;
  z-index: 120;
}
/deep/.van-tabs__nav {
  padding-right: 32px;
}
.popupClass {
  width: 100vw;
  height: 100vh;
}
</style>
