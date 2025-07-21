import { View, Text } from '@tarojs/components'
import { getStatusBarHeight, getNavBarHeight, getMenuButtonBoundingClientRect } from '@/utils/system'
import { RouterName } from '@/utils/router'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.less'

interface NavbarProps {
  onRouteChange: (pathname: string) => void
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
  const [selected, setSelected] = useState(RouterName.INDEX)

  // 路由切换
  const changeRoute = (pathname: string) => {
    setSelected(pathname)
    if (pathname === RouterName.USER) {
      Taro.navigateTo({
        url: `/pages/user/index`
      })
    }
    props.onRouteChange(pathname)
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
          className={`navbar-center-title${selected === RouterName.INDEX ? ' navbar-center-title-selected' : ''}`}
          onClick={() => changeRoute(RouterName.INDEX)}
        >
          <Text>灵感</Text>
        </View>
        <View
          className={`navbar-center-title${selected === RouterName.CHAT ? ' navbar-center-title-selected' : ''}`}
          onClick={() => changeRoute(RouterName.CHAT)}
        >
          <Text>对话</Text>
        </View>
      </View>
    </View>
  )
}
