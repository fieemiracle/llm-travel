import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { RouterName } from '@/utils/router'
import Index from '@/components/home'
import Chat from '@/components/chat'
import './index.less'

export default function Layout () {
  useLoad(() => {
    
  })

  const [routeName, setRouteName] = useState(RouterName.INDEX)
  const getRouteName = (pathname: string) => {
    console.log('onRouteChange===', pathname)
    setRouteName(pathname)
  }

  return (
    <View className='home-wrapper'>
      <Navbar onRouteChange={(pathname) => getRouteName(pathname)} />
      <View className='home-content'>
        {routeName === RouterName.INDEX && <Index />}
        {routeName === RouterName.CHAT && <Chat />}
      </View>
    </View>
  )
}
