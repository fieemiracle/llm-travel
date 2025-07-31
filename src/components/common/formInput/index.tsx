import { View, Textarea, Image } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { InputType, InputTypeValues } from '@/utils/enum'
import { MIN_INPUT_HEIGHT, MAX_LINE_COUNT } from '@/utils/const'
import keyboardIcon from '@/assets/iconfont/keyboard.png'
import audioIcon from '@/assets/iconfont/audio.png'
import sendIcon from '@/assets/iconfont/send.png'
import './index.less'


type FormInputProps = {
  onSend: (value: string) => void
  onHeightChange?: (height: number) => void // 新增高度变化回调
}

export default function FormInput(props: FormInputProps) {

  // 状态管理
  const [inputType, setInputType] = useState<InputTypeValues>(InputType.KEYBOARD)
  const [inputValue, setInputValue] = useState('')
  const [inputLine, setInputLine] = useState(1)
  const [wrapperHeight, setWrapperHeight] = useState(0) // 新增高度状态
  console.log('wrapperHeight>>>>>>>', wrapperHeight)
  const wrapperRef = useRef<any>(null) // 新增ref

  // 获取元素高度的方法
  const getWrapperHeight = () => {
    const query = Taro.createSelectorQuery()
    query.select('.form-input-wrapper').boundingClientRect((rect) => {
      if (rect && Array.isArray(rect)) {
        // 如果是数组，取第一个元素
        const firstRect = rect[0]
        if (firstRect) {
          const height = firstRect.height
          setWrapperHeight(height)
          // 调用父组件的高度变化回调
          props.onHeightChange?.(height)
          console.log('form-input-wrapper 高度1:', height, 'px')
        }
      } else if (rect && !Array.isArray(rect)) {
        // 如果是单个对象
        const height = rect.height
        setWrapperHeight(height)
        // 调用父组件的高度变化回调
        props.onHeightChange?.(height)
        console.log('form-input-wrapper 高度2:', height, 'px')
      }
    }).exec()
  }

  // 监听输入变化时更新高度
  useEffect(() => {
    // 使用 setTimeout 确保 DOM 更新后再获取高度
    const timer = setTimeout(() => {
      getWrapperHeight()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [inputValue, inputLine, inputType])

  // 组件挂载时获取初始高度
  useEffect(() => {
    getWrapperHeight()
  }, [])

  const onSend = () => {
    props.onSend(inputValue)
    resetInput()
  }

  const onInput = (e: any) => {
    setInputValue(e.detail.value)
  }

  const onLineChange = (e: any) => {
    const { lineCount } = e.detail || {}
    setInputLine(lineCount > MAX_LINE_COUNT ? MAX_LINE_COUNT : lineCount)
  }

  const resetInput = () => {
    setInputValue('')
    setInputLine(1)
  }

  return (
    <View className='form-input-wrapper' ref={wrapperRef}>
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
          {
            inputType === InputType.KEYBOARD && (
              <Textarea
                className='form-input-item-center-textarea'
                value={inputValue}
                placeholder='可以问我任何关于出行的问题～'
                placeholderClass='form-input-item-center-textarea-placeholder'
                style={{ height: inputLine * MIN_INPUT_HEIGHT + 'rpx' }}
                onInput={onInput}
                onLineChange={onLineChange}
              />
            )
          }
          {
            inputType === InputType.AUDIO && (
              <View className='form-input-item-center-audio'>按住说话</View>
            )
          }
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

/*
使用示例：

// 在父组件中使用
import FormInput from '@/components/formInput'

function ParentComponent() {
  const [inputHeight, setInputHeight] = useState(0)

  const handleHeightChange = (height: number) => {
    setInputHeight(height)
    console.log('输入框高度变化:', height)
    // 可以根据高度变化做其他处理，比如调整页面布局
  }

  const handleSend = (value: string) => {
    console.log('发送消息:', value)
  }

  return (
    <View>
      <FormInput 
        onSend={handleSend}
        onHeightChange={handleHeightChange}
      />
      <View>当前输入框高度: {inputHeight}px</View>
    </View>
  )
}
*/