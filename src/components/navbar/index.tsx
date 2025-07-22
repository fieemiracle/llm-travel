import { View, Text } from '@tarojs/components'
import { getStatusBarHeight, getNavBarHeight, getMenuButtonBoundingClientRect } from '@/utils/system'
import { RouterName, RouterNameValues } from '@/utils/enum'
import { commonStore } from '@/store'
import Taro from '@tarojs/taro'
import './index.less'

interface NavbarProps {
}

export default function Navbar (props: NavbarProps) {
  // 顶部导航栏高度（状态栏+胶囊按钮）
  const statusBarHeight = getStatusBarHeight()
  const navbarHeight = getNavBarHeight()
  const navbarHeightPx = `${statusBarHeight + navbarHeight}PX`

  // 获取胶囊按钮信息
  const menuInfo = getMenuButtonBoundingClientRect()
  const menuHeight = menuInfo.height
  const menuWidth = menuInfo.width
  console.log('menuInfo===', menuInfo)

  // 当前选中的路由，默认是 RouterName.INDEX
  const currentRouteName = commonStore.getCurrentRouteName()

  // 路由切换
  const changeRoute = (pathname: RouterNameValues) => {
    commonStore.setCurrentRouteName(pathname)
    if (pathname === RouterName.USER) {
      Taro.navigateTo({
        url: `/pages/user/index`
      })
    }
  }

  return (
    <View
      className='navbar-wrapper'
      style={{
        height: navbarHeightPx
      }}
    >
      {/* 个人中心 */}
      <View
        className='navbar-left'
        style={{
          width: `${menuHeight}PX`,
          height: `${menuHeight}PX`,
          marginTop: `${statusBarHeight}PX`
        }}
        onClick={() => changeRoute(RouterName.USER)}
      ></View>

      {/* 灵感 ｜ 对话 */}
      <View
        className='navbar-center'
        style={{
          height: `${menuHeight}PX`,
          marginTop: `${statusBarHeight}PX`,
          marginRight: `${menuWidth + 16}PX`
        }}
      >
        <View
          className={`navbar-center-title ${currentRouteName === RouterName.HOME ? 'navbar-center-title-selected' : ''}`}
          onClick={() => changeRoute(RouterName.HOME)}
        >
          <Text>灵感</Text>
        </View>
        <View
          className={`navbar-center-title ${currentRouteName === RouterName.CHAT ? 'navbar-center-title-selected' : ''}`}
          onClick={() => changeRoute(RouterName.CHAT)}
        >
          <Text>对话</Text>
        </View>
      </View>
    </View>
  )
}
