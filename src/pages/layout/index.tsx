import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { RouterName } from '@/utils/enum'
import Home from '@/components/home'
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

  const [query, setQuery] = useState('')
  const setQueryText = (value: string) => {
    setQuery(value)
    setRouteName(RouterName.CHAT)
  }

  return (
    <View className='layout-wrapper'>
      <Navbar onRouteChange={(pathname) => getRouteName(pathname)} />
      <View className='layout-content'>
        {routeName === RouterName.INDEX && <Home getTipText={(value) => setQueryText(value)} getInputValue={(value) => setQueryText(value)} />}
        {routeName === RouterName.CHAT && <Chat queryText={query} />}
      </View>
    </View>
  )
}
