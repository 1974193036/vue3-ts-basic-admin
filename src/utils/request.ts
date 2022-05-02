import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
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
  const status = response.data.status

  // 正确的情况
  if (!status || status === 200) {
    return response
  }

  // 其它错误情况
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  // 手动返回一个 Promise 异常
  return Promise.reject(response)
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
