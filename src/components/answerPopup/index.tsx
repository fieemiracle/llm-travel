import { View, Text } from '@tarojs/components'
import './index.less'

type AnswerPopupProps = {
  answerText: string
}

export default function AnswerPopup (props: AnswerPopupProps) {
  return (
    <View className='answer-popup'>
      <View className='answer-popup-content'>
        <View className='answer-popup-content-item'>
          <View className='answer-popup-content-item-title'>
            <Text>{props.answerText}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}