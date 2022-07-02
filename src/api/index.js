import request from '@/util/request'

// 文件名-尽量和模块页面文件名统一（方便查找)
// 用户_登录  简写
/*
export const userLoginAPI = (data) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
*/

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

// 首页-获取所有频道列表
export const getAllUsersChannelsAPI = () =>
  request({
    url: '/v1_0/channels',
    method: 'GET'
  })

// 首页-获取用户的频道
export const getUsersChannelsAPI = () =>
  request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })

// 首页-设置用户的频道
export const putChannelsAPI = ({ channels }) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })

// 首页-删除指定用户频道
export const deleteChannelsAPI = ({ id }) =>
  request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

// 首页- 获取文章新闻推荐
export const getUsersArticlesAPI = ({ channel_id, timestamp }) =>
  request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp
    }
  })

// 文章-反馈-对文章不喜欢
export const notArtile = (artileId) =>
  request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artileId
    }
  })

// 文章-反馈-举报文章
export const reportArtile = ({ target, type, remark }) =>
  request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type,
      remark
    }
  })
