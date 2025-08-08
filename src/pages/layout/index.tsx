import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Navbar from '@/components/common/navbar'
import { RouterName } from '@/utils/enum'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setQueryText } from '@/store/actions/chat'
import { setCurrentRouteName } from '@/store/actions/common'
import Home from '@/components/home'
import Chat from '@/components/chat'
import { useState } from 'react'
import './index.less'

export default function Layout() {
  useLoad(() => {
    // const { history } = JSON.parse(decodeURIComponent(options.history))
    // console.log('history', history)
  })

  const currentRouteName = useSelector((state: RootState) => state.common.currentRouteName)
  const dispatch = useDispatch()
  const changeQueryText = (value: string) => {
    dispatch(setQueryText(value))
    dispatch(setCurrentRouteName(RouterName.CHAT))
  }

  const [currentHeaderHeight, setCurrentHeaderHeight] = useState(0)

  return (
    <View className='layout-wrapper'>
      <Navbar getNavbarHeight={(headerHeight: number) => setCurrentHeaderHeight(headerHeight)} />
      <View className='layout-content' style={{ height: `calc(100vh - ${currentHeaderHeight * 2}rpx)` }}>
        {
          currentRouteName === RouterName.HOME && (
            <Home
              getTipText={(tipText) => changeQueryText(tipText)}
              getInputValue={(inputText) => changeQueryText(inputText)}
            />
          )
        }
        {
          currentRouteName === RouterName.CHAT && (
            <Chat />
          )
        }
      </View>
    </View>
  )
}
