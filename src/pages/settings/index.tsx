import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { getStatusBarHeight, getNavBarHeight, getMenuButtonBoundingClientRect } from '@/utils/system'
import backIcon from '@/assets/iconfont/arrow-left.png'
import { Image } from '@tarojs/components'
import './index.less'

// 从package.json获取版本号
const APP_VERSION = '1.0.0'

export default function Settings() {
  // 顶部导航栏高度（状态栏+胶囊按钮）
  const statusBarHeight = getStatusBarHeight()
  const navbarHeight = getNavBarHeight()
  const navbarHeightPx = `${statusBarHeight + navbarHeight}PX`

  // 获取胶囊按钮信息
  const menuInfo = getMenuButtonBoundingClientRect()
  const menuHeight = menuInfo.height
  const menuWidth = menuInfo.width

  useLoad(() => {
    console.log('Settings page loaded.')
  })

  // 返回
  const goBack = () => {
    Taro.navigateBack()
  }

  // 联系开发者
  const contactDeveloper = () => {
    Taro.showActionSheet({
      itemList: ['复制邮箱地址', '复制微信号', '意见反馈'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            // 复制邮箱
            Taro.setClipboardData({
              data: 'developer@llm-travel.com',
              success: () => {
                Taro.showToast({
                  title: '邮箱已复制',
                  icon: 'success'
                })
              }
            })
            break
          case 1:
            // 复制微信号
            Taro.setClipboardData({
              data: 'llm-travel-dev',
              success: () => {
                Taro.showToast({
                  title: '微信号已复制',
                  icon: 'success'
                })
              }
            })
            break
          case 2:
            // 意见反馈
            Taro.showModal({
              title: '意见反馈',
              content: '感谢您的反馈！\n请通过邮箱或微信联系我们',
              showCancel: false,
              confirmText: '好的'
            })
            break
        }
      }
    })
  }

  // 检查版本
  const checkVersion = () => {
    Taro.showModal({
      title: '版本信息',
      content: `当前版本：v${APP_VERSION}\n这是最新版本\n\n🚀 智能旅游规划助手\n让您的旅行更轻松！`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '检查更新',
      success: function (res) {
        if (res.confirm) {
          // 模拟检查更新
          Taro.showLoading({
            title: '检查中...'
          })
          setTimeout(() => {
            Taro.hideLoading()
            Taro.showToast({
              title: '已是最新版本',
              icon: 'success'
            })
          }, 1500)
        }
      }
    })
  }

  // 清除缓存
  const clearCache = () => {
    Taro.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？这将删除聊天记录和临时文件。',
      success: function (res) {
        if (res.confirm) {
          Taro.showLoading({
            title: '清除中...'
          })
          setTimeout(() => {
            Taro.hideLoading()
            Taro.showToast({
              title: '缓存已清除',
              icon: 'success'
            })
          }, 1000)
        }
      }
    })
  }

  // 关于我们
  const aboutUs = () => {
    Taro.showModal({
      title: '关于我们',
      content: `
        🚀 智能旅游规划助手
        我们致力于为用户提供最智能、最便捷的旅行规划服务。只需输入目的地和天数，就能为您量身定制完美的旅行攻略。
        适合个人游、家庭游、情侣游等各种出行需求。
      `,
      showCancel: false,
      confirmText: '知道了'
    })
  }

  // 隐私政策
  const privacyPolicy = () => {
    Taro.showModal({
      title: '隐私政策',
      content: `
        我们非常重视您的隐私保护：
        • 不会收集您的个人敏感信息
        • 聊天记录仅保存在本地设备
        • 不会向第三方分享您的数据
        • 您可以随时删除本地数据
      `,
      showCancel: false,
      confirmText: '我知道了'
    })
  }

  // 用户协议
  const userAgreement = () => {
    Taro.showModal({
      title: '用户协议',
      content: `
        感谢您使用智能旅游规划助手！
        使用本应用即表示您同意：
          • 合理使用本应用功能
          • 不进行恶意操作
          • 遵守相关法律法规
        我们将持续优化服务体验。
      `,
      showCancel: false,
      confirmText: '同意'
    })
  }

  // 退出登录
  const logout = () => {
    Taro.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: function (res) {
        if (res.confirm) {
          // TODO: 清除用户数据
          Taro.showToast({
            title: '已退出登录',
            icon: 'success'
          })
          // 跳转到登录页面或首页
          setTimeout(() => {
            Taro.reLaunch({
              url: '/pages/layout/index'
            })
          }, 1500)
        }
      }
    })
  }

  return (
    <View className='settings-wrapper'>
      {/* 自定义导航栏 */}
      <View
        className='navbar-wrapper'
        style={{
          height: navbarHeightPx
        }}
      >
        {/* 返回 */}
        <View
          className='navbar-left'
          style={{
            width: `${menuHeight}PX`,
            height: `${menuHeight}PX`,
            marginTop: `${statusBarHeight}PX`
          }}
          onClick={() => goBack()}
        >
          <Image className='navbar-left-icon' src={backIcon} />
        </View>

        {/* 设置 */}
        <View
          className='navbar-center'
          style={{
            height: `${menuHeight}PX`,
            marginTop: `${statusBarHeight}PX`,
            marginRight: `${menuWidth + 16}PX`
          }}
        >
          <Text>设置</Text>
        </View>
      </View>

      {/* 设置内容 */}
      <View className='settings-content'>
        {/* 设置选项 */}
        <View className='settings-section'>
          <View className='settings-item' onClick={contactDeveloper}>
            <Text className='settings-item-text'>联系开发者</Text>
            <Text className='settings-item-arrow'>›</Text>
          </View>
          
          <View className='settings-item' onClick={checkVersion}>
            <View className='settings-item-content'>
              <Text className='settings-item-text'>检查版本</Text>
              <Text className='settings-item-version'>v{APP_VERSION}</Text>
            </View>
            <Text className='settings-item-arrow'>›</Text>
          </View>
        </View>

        {/* 数据管理 */}
        <View className='settings-section'>
          <View className='settings-item' onClick={clearCache}>
            <Text className='settings-item-text'>清除缓存</Text>
            <Text className='settings-item-arrow'>›</Text>
          </View>
        </View>

        {/* 其他 */}
        <View className='settings-section'>
          <View className='settings-item' onClick={aboutUs}>
            <Text className='settings-item-text'>关于我们</Text>
            <Text className='settings-item-arrow'>›</Text>
          </View>
          
          <View className='settings-item' onClick={privacyPolicy}>
            <Text className='settings-item-text'>隐私政策</Text>
            <Text className='settings-item-arrow'>›</Text>
          </View>
          
          <View className='settings-item' onClick={userAgreement}>
            <Text className='settings-item-text'>用户协议</Text>
            <Text className='settings-item-arrow'>›</Text>
          </View>
        </View>

        {/* 退出登录 */}
        <View className='logout-section'>
          <View className='logout-btn' onClick={logout}>
            <Text className='logout-text'>退出登录</Text>
          </View>
        </View>

        {/* 版权信息 */}
        <View className='copyright-section'>
          <Text className='copyright-text'>© 2025 旅团子</Text>
          <Text className='copyright-text'>让您的旅行更轻松</Text>
        </View>
      </View>
    </View>
  )
} 