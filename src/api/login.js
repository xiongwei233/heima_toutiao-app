import request from '@/util/request'
import { getStorage } from '@/util/storage'
// 登录 -用户认证（登录注册）
export const userLoginAPI = ({ mobile, code }) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 登录-刷新用户token
export const getNewTokenAPI = () =>
  request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      // 请求拦截器统一携带的是token，而这次请求需要带的是 refresh_token
      // 所以在axios请求拦截器里判断，就是为了这种情况准备的
      Authorization: `Bearer ${getStorage('refresh_token')}`
    }
  })
