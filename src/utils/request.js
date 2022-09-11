// import axios from 'axios'

// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// export default axios

import axios from 'axios'
import store from '@/store'
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(function (config) {
  if (store.getters.isLogin) {
    config.headers.Authorization = `Bearer ${store.state.tokenObj.token}`
  }
  return config
})

export default request
