<template>
  <div>
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="cell-images">
          <span>{{arrChildren.title}}</span>
          <!-- 一图 -->
          <van-image
            v-if="arrChildren.cover.type===1"
            fit="cover"
            width="28.8vw"
            height="17.6vw"
            :src="arrChildren.cover.images[0]"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <!-- 三图 -->
        <div class="cell-images2" v-if="arrChildren.cover.type > 1">
          <van-image
            fit="cover"
            width="28.8vw"
            height="17.6vw"
            v-for="(img,index) in arrChildren.cover.images"
            :key="index"
            :src="img"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </template>

      <template #label>
        <div class="cell-bottom">
          <div class="cell-bottom-text">
            <span>{{arrChildren.aut_name}}</span>
            <span>{{arrChildren.comm_count}} 评论</span>
            <span>{{fromatTime(arrChildren.pubdate)}}</span>
          </div>
          <van-icon name="cross" @click.stop="isShow = true" v-if="isRemove" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="isShow"
      get-container="body"
      :actions="actions"
      @select="onSelect"
      :cancel-text="actionText"
      @cancel="onCancel"
      @open="onOpen"
    />
  </div>
</template>

<script>
import { rimeAgo } from '@/util/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  name: 'ArtileItem',
  props: {
    arrChildren: Object,
    // 控制删除按钮
    isRemove: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 表示 rimeAgo() 函数赋值给 fromatTime
      fromatTime: rimeAgo,
      // 遮罩层
      isShow: false,
      actions: firstActions,
      actionText: '取消'
    }
  },
  created () {
  },
  methods: {
    // 遮罩层内容点击
    // action 当前点击的文字
    // item 当前点击的 索引
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.actionText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislikes', this.arrChildren.art_id)
        this.isShow = false
      } else {
        console.log(action.name)
        console.log(action.value)
        if (action.value !== 0) {
          this.$emit('reports', this.arrChildren.art_id, action.value)
        } else {
          // 表示如果举办内容选是其他问题，应该弹出输入框，让用户填写是什么问题，这里省略了，就用固定回答
          this.$emit('reports', this.arrChildren.art_id, action.value, '其他付加问题')
        }
        this.isShow = false
      }
    },
    // 点击取消按钮时
    onCancel () {
      if (this.actionText === '返回') {
        this.isShow = true
        this.actions = firstActions
        this.actionText = '取消'
      }
    },
    // 打开遮罩层，重置数据
    onOpen () {
      this.actions = firstActions
      this.actionText = '取消'
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style lang="less" scoped >
.van-cell {
  padding: 0 16px 8px 16px;

  .van-cell__title {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
  }

  .cell-images {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
  .cell-images2 {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }
  .cell-bottom {
    display: flex;
    justify-content: space-between;

    .cell-bottom-text span {
      padding-right: 12px;
    }
  }
}
</style>
