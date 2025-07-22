import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Navbar from '@/components/navbar'
import { RouterName } from '@/utils/enum'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setQueryText } from '@/store/actions/chat'
import { setCurrentRouteName } from '@/store/actions/common'
import Home from '@/components/home'
import Chat from '@/components/chat'
import './index.less'

export default function Layout() {
  useLoad(() => {

  })

  const currentRouteName = useSelector((state: RootState) => state.common.currentRouteName)
  const dispatch = useDispatch()
  const changeQueryText = (value: string) => {
    console.log('queryText>>>>>>', value);
    dispatch(setQueryText(value))
    dispatch(setCurrentRouteName(RouterName.CHAT))
  }

  return (
    <View className='layout-wrapper'>
      <Navbar />
      <View className='layout-content'>
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
