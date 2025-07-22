import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import UserNavBar from '@/components/userNavBar'
import './index.less'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='user-wrapper'>
      <UserNavBar />
      <Text>个人中心</Text>
    </View>
  )
}
