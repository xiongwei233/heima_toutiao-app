import axios from '@/util/request'

// 文件名-尽量和模块页面文件名统一（方便查找)
// 用户_登录  简写
/*
export const userLoginAPI = (data) =>
  axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
*/

// 登录 -用户认证（登录注册）
export const userLoginAPI = ({ mobile, code }) =>
  axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 获取所有频道列表
export const channelsListAPI = () =>
  axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
