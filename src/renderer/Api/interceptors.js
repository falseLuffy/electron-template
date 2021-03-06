import axios from 'axios'
import Router from '@/router'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.url === '/api/auth/token') {
    delete config.headers['Authorization']
    config.baseURL = config.baseURL.split('cap')[0]
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  throw error
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code === 401) {
    Router.push({
      path: '/'
    })
  } else if (response.data.code > 200) {
    throw response.data
  } else {
    return response.data
  }
}, function (error) {
  // 对响应错误做点什么
  throw error
})
