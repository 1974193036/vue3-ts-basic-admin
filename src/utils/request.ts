import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:9999/api/admin'
})

// 请求拦截器
request.interceptors.request.use(function(config) {
  // 统一设置用户身份 token
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})

// export default request

// export default <T = any>(config: AxiosRequestConfig) => {
//   return request(config).then(res => {
//     return (res.data.data || res.data) as T
//   })
// }

export default <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return request(config).then(res => res.data.data || res.data)
}