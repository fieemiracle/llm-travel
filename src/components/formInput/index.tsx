import { View, Textarea, Image } from '@tarojs/components'
import { useState } from 'react'
import { InputType } from '@/utils/enum'
import { MIN_INPUT_HEIGHT, MAX_LINE_COUNT } from '@/utils/const'
import keyboardIcon from '@/assets/iconfont/keyboard.png'
import audioIcon from '@/assets/iconfont/audio.png'
import sendIcon from '@/assets/iconfont/send.png'
import './index.less'


type FormInputProps = {
  onSend: (value: string) => void
}

export default function FormInput(props: FormInputProps) {

  // 状态管理
  const [inputType, setInputType] = useState(InputType.KEYBOARD)
  const [inputValue, setInputValue] = useState('')
  const [inputLine, setInputLine] = useState(1)

  const onSend = () => {
    console.log('onSend')
  }

  const onInput = (e: any) => {
    console.log(e, 'onInput')
    setInputValue(e.detail.value)
    props.onSend(e.detail.value)
  }

  const onLineChange = (e: any) => {
    const { lineCount } = e.detail || {}
    setInputLine(lineCount > MAX_LINE_COUNT ? MAX_LINE_COUNT : lineCount)
  }

  return (
    <View className='form-input-wrapper'>
      <View className='form-input-item'>
        <View className='form-input-item-left'>
          {
            inputType === InputType.KEYBOARD && (
              <View className='form-input-item-left-icon' onClick={() => setInputType(InputType.AUDIO)}>
                <Image src={audioIcon} className='form-input-item-left-icon-img' />
              </View>
            )
          }
          {
            inputType === InputType.AUDIO && (
              <View className='form-input-item-left-icon' onClick={() => setInputType(InputType.KEYBOARD)}>
                <Image src={keyboardIcon} className='form-input-item-left-icon-img' />
              </View>
            )
          }
        </View>
        <View className='form-input-item-center'>
          <Textarea
            className='form-input-item-center-textarea'
            value={inputValue}
            placeholder='可以问我任何关于出行的问题～'
            placeholderClass='form-input-item-center-textarea-placeholder'
            style={{ height: inputLine * MIN_INPUT_HEIGHT + 'rpx' }}
            onInput={onInput}
            onLineChange={onLineChange}
          />
        </View>
        {
          inputValue && (
            <View className='form-input-item-right'>
              <View className='form-input-item-right-icon' onClick={() => onSend()}>
                <Image src={sendIcon} className='form-input-item-right-icon-img' />
              </View>
            </View>
          )
        }
      </View>
    </View>
  )
}