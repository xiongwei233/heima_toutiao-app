// 封装本地存储模块
// 整个项目使用localStorage，sessionStorage，还是cookie只需要改心这里即可
// 封装：为了统一管理，方便以后替换和修改

// 存token
export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}

// 取token
export const getStorage = (key) => {
  return localStorage.getItem(key)
}

// 删除token
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}

// 清空 localStorage
export const clearStorage = () => {
  localStorage.clear()
}
