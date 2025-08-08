import Taro from '@tarojs/taro'

/**
 * 应用调起工具类
 * 用于调起美团、大众点评等第三方应用
 */

// 应用配置
const APP_CONFIGS = {
  // 美团
  meituan: {
    name: '美团',
    schemes: {
      // 美团搜索页面
      search: 'meituan://search?keyword=',
      // 美团商家详情页
      shop: 'meituan://shop?shopId=',
      // 美团酒店页面
      hotel: 'meituan://hotel?hotelId=',
      // 美团美食页面
      food: 'meituan://food?keyword=',
      // 美团景点页面
      scenic: 'meituan://scenic?keyword='
    },
    // 应用商店链接
    storeUrl: {
      ios: 'https://apps.apple.com/cn/app/mei-tuan-wai-mai-dian-ping/id423084029',
      android: 'https://play.google.com/store/apps/details?id=com.sankuai.meituan'
    }
  },
  // 大众点评
  dianping: {
    name: '大众点评',
    schemes: {
      // 大众点评搜索页面
      search: 'dianping://search?keyword=',
      // 大众点评商家详情页
      shop: 'dianping://shop?shopId=',
      // 大众点评酒店页面
      hotel: 'dianping://hotel?hotelId=',
      // 大众点评美食页面
      food: 'dianping://food?keyword=',
      // 大众点评景点页面
      scenic: 'dianping://scenic?keyword='
    },
    // 应用商店链接
    storeUrl: {
      ios: 'https://apps.apple.com/cn/app/da-zhong-dian-ping/id340934251',
      android: 'https://play.google.com/store/apps/details?id=com.dianping.v1'
    }
  }
}

/**
 * 获取当前平台
 */
function getPlatform(): 'ios' | 'android' | 'weapp' {
  const systemInfo = Taro.getSystemInfoSync()
  const platform = systemInfo.platform.toLowerCase()
  
  if (platform.includes('ios')) return 'ios'
  if (platform.includes('android')) return 'android'
  return 'weapp'
}

/**
 * 调起美团应用
 * @param options 调起选项
 */
export async function launchMeituan(options: {
  type: 'search' | 'shop' | 'hotel' | 'food' | 'scenic'
  keyword?: string
  shopId?: string
  hotelId?: string
  fallback?: boolean // 是否在调起失败时跳转到应用商店
}) {
  const { type, keyword, shopId, hotelId, fallback = true } = options
  const platform = getPlatform()
  
  try {
    // 尝试调起美团小程序
    await Taro.navigateToMiniProgram({
      appId: 'wx2c348cf579062e56', // 美团的微信小程序 appId
      path: `pages/search/search?keyword=${encodeURIComponent(keyword || '')}`,
      success: () => {
        Taro.showToast({
          title: '已打开美团',
          icon: 'success'
        })
      },
      fail: (error) => {
        console.log('调起美团失败:', error)
        if (fallback) {
          // 跳转到应用商店
          openAppStore('meituan', platform)
        } else {
          Taro.showToast({
            title: '美团未安装',
            icon: 'none'
          })
        }
      }
    })
  } catch (error) {
    console.log('调起美团应用失败:', error)
    if (fallback) {
      openAppStore('meituan', platform)
    }
  }
}

/**
 * 调起大众点评应用
 * @param options 调起选项
 */
export async function launchDianping(options: {
  type: 'search' | 'shop' | 'hotel' | 'food' | 'scenic'
  keyword?: string
  shopId?: string
  hotelId?: string
  fallback?: boolean // 是否在调起失败时跳转到应用商店
}) {
  const { type, keyword, shopId, hotelId, fallback = true } = options
  const platform = getPlatform()
  
  try {
    // 尝试调起大众点评小程序
    await Taro.navigateToMiniProgram({
      appId: 'wxde8ac0a21135c07d', // 大众点评的微信小程序 appId
      path: `pages/search/search?keyword=${encodeURIComponent(keyword || '')}`,
      success: () => {
        Taro.showToast({
          title: '已打开大众点评',
          icon: 'success'
        })
      },
      fail: (error) => {
        console.log('调起大众点评失败:', error)
        if (fallback) {
          // 跳转到应用商店
          openAppStore('dianping', platform)
        } else {
          Taro.showToast({
            title: '大众点评未安装',
            icon: 'none'
          })
        }
      }
    })
  } catch (error) {
    console.log('调起大众点评应用失败:', error)
    if (fallback) {
      openAppStore('dianping', platform)
    }
  }
}

/**
 * 打开应用商店
 * @param appName 应用名称
 * @param platform 平台
 */
function openAppStore(appName: 'meituan' | 'dianping', platform: 'ios' | 'android' | 'weapp') {
  const appConfig = APP_CONFIGS[appName]
  const storeUrl = appConfig.storeUrl[platform] || appConfig.storeUrl.android
  
  Taro.showModal({
    title: `打开${appConfig.name}`,
    content: `检测到您未安装${appConfig.name}，是否前往下载？`,
    confirmText: '去下载',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        // 在小程序中，我们可以复制链接到剪贴板
        Taro.setClipboardData({
          data: storeUrl,
          success: () => {
            Taro.showToast({
              title: '下载链接已复制',
              icon: 'success'
            })
          }
        })
      }
    }
  })
}

/**
 * 智能调起应用（根据推荐项目类型自动选择）
 * @param item 推荐项目
 */
export function smartLaunchApp(item: {
  address: string
  type: string
  location?: {
    latitude: number
    longitude: number
  }
}) {
  const { address, type } = item
  
  // 根据类型选择调起的应用
  if (type === '景点') {
    // 景点优先使用大众点评
    launchDianping({
      type: 'scenic',
      keyword: address
    })
  } else if (type === '美食') {
    // 美食优先使用美团
    launchMeituan({
      type: 'food',
      keyword: address
    })
  } else if (type === '住宿') {
    // 住宿优先使用美团
    launchMeituan({
      type: 'hotel',
      keyword: address
    })
  } else {
    // 其他类型默认使用美团
    launchMeituan({
      type: 'search',
      keyword: address
    })
  }
}

/**
 * 显示应用选择弹窗
 * @param item 推荐项目
 */
export function showAppSelectionModal(item: {
  address: string
  type: string
  location?: {
    latitude: number
    longitude: number
  }
}) {
  const { address, type } = item
  
  Taro.showActionSheet({
    itemList: ['美团', '大众点评'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          // 美团
          launchMeituan({
            type: type === '景点' ? 'scenic' : type === '美食' ? 'food' : 'search',
            keyword: address
          })
          break
        case 1:
          // 大众点评
          launchDianping({
            type: type === '景点' ? 'scenic' : type === '美食' ? 'food' : 'search',
            keyword: address
          })
          break
      }
    }
  })
} 