import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import IconFont from '@/components/common/iconfont'
import { ICONFONT_ICONS } from '@/utils/iconfont'
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
      <View className='query-popup-footer'>
        <View className='query-popup-footer-item'>
          <IconFont 
            type={ICONFONT_ICONS.COPY} 
          />
        </View>
        <View className='query-popup-footer-item'>
          <IconFont 
            type={ICONFONT_ICONS.EDIT} 
          />
        </View>
      </View>
    </View>
  )
}