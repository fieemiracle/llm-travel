import { View, Text } from '@tarojs/components'
import './index.less'

type AnswerPopupProps = {
  answerText: string
  isLoading: boolean
  isStreaming: boolean
  isFinished: boolean
}

const AnswerPopupStatus = {
  LOADING: '正在理解您的需求...',
  STREAMING: '正在思考...',
  FINISHED: '已深度思考',
}

export default function AnswerPopup (props: AnswerPopupProps) {

  return (
    <View className='answer-popup'>
      <View className='answer-popup-header'>
        <View className='answer-popup-header-logo'>
        </View>
        <View className='answer-popup-header-text'>
          {props.isLoading && <Text>{AnswerPopupStatus.LOADING}</Text>}
          {props.isStreaming && <Text>{AnswerPopupStatus.STREAMING}</Text>}
          {props.isFinished && <Text>{AnswerPopupStatus.FINISHED}</Text>}
        </View>
      </View>
      {
        props.answerText ? (
          <View className='answer-popup-content'>
              <View className='answer-popup-content-item'>
                <Text>{props.answerText}</Text>
              </View>
          </View>
        ) : (
          <View></View>
        )
      }
      {
        props.isFinished && (
          <View className='answer-popup-footer'>
            <View className='answer-popup-footer-feedback'>
              <View className='answer-popup-footer-feedback-up'>
                <Text>👍</Text>
              </View>
              <View className='answer-popup-footer-feedback-down'>
                <Text>👎</Text>
              </View>
            </View>
            <View className='answer-popup-footer-regenerate'>
              <Text>重新生成</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}