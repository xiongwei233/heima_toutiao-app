<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userList.photo" @click="$refs.iptFile.click()" />
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="userList.name" @click="onEditUser" />
      <van-cell title="手机号" is-link :value="userList.mobile" />
      <van-cell title="生日" is-link :value="userList.birthday" @click="onEditBirthday" />
      <van-cell title="性别" is-link :value="userList.gender?'女':'男'" />
    </van-cell-group>

    <!-- 名称的弹出框 -->
    <van-dialog
      v-model="userShow"
      title="修改名称"
      show-cancel-button
      v-if="userShow"
      :before-close="beforeCloseFn"
    >
      <van-field
        v-model.trim="userValue"
        maxlength="7"
        placeholder="请输入用户名"
        v-inputFocus
        input-align="center"
      />
    </van-dialog>

    <!-- 时间选择 -->
    <van-popup v-model="dateShow" position="bottom" :style="{ width: '100%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dataConfirm"
        @cancel="dataCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileApi, editPhotoApi, editUserInfoApi } from '@/api'
import { dataReset } from '@/util/date'
export default {
  name: 'UserEdit',
  data () {
    return {
      userList: [],
      userShow: false,
      userValue: '',
      // 时间的显示和隐藏
      dateShow: false,
      minDate: new Date(1966, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    async userListFn () {
      const res = await getUserProfileApi()
      this.userList = res.data.data
      console.log(this.userList)
    },
    // 上传图片触发的事件
    async onFileChange (e) {
      // 如果用户没有选中文件, 就停止执行下面代码
      if (e.target.files.length === 0) return
      // 当前的图片对象
      console.log(e.target.files[ 0 ])
      // 创建一个formData对象
      const thefile = new FormData()
      // 把上传的图片对象报错进去
      // photo是后端要求传递的参数
      thefile.append('photo', e.target.files[ 0 ])
      // 发起请求
      const res = await editPhotoApi(thefile)
      // 图片更新
      this.userList.photo = res.data.data.photo
      console.log(res.data.data.photo)
    },
    // 姓名的点击事件
    onEditUser () {
      this.userShow = true
      this.userValue = this.userList.name
    },
    // 关闭前的回调函数，
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        // 匹配 大小写A-Z,0-9和汉字，最重复1-7次就是最多7个字符最好1个字符
        const reg = /^[a-z A-Z 0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.userValue)) {
          // 通过了校验
          await editUserInfoApi({ name: this.userValue })
          // 请求发成功后(可以加try)把当前输入框的数据，绑定到当前输入框的数据源上(更新数据)
          this.userList.name = this.userValue
          // 请求发送完成，清空输入框，关闭弹窗
          this.userValue = ''
          done()
        } else {
          // 如果数据正则校验不通过就 直接关闭dialog/清空输入框
          this.userValue = ''
          done()
        }
      } else {
        // dialog的取消按钮 关闭dialog/清空输入框
        this.userValue = ''
        done()
      }
    },
    // 选择时间 点击事件
    onEditBirthday () {
      this.dateShow = true
      this.currentDate = new Date(this.userList.birthday)
    },
    // 事件选择器的 确认按钮
    async dataConfirm (value) {
      await editUserInfoApi({ birthday: dataReset(value) })
      this.userList.birthday = dataReset(value)
      this.dateShow = false
    },
    // 事件选择器的 取消按钮
    dataCancel () {
      this.dateShow = false
    }

  },
  created () {
    this.userListFn()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}

/deep/ .van-dialog__content {
  margin: 20px 15px;
}
</style>
