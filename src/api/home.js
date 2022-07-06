import request from '@/util/request'

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
