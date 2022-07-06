import request from '@/util/request'

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
