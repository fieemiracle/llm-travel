import { View, Text, Image } from '@tarojs/components'
import { getStatusBarHeight, getNavBarHeight, getMenuButtonBoundingClientRect } from '@/utils/system'
import Taro from '@tarojs/taro'
import backIcon from '@/assets/iconfont/arrow-left.png'
import { setCurrentRouteName } from '@/store/actions/common'
import { RouterName } from '@/utils/enum'
import { useDispatch } from 'react-redux'
import './index.less'

export default function UserNavBar () {
  // 顶部导航栏高度（状态栏+胶囊按钮）
  const statusBarHeight = getStatusBarHeight()
  const navbarHeight = getNavBarHeight()
  const navbarHeightPx = `${statusBarHeight + navbarHeight}PX`

  // 获取胶囊按钮信息
  const menuInfo = getMenuButtonBoundingClientRect()
  const menuHeight = menuInfo.height
  const menuWidth = menuInfo.width

  const dispatch = useDispatch()

  // 返回
  const goBack = () => {
    Taro.navigateBack()
    dispatch(setCurrentRouteName(RouterName.HOME))
  }

  return (
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

      {/* 个人中心 */}
      <View
        className='navbar-center'
        style={{
          height: `${menuHeight}PX`,
          marginTop: `${statusBarHeight}PX`,
          marginRight: `${menuWidth + 16}PX`
        }}
      >
        <Text>个人中心</Text>
      </View>
    </View>
  )
}
