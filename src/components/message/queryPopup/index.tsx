import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import IconFont from '@/components/common/iconfont'
import { ICONFONT_ICONS } from '@/utils/iconfont'
import Taro from '@tarojs/taro'
import { COPY_FAIL_TEXT, COPY_SUCCESS_TEXT } from '@/utils/const'
import { setQuickInputText } from '@/store/actions/common'
import { useDispatch } from 'react-redux'
import './index.less'

type QueryPopupProps = {
  queryText: string
}

export default function QueryPopup (props: QueryPopupProps) {
  useLoad(() => {
    console.log('QueryPopup useLoad', props.queryText)
  })

  const dispatch = useDispatch()

  // 复制
  const onCopy = () => {
    Taro.setClipboardData({
      data: props.queryText,
      success: () => {
        Taro.showToast({
          title: COPY_SUCCESS_TEXT,
          icon: 'success',
        })
      },
      fail: () => {
        Taro.showToast({
          title: COPY_FAIL_TEXT,
          icon: 'error',
        })
      },
    })
  }
  
  // 编辑
  const onEdit = () => {
    dispatch(setQuickInputText(props.queryText))
  }

  return (
    <View className='query-popup'>
      <View className='query-popup-content'>
        <Text className='query-popup-content-text'>{props.queryText}</Text>
      </View>
      <View className='query-popup-footer'>
        <View className='query-popup-footer-item' onClick={onCopy}>
          <IconFont 
            type={ICONFONT_ICONS.COPY} 
          />
        </View>
        <View className='query-popup-footer-item' onClick={onEdit}>
          <IconFont 
            type={ICONFONT_ICONS.EDIT} 
          />
        </View>
      </View>
    </View>
  )
}