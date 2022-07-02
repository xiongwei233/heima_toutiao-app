<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        required
        placeholder="请填写手机号"
        :rules="[{ required: true, message: '请填写11位正确的手机号', pattern:/^1[3-9]\d{9}$/ }]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        required
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写6位正确的密码',pattern:/^\d{6}$/ } ]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          :loading="isLoading"
          :disabled="isLoading"
          type="info"
          loading-text="加载中..."
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLoginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/util/token'
export default {
  name: 'LoginItem',
  data () {
    return {
      user: {
        mobile: '13888888888',
        code: '246810' // 246810
      },
      isLoading: false
    }
  },
  created () {
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      try {
        const res = await userLoginAPI(this.user)
        setToken(res.data.data.token) // 存入token
        console.log(res.data.data)
        Notify({ type: 'success', message: '登录成功' })
        // this.$router.push({ name: 'Layout' })
        this.$router.replace({ name: 'Home' })
      } catch (err) {
        Notify({ type: 'danger', message: '账号或密码输入错误，请重试' })
      }
      this.isLoading = false
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped >
/*
.van-nav-bar {
  background-color: #0e85ff;
}
/deep/ .van-nav-bar__title {
  color: white;
}
*/
</style>
