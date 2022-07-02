// 此文件->封装3个方法->专门用于操作token的
// 封装目的：代码分层，更方便情绪，以后方便修改

const key = 'geek-itheima'

// 存入token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 取出token
export const getToken = () => localStorage.getItem(key)

// 删除token
export const removeToken = () => localStorage.removeItem(key)
