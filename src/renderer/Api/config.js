import axios from 'axios'
import Cookies from 'js-cookie'

// 使用前设置
axios.defaults.adapter = require('axios/lib/adapters/http')
axios.defaults.baseURL = 'http://192.168.0.205:8080/zhmx/api/cap'

const token = Cookies.get('systemKey')
if (token) {
  axios.defaults.headers.Authorization = token
}
