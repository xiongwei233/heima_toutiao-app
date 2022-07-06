<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- loading -->
    <van-loading color="#0094ff" v-if="Object.keys(newDetailsList).length===0">加载中...</van-loading>
    <!-- 文章内容 -->
    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{newDetailsList.title}}</h1>

        <!-- 用户信息 -->
        <van-cell
          center
          :title="newDetailsList.aut_name"
          :label="dateReset(newDetailsList.pubdate)"
        >
          <template #icon>
            <img :src="newDetailsList.aut_photo" alt class="avatar" />
          </template>
          <template #default>
            <div>
              <van-button
                @click="followedFn(true)"
                v-if="newDetailsList.is_followed"
                type="info"
                size="mini"
              >已关注</van-button>
              <van-button
                v-else
                @click="followedFn(false)"
                icon="plus"
                type="info"
                size="mini"
                plain
              >关注</van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="newDetailsList.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞 -->
        <div class="like-box">
          <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
          <van-button
            v-if="newDetailsList.attitude===1"
            icon="good-job"
            type="danger"
            size="small"
            @click="attitudeFn(true)"
          >已点赞</van-button>
          <van-button
            v-else
            @click="attitudeFn(false)"
            icon="good-job-o"
            type="danger"
            plain
            size="small"
          >点赞</van-button>
        </div>
      </div>

      <!-- 文章评论 -->
      <comment-list></comment-list>
    </div>
  </div>
</template>

<script>
import { getNewDetailsApi, followedUserApi, followedApi, articleRemoveLikingsApi, articleLikingsApi } from '@/api'
import { rimeAgo } from '@/util/date'
import commentList from '@/views/artileDetail/commentList'
export default {
  name: 'artileDetail',
  components: {
    commentList
  },
  data () {
    return {
      // 数据对象
      newDetailsList: {},
      dateReset: rimeAgo
    }
  },
  methods: {
    async getNewDetailsFn () {
      const res = await getNewDetailsApi({
        article_id: this.$route.query.art_id
      })
      this.newDetailsList = res.data.data
    },
    // 关注/已关注
    async followedFn (boolean) {
      if (boolean) {
        // 如果当前已关注 => 取消关注
        console.log('取消关注')
        this.newDetailsList.is_followed = false
        await followedApi({ userId: this.newDetailsList.aut_id })
      } else {
        // 未关注 => 关注
        console.log('关注')
        this.newDetailsList.is_followed = true
        await followedUserApi({ userId: this.newDetailsList.aut_id })
      }
    },
    // 点赞/已点赞
    // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    async attitudeFn (boolean) {
      if (boolean) {
        console.log('取消点赞')
        this.newDetailsList.attitude = 0
        await articleRemoveLikingsApi({ articleId: this.newDetailsList.art_id })
      } else {
        console.log('点赞')
        this.newDetailsList.attitude = 1
        await articleLikingsApi({ articleId: this.newDetailsList.art_id })
      }
    }
  },
  created () {
    this.getNewDetailsFn()
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading {
  text-align: center;
  padding-top: 50px;
}
</style>
