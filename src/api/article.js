import request from '@/util/request'

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
