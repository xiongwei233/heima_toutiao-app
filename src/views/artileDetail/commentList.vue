<template>
  <div :class="{'art-cmt-container-1':isShow,'art-cmt-container-2':!isShow}">
    <!--
      1. van-list包裹列表，组件内源码，检测网页滚动事件。 判断滚动位置是否快到达内容高度（触底）
      => 触发1oad事件执行 => loading:为true => 底部加载中文字出现 => 内部认为现在处于加载中状态
    -->

    <!--
      2. immediate-check 作用: 让list组件不要一上来就检查是否触底
      原因：list中列表内容是异步网络请求回来的，标签挂载时，没有高度，list就会判定种底执行一次onLoad方法
      问题：created发一次，onLoad立刻又发送一次，请求2次第一页的数据/上来就请求第一页和第二页
    -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多评论数据了,请发布哦"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 评论列表 -->
      <!-- <div class="cmt-list" :class="isShow?'art-cmt-container-1':'art-cmt-container-2'"> -->
      <div class="cmt-list">
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="(item,index) in list " :key="index">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" alt class="avatar" />
              <span class="uname">{{item.aut_name}}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                @click="likingFn(true,item)"
                v-if="item.is_liking"
                name="like"
                size="16"
                color="red"
              />
              <van-icon @click="likingFn(false,item)" v-else name="like-o" size="16" color="gray" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">{{item.content}}</div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{dateReset(item.pubdate)}}</div>
        </div>
      </div>
    </van-list>

    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShow">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="showCmt">发表评论</div>
      <div class="icon-box">
        <van-badge :content="total_count?total_count:''" max="99">
          <van-icon name="comment-o" size="5.333333vw" @click="moveFn" />
        </van-badge>
        <van-icon name="star-o" size="5.333333vw" />
        <van-icon name="share-o" size="5.333333vw" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea placeholder="友善评论、理性发言、阳光心灵" v-inputFocus @blur="textareaBlur" v-model="content"></textarea>
      <van-button type="default" :disabled="content.length===0" @click="contentFn">发布</van-button>
    </div>
  </div>
</template>

<script>
import { getCommentsAPI, commentLikingsApi, commentRemoveLikingsApi, setCommentsApi } from '@/api'
import { rimeAgo } from '@/util/date'
export default {
  data () {
    return {
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: null,
      list: [],
      dateReset: rimeAgo,
      isShow: true, // 添加评论2个盒子的显示和隐藏
      // 总评论数
      total_count: 0,
      // textarea的绑定数据
      content: '',
      // 加载更多
      loading: false,
      finished: false
    }
  },
  methods: {
    // 文章数据
    async getCommentsFn () {
      const res = await getCommentsAPI({
        id: this.$route.query.art_id
      })
      this.list = res.data.data.results
      this.total_count = res.data.data.total_count
      this.offset = res.data.data.last_id
      console.log(this.list)
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 喜欢/不喜欢
    async likingFn (boolean, item) {
      if (boolean) {
        // 如果已喜欢 => 取消喜欢
        item.is_liking = false
        await commentRemoveLikingsApi({ commentId: item.com_id })
      } else {
        // 如果不喜欢 => 喜欢
        item.is_liking = true
        await commentLikingsApi({ commentId: item.com_id })
      }
    },
    // 展开textarea输入框
    showCmt () {
      this.isShow = false
    },
    // 评论滑动
    async moveFn () {
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 发布按钮
    async contentFn () {
      try {
        const res = await setCommentsApi({ id: this.$route.query.art_id, content: this.content })
        this.list.unshift(res.data.data.new_obj)
        this.total_count++
        this.content = ''
        console.log(res.data.data)
      } catch (err) {
        this.$toast.fail('发布评论失败')
      }
    },
    // textarea失去焦点
    textareaBlur () {
      setTimeout(() => {
        this.isShow = true
      }, 0)
    },
    async onLoad () {
      console.log('触底了')
      if (this.list.length > 0) {
        const res = await getCommentsAPI({
          id: this.$route.query.art_id,
          offset: this.offset
        })

        this.list = [ ...this.list, ...res.data.data.results ]
        this.offset = res.data.data.last_id
        this.total_count = res.data.data.total_count
        // 如果返回的数据没有了，那么就停在触底发请求
        if (res.data.data.last_id === null) {
          this.finished = true
          console.log('没有内容了')
        }
        this.loading = false
      } else {
        this.loading = false
      }
    }
  },
  created () {
    this.getCommentsFn()
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
