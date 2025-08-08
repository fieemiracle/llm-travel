/**
 * 图片工具类
 * 用于处理图片加载失败、默认图片等功能
 */

// 默认图片配置
const DEFAULT_IMAGES = {
  // 根据类型返回不同的默认图片
  typeMap: {
    '景点': 'https://via.placeholder.com/200x150/667eea/ffffff?text=景点',
    '美食': 'https://via.placeholder.com/200x150/f093fb/ffffff?text=美食',
    '住宿': 'https://via.placeholder.com/200x150/4facfe/ffffff?text=住宿',
    '购物': 'https://via.placeholder.com/200x150/43e97b/ffffff?text=购物',
    '文化': 'https://via.placeholder.com/200x150/fa709a/ffffff?text=文化',
    '娱乐': 'https://via.placeholder.com/200x150/ff9a9e/ffffff?text=娱乐',
    '运动': 'https://via.placeholder.com/200x150/a8edea/ffffff?text=运动'
  },
  // 通用默认图片
  default: 'https://via.placeholder.com/200x150/cccccc/666666?text=暂无图片',
  // 加载中图片
  loading: 'https://via.placeholder.com/200x150/f0f0f0/999999?text=加载中...'
}

/**
 * 获取默认图片URL
 * @param type 图片类型
 * @returns 默认图片URL
 */
export function getDefaultImageUrl(type?: string): string {
  if (type && DEFAULT_IMAGES.typeMap[type]) {
    return DEFAULT_IMAGES.typeMap[type]
  }
  return DEFAULT_IMAGES.default
}

/**
 * 验证图片URL是否有效
 * @param url 图片URL
 * @returns Promise<boolean>
 */
export function validateImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false)
      return
    }

    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * 图片加载失败处理
 * @param originalUrl 原始图片URL
 * @param type 图片类型
 * @param fallbackUrl 备用图片URL
 * @returns 处理后的图片URL
 */
export function handleImageError(
  originalUrl: string, 
  type?: string, 
  fallbackUrl?: string
): string {
  if (!originalUrl) {
    return getDefaultImageUrl(type)
  }
  
  // 如果提供了备用URL，优先使用
  if (fallbackUrl) {
    return fallbackUrl
  }
  
  return getDefaultImageUrl(type)
}

/**
 * 图片预加载
 * @param urls 图片URL数组
 * @returns Promise<void>
 */
export function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map(url => {
    return new Promise<void>((resolve) => {
      if (!url) {
        resolve()
        return
      }
      
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = url
    })
  })
  
  return Promise.all(promises).then(() => {})
}

/**
 * 获取图片加载状态
 * @param url 图片URL
 * @returns Promise<'success' | 'error' | 'timeout'>
 */
export function getImageLoadStatus(url: string, timeout = 5000): Promise<'success' | 'error' | 'timeout'> {
  return new Promise((resolve) => {
    if (!url) {
      resolve('error')
      return
    }

    const img = new Image()
    const timer = setTimeout(() => {
      resolve('timeout')
    }, timeout)

    img.onload = () => {
      clearTimeout(timer)
      resolve('success')
    }
    
    img.onerror = () => {
      clearTimeout(timer)
      resolve('error')
    }
    
    img.src = url
  })
}

/**
 * 批量检查图片状态
 * @param urls 图片URL数组
 * @param timeout 超时时间
 * @returns Promise<Array<{url: string, status: 'success' | 'error' | 'timeout'}>>
 */
export function batchCheckImageStatus(
  urls: string[], 
  timeout = 5000
): Promise<Array<{url: string, status: 'success' | 'error' | 'timeout'}>> {
  const promises = urls.map(url => 
    getImageLoadStatus(url, timeout).then(status => ({ url, status }))
  )
  return Promise.all(promises)
}
