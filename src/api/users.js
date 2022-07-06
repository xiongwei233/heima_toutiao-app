import request from '@/util/request'
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
