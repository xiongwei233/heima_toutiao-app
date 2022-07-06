<template>
  <div class="appBox">
    <form action="/">
      <van-search
        class="searchClass"
        v-model.trim="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        clearable
        @clear="clearSearch"
        v-inputFocus
        @input="inputFn"
        shape="round"
        fixed
      />
    </form>

    <!-- 历史记录 -->
    <div v-if="searchValue.length===0">
      <van-cell class="tagBox">
        <template>
          <span class="custom-title">历史记录</span>
        </template>
        <template #right-icon>
          <van-icon name="delete-o" size="4.266667vw" @click="clearFn" />
        </template>
      </van-cell>
      <van-grid class="gridBox" :gutter="10">
        <span v-for="(item,index) in searchHistory" :key="index" @click="onHistory(item)">{{item}}</span>
      </van-grid>
    </div>

    <!-- 搜索内容 -->
    <div v-else>
      <van-cell
        icon="search"
        v-for="(item,index) in searchSuggestionList"
        :key="index"
        @click="onSuggest(item)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div v-html="highlight(item,searchValue)"></div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { searchSuggestionApi } from '@/api'
import { setStorage, getStorage } from '@/util/storage'
export default {
  name: 'searchContent',
  data () {
    return {
      searchValue: '',
      timr: null, // 防抖的定时器
      // 搜索得到的内容
      searchSuggestionList: [],
      // 搜索历史
      searchHistory: JSON.parse(getStorage('his')) || [] // 搜索历史
    }
  },
  created () {
  },
  methods: {
    onCancel () {
      // this.$router.push('/layout/home')
      this.$router.go(-1) // 表示后退一步
    },
    // 点击清除按钮
    clearSearch () {
      this.searchValue = ''
    },
    // 搜索输入框的input事件 => 防抖
    inputFn () {
      // 如果有这个定时器，就停止
      clearTimeout(this.timr)
      this.timr = setTimeout(async () => {
        // 如果输入框没有内容，就停止运行
        if (this.searchValue.length === 0) return
        // 防止空内容触发下面逻辑
        // 发起请求
        const res = await searchSuggestionApi({ q: this.searchValue })
        // 有搜索内容
        if (res.data.data.options.length !== 0 && res.data.data.options[ 0 ] !== null) {
          this.searchSuggestionList = res.data.data.options
        } else {
          // 没有搜索内容
          const a = [ '暂无搜索内容' ]
          this.searchSuggestionList = a
        }
      }, 500)
    },
    // 搜索高亮
    // originStr 是当前搜索得到的数据
    // target 是当前搜索的关键词
    highlight (originStr, target) {
      return originStr.replace(
        // RegExp 是正则表达式的构造函数
        // 参数1: 字符串
        // 参数2：匹配对象
        // 返回值：正则对象
        new RegExp(target, 'gi'), (match) => {
          // 这个函数是防止把符合条件都改成大写或者小写了,
          //
          return `<span style="color:red">${match}</span>`
        }
        // 正则的g是全局效果，i表示不区分大小写
      )
    },

    // 搜索框回车
    onSearch (str) {
      // 防止输入空格就跳转了
      if (str.length > 0) {
        this.searchHistory.push(this.searchValue)
        // 这里表示，先让历史记录添加到token，再进行跳转，
        // 如果先调整，那么数据就没了
        setTimeout(() => {
          this.$router.push(`/search_result/${str}`)
        }, 0)
      }
    },
    // 点击搜索联想建议
    onSuggest (str) {
      this.searchHistory.push(str)
      setTimeout(() => {
        this.$router.push(`/search_result/${str}`)
      }, 0)
    },
    // 点击历史记录
    onHistory (str) {
      this.$router.push(`/search_result/${str}`)
    },
    // 清空历史记录
    clearFn () {
      this.searchHistory = []
    }
  },
  watch: {
    // 监听历史记录
    searchHistory: {
      deep: true,
      handler () {
        // set：无序不重复的value集合体(无下角标),
        // 特点: 传入的数组类型，如果有重复元素，自动清除掉重复元素，返回无重复的set对象
        // 注意: 如果值是对象，比较的是对象的内存地址
        const theSet = new Set(this.searchHistory)
        // set类型对象 转成 Array数组类型
        const arr = Array.from(theSet)
        setStorage('his', JSON.stringify(arr))
      }
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped >
.appBox {
  padding-top: 54px;
}
.custom-title {
  font-size: 3.733333vw;
}

.gridBox {
  margin-top: 10px;
  span {
    padding: 8px 10px;
    border-radius: 6px;
    background-color: #f5f5f5;
    font-size: 14px;
    margin: 5px 10px 5px 0;
    color: #111;
  }
}
.searchClass {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
}
</style>
