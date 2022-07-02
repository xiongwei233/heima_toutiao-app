<template>
  <div>
    <van-nav-bar title="编辑频道" fixed placeholder safe-area-inset-top @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="4.8vw" />
      </template>
    </van-nav-bar>

    <div>
      <!-- 我的频道 -->
      <van-cell class="tagBox" :border="false">
        <template>
          <span class="custom-title">我的频道</span>
          <span class="tagChannel">点击{{isEdit? "删除" : "进入"}}频道</span>
        </template>
        <template #right-icon>
          <span
            class="buttonChannel"
            type="default"
            size="mini"
            @click="addRemoveChannel"
          >{{isEdit? "完成" : "编辑"}}</span>
        </template>
      </van-cell>
      <van-grid direction="horizontal" :column-num="4" :gutter="10">
        <van-grid-item v-for="item in channel" :key="item.id" @click="removeChannel(item)">
          {{item.name}}
          <!-- 删除按钮 -->
          <!-- 如果当前点击了按钮，并且当前的id不等于0-->
          <van-icon name="cross" class="removeChannel" v-show="isEdit && item.id !== 0 " />
        </van-grid-item>
      </van-grid>
    </div>

    <div>
      <!-- 推荐频道 -->
      <van-cell class="tagBox" :border="false">
        <template>
          <span class="custom-title">推荐频道</span>
          <span class="tagChannel">点击添加频道</span>
        </template>
      </van-cell>
      <van-grid direction="horizontal" :column-num="4" :gutter="10">
        <van-grid-item
          v-for="item in unCheckChannel"
          :key="item.id"
          @click="addChannel(item)"
        >{{item.name}}</van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    channel: Array,
    unCheckChannel: Array
  },
  data () {
    return {
      isEdit: false
    }
  },
  created () {
  },
  methods: {
    // X关闭按钮
    onClickLeft () {
      this.$emit('closePopup')
      // 也可以通过父组件绑定ref,拿到子组件的值，isEdit设置为false
      // this.isEdit = false
    },
    // 编辑按钮
    addRemoveChannel () {
      this.isEdit = !this.isEdit
    },
    // 删除频道-我的频道板块
    removeChannel (item) {
      if (this.isEdit) {
        if (item.id !== 0) {
          this.$emit('removeEv', item)
        }
      } else {
        this.$emit('closeEv')
        this.$emit('input', item.id)
      }
    },
    // 添加频道-推荐频道板块
    addChannel (item) {
      if (this.isEdit) {
        this.$emit('addEv', item)
      }
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped >
.tagBox {
  margin-top: 8px;

  .custom-title {
    font-size: 4.266667vw;
  }

  .tagChannel {
    font-size: 3.2vw;
    color: #c1c1c1;
    padding: 0 14px;
  }

  .buttonChannel {
    padding: 3px 12px;
    border-radius: 40px;
    border: 1px solid red;
    font-size: 12px;
    color: red;
    line-height: normal;
  }
}
/deep/.van-grid-item__content {
  padding: 2.666667vw 2.133333vw;
  background-color: #f9f9f9;
  font-size: 13px;
}
.removeChannel {
  font-size: 10px;
  color: #b3b1b1;
  border: 1px solid #b3b1b1;
  position: absolute;
  right: -3px;
  top: -3px;
  border-radius: 50%;
}
</style>
