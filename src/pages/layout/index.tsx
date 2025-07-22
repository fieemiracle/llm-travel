import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Navbar from '@/components/navbar'
import { RouterName } from '@/utils/enum'
import { commonStore, chatStore } from '@/store'
import Home from '@/components/home'
import Chat from '@/components/chat'
import './index.less'

export default function Layout() {
  useLoad(() => {

  })

  const currentRouteName = commonStore.getCurrentRouteName()
  const setQueryText = (value: string) => {
    console.log('queryText>>>>>>', value);
    chatStore.setQueryText(value)
    commonStore.setCurrentRouteName(RouterName.CHAT)
  }

  return (
    <View className='layout-wrapper'>
      <Navbar />
      <View className='layout-content'>
        {
          currentRouteName === RouterName.HOME && (
            <Home
              getTipText={(tipText) => setQueryText(tipText)}
              getInputValue={(inputText) => setQueryText(inputText)}
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
