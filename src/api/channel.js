import request from '@/utils/request'

/**
 *
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *
 * @param {Number,String} id
 * @returns Promise
 */
export const delAllChannelAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}

/**
 *
 * @param {Number,String} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addAllChannelAPI = (id, seq) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/channels',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
