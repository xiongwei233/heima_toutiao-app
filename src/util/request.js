import axiosFn from 'axios'

// 创建axios的实例
const axios = axiosFn.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 2000 // 20秒超时时间(请求20秒无响应，直接判断超时)
})

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
