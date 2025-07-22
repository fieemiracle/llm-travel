import Taro from '@tarojs/taro'
import { isWeapp, isAlipay, isSwan, isToutiao } from './env'

// 标题栏通用高度
const COMMON_NAVBAR_HEIGHT = 44

// 获取系统信息
export const getSystemInfo = () => {
  const systemInfo = Taro.getSystemInfoSync()
  return systemInfo
}

/**
 * 获取系统状态栏高度（顶部时间/电量条高度）
 */
export function getStatusBarHeight(): number {
  const systemInfo = Taro.getSystemInfoSync()
  return systemInfo.statusBarHeight || 0
}

/**
 * 获取完整的导航栏高度（状态栏 + 标题栏）
 */
export function getNavBarHeight(): number {
  const systemInfo = Taro.getSystemInfoSync()
  const { statusBarHeight } = systemInfo
  
  // 微信小程序
  if (isWeapp) {
    const menu = Taro.getMenuButtonBoundingClientRect()
    return (menu.top - (statusBarHeight || 0)) * 2 + menu.height
  }
  
  // 支付宝/百度/字节跳动小程序
  if (isAlipay || isSwan || isToutiao) {
    return (statusBarHeight || 0) + COMMON_NAVBAR_HEIGHT
  }
  
  // H5 或其他平台
  return statusBarHeight || COMMON_NAVBAR_HEIGHT
}

// 获取胶囊按钮信息
export function getMenuButtonBoundingClientRect() {
  const menu = Taro.getMenuButtonBoundingClientRect()
  return menu
}
