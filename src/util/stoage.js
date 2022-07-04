/**
 * 本地存储模块
 */
export const getItem = (name) => {
  const data = localStorage.getItem(name)
  // 为什么把 JSON.parse 放到 try-catch 中？
  // 因为 data 可能不是 json 格式字符串
  try {
    // 尝试把data转为 javascript 对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON
    // 直接原样返回
    return data
  }
}

export const setItem = (name, value) => {
  // 如果 value是对象，就吧value转为 JSON格式字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
