import request from '@/utils/request'

/**
 * 登陆
 * @param {String} mobile
 * @param {Number} code
 * @returns Promise
 */
export const Login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {Number} mobile
 * @returns Promise
 */
export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
