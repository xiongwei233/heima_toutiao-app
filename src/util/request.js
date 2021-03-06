import axiosFn from 'axios'
// import router from '@/router'
import { Notify } from 'vant'
import { clearStorage, getStorage, setStorage, removeStorage } from './storage'
import { getNewTokenAPI } from '@/api'
import router from '@/router'
// 创建axios的实例
const axios = axiosFn.create({
  // baseURL: 'http://toutiao.itheima.net',
  baseURL: 'http://geek.itheima.net',
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
    if (
      getStorage('geek-itheima')?.length > 0 &&
      config.headers.Authorization === undefined
    ) {
      // 统一携带token
      config.headers.Authorization = `Bearer ${getStorage('geek-itheima')}`
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
  async function (error) {
    console.log(error)
    // 对响应错误做点什么
    // 如果返回的是401(用户未认证), 就让他重新登录，获取新的token
    if (error.response.status === 401) {
      // Notify({ type: 'warning', message: '身份已过期' })
      // 清空token，才能让路由守卫判断失效,放行我去登录页
      removeStorage('geek-itheima')
      // token续签方式1: 强制跳转到登录,用户有感知(需要手动登录)
      // router.replace('/login')

      // token续签方式2: 使用refresh_token换回信的token,继续使用，js代码实现，用户无感知(不用重新登录)
      const res = await getNewTokenAPI()
      // 新的token回来以后,我们要做什么
      // 1.更新token在本地
      setStorage('geek-itheima', res.data.data.token)
      // 2.更新新的token在请求头里
      error.config.headers.Authorization = `Bearer ${res.data.data.token}`
      // 3.未完成这次请求，再次发起
      // error.config 是上一次请求的配置对象
      // 结果我们要return回原本的逻辑调用地方-还是return回去一个Promise对象
      return axios(error.config) // 重新发请求
    } else if (
      // 如果当前返回500,
      error.response.status === 500 &&
      // 并且返回错误的 刷新token请求
      error.config.url === '/v1_0/authorizations' &&
      // 并且当前请求方式是put
      error.config.method === 'put'
    ) {
      // 刷新token的refresh_token也过期了
      // 那就只有重新登录了
      clearStorage() // 清空所有localStorage的值
      Notify({ type: 'warning', message: '身份已过期' })
      // fullPath,路由对象里的完整路由路径#后面的一切
      router.replace(`/login?path=${router.currentRoute.fullPath}`)
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
