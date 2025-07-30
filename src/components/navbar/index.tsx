import { View, Text, Image } from '@tarojs/components'
import { getStatusBarHeight, getNavBarHeight, getMenuButtonBoundingClientRect } from '@/utils/system'
import { RouterName, RouterNameValues } from '@/utils/enum'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setCurrentRouteName, setUserInfo } from '@/store/actions/common'
import Taro from '@tarojs/taro'
import './index.less'

interface NavbarProps {
  getNavbarHeight?: (height: number) => void
}

export default function Navbar (props: NavbarProps) {
  // 顶部导航栏高度（状态栏+胶囊按钮）
  const statusBarHeight = getStatusBarHeight()
  const navbarHeight = getNavBarHeight()
  const navbarHeightPx = `${statusBarHeight + navbarHeight}PX`
  props?.getNavbarHeight?.(statusBarHeight + navbarHeight)

  // 获取胶囊按钮信息
  const menuInfo = getMenuButtonBoundingClientRect()
  const menuHeight = menuInfo.height
  const menuWidth = menuInfo.width
  console.log('menuInfo===', props, menuInfo)

  // 当前选中的路由，默认是 RouterName.INDEX
  const currentRouteName = useSelector((state: RootState) => state.common.currentRouteName)
  const dispatch = useDispatch()
  const currentUserInfo = useSelector((state: RootState) => state.common.userInfo)

  // 路由切换
  const changeRoute = async (pathname: RouterNameValues) => {
    dispatch(setCurrentRouteName(pathname))
    if (pathname === RouterName.USER) {
      // 判断本地是否有用户信息
      const userInfo = Taro.getStorageSync('userInfo')
      if (!userInfo) {
        // 未登录，调起授权登录窗口
        console.log('未登录，调起授权登录窗口')
        try {
          const profile = await Taro.getUserProfile({
            desc: '用于完善会员资料'
          })
          console.log('profile===', profile)
          const loginRes = await Taro.login()
          console.log('loginRes===', loginRes)
          // 这里需要将 code 和 profile 发送到后端换取 session_key 并存储
          // 假设有个 loginByCode 方法处理后端交互
          // await loginByCode(loginRes.code, profile.userInfo)
          Taro.setStorageSync('userInfo', profile.userInfo)
          dispatch(setUserInfo(profile.userInfo))
          // 登录成功后跳转个人中心
          Taro.navigateTo({
            url: `/pages/user/index`
          })
        } catch (err) {
          // 用户拒绝授权，保持现状
          Taro.showToast({ title: '请授权登录后使用', icon: 'none' })
        }
      } else {
        // 已登录，校验 session 是否有效
        try {
          await Taro.checkSession()
          // session 有效，跳转个人中心
          Taro.navigateTo({
            url: `/pages/user/index`
          })
        } catch (err) {
          // session 失效，重新登录
          try {
            const profile = await Taro.getUserProfile({
              desc: '用于完善会员资料'
            })
            const loginRes = await Taro.login()
            console.log('loginRes===', loginRes)
            // await loginByCode(loginRes.code, profile.userInfo)
            Taro.setStorageSync('userInfo', profile.userInfo)
            Taro.navigateTo({
              url: `/pages/user/index`
            })
          } catch (error) {
            Taro.showToast({ title: '请授权登录后使用', icon: 'none' })
          }
        }
      }
      return
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
      >
        {currentUserInfo?.avatarUrl && (
          <Image className='navbar-left-avatar' src={currentUserInfo.avatarUrl}></Image>
        )}
      </View>

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
