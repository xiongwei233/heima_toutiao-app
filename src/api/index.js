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

// 文章-获取新闻详情
export const getNewDetailsApi = ({ article_id }) =>
  request({
    url: `/v1_0/articles/${article_id}`,
    method: 'GET'
  })

// 搜索 - 获取联想建议（自动补全）
export const searchSuggestionApi = ({ q }) =>
  request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })

// 获取搜索结果
export const searchListApi = ({ page = 1, per_page = 10, q }) =>
  request({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page,
      per_page,
      q
    }
  })

// 用户-关注
export const followedUserApi = ({ userId }) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })

// 用户-取消关注
export const followedApi = ({ userId }) =>
  request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })

// 用户-获取用户自己信息
export const getUserApi = () =>
  request({
    url: '/v1_0/user',
    method: 'GET'
  })

// 用户-获取用户个人资料
export const getUserProfileApi = () =>
  request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })

// 用户-编辑用户照片资料（头像、身份证照片）
export const editPhotoApi = (fromData) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fromData
  })

// 用户-更新基本资料
export const editUserInfoApi = (dataObj) => {
  // 定义默认数据
  const obj = {
    name: '', // 非必传
    gender: 0, // 非必传
    birthday: '', // 非必传
    intro: '' // 非必传
  }
  // 变量参数对象每一个key
  for (const prop in obj) {
    // 用key去外面传入的参数对象匹配，如果没有找到(证明外面没传这个参数)
    if (dataObj[prop] === undefined) {
      // 那么就从obj身上移除这对属性和值
      delete obj[prop]
    } else {
      // 如果是传递了参数，就从外面对象取出对应的key值，保存到obj上
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}

// 文章-对文章点赞
export const articleLikingsApi = ({ articleId }) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })

// 文章-取消对文章点赞
export const articleRemoveLikingsApi = ({ articleId }) =>
  request({
    url: `/v1_0/article/likings/${articleId}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

// 评论-获取评论或评论回复
export const getCommentsAPI = ({ id, offset, limit = 10 }) =>
  request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id,
      offset, // 非必须
      limit // 非必须
    }
  })

// 评论-对评论或评论回复点赞
export const commentLikingsApi = ({ commentId }) =>
  request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })

// 评论-取消对评论或评论回复点赞
export const commentRemoveLikingsApi = ({ commentId }) =>
  request({
    url: `/v1_0/comment/likings/${commentId}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

// 评论-对文章或者评论进行评论
export const setCommentsApi = ({ id, content, art_id }) =>
  request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: id,
      content,
      art_id
    }
  })
