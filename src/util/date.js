// 封装专门处理时间的方法
import dayjs from 'dayjs'
// 中文
import 'dayjs/locale/zh-cn'
// dayjs规定需要的插件
// 返回 X 到当前实例的相对时间。
const relativeTime = require('dayjs/plugin/relativeTime')

// 这种注释叫 JSDOC注释,文档注释
/**
 * @param {*} 多久之前
 * @returns 系统时间到之前指定时间的距离值
 */

export const rimeAgo = (targetTime) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn') // 全局使用简体中文
  const a = dayjs()
  const b = dayjs(targetTime).from(a)
  return b
}
