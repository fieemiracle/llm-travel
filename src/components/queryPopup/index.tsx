import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

type QueryPopupProps = {
  queryText: string
}

export default function QueryPopup (props: QueryPopupProps) {
  useLoad(() => {
    console.log('QueryPopup useLoad', props.queryText)
  })
  return (
    <View className='query-popup'>
      <View className='query-popup-content'>
        <Text className='query-popup-content-text'>{props.queryText}</Text>
      </View>
    </View>
  )
}