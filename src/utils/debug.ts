import Taro from '@tarojs/taro'
import { getRequestHeaders } from '@/service/dmxapi'

// 调试工具：打印当前环境的请求头信息
export const debugRequestHeaders = () => {
  const headers = getRequestHeaders()
  console.log('=== 当前环境请求头调试信息 ===')
  console.log('环境:', Taro.getEnv())
  console.log('请求头:', headers)
  console.log('User-Agent 是否存在:', 'User-Agent' in headers)
  console.log('X-Client-Type 是否存在:', 'X-Client-Type' in headers)
  console.log('================================')
  return headers
}

// 调试工具：模拟请求并打印实际发送的请求头
export const debugRequest = async (url: string, data?: any) => {
  console.log('=== 开始调试请求 ===')
  const headers = getRequestHeaders()
  console.log('设置的请求头:', headers)
  
  try {
    const result = await Taro.request({
      url,
      method: 'POST',
      header: headers,
      data,
      success: (res) => {
        console.log('请求成功:', res)
        console.log('响应头:', res.header)
      },
      fail: (err) => {
        console.log('请求失败:', err)
      }
    })
    return result
  } catch (error) {
    console.log('请求异常:', error)
    throw error
  }
} 