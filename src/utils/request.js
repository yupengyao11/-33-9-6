// import axios from 'axios'

// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// export default axios

import axios from 'axios'

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

export default request
