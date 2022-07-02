import axiosFn from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/util/token'

// 创建axios的实例
const axios = axiosFn.create({
  baseURL: 'http://toutiao.itheima.net',
  // baseURL: 'http://geek.itheima.net',
  timeout: 2000 // 20秒超时时间(请求20秒无响应，直接判断超时)
})

// 添加请求拦截器 => 统一添加token
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    // 如果getToken有值并且发送请求的的请求头为空，
    // 判断本地有token再携带，判断具体api/index.js里 如果没有携带Authorization,我再添加上去
    // ?. 可选链操作符，如果前面对象里没有1ength，整个表达式原地返回undefined
    if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
      // 统一携带token
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器 => 身份过期
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    // 如果返回的是401(用户未认证), 就让他重新登录，获取新的token
    if (error.response.status === 401) {
      router.replace('/login')
      Notify({ type: 'warning', message: '身份已过期' })
    }
    return Promise.reject(error)
  }
)

// 导出的是一个函数，函数里面有传参，传参写了默认值
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}) => {
  // 这里调用了axios函数，并把传参设置了进去 ,最后把结果返回给函数
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}

/*
// 上面的意思就是跟这个差不多，只是这里给了他一个名字叫API，其他是一样的
const api = ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  // 这里调用了axios函数，并把传参设置了进去 ,最后把结果返回给函数
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}
export default api
*/
