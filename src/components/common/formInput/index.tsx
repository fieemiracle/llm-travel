import { View, Textarea } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { GlobalStatus, InputType, InputTypeValues } from '@/utils/enum'
import { MIN_INPUT_HEIGHT, MAX_LINE_COUNT } from '@/utils/const'
import IconFont from '@/components/common/iconfont'
import { ICONFONT_ICONS } from '@/utils/iconfont'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { setQuickInputText } from '@/store/actions/common'
import { useDispatch } from 'react-redux'
import './index.less'

type FormInputProps = {
  onSend: (value: string) => void
  onHeightChange?: (height: number) => void // 新增高度变化回调
}

export default function FormInput(props: FormInputProps) {
  // store
  const quickInputText = useSelector((state: RootState) => state.common.quickInputText)
  const dispatch = useDispatch()

  // state
  const [inputType, setInputType] = useState<InputTypeValues>(InputType.KEYBOARD)
  const [inputValue, setInputValue] = useState('')
  const [inputLine, setInputLine] = useState(1)
  const wrapperRef = useRef<any>(null) // 新增ref

  const globalStatus = useSelector((state: RootState) => state.common.globalStatus)

  // 获取元素高度的方法
  const getWrapperHeight = () => {
    const query = Taro.createSelectorQuery()
    query.select('.form-input-wrapper').boundingClientRect((rect) => {
      if (rect && Array.isArray(rect)) {
        // 如果是数组，取第一个元素
        const firstRect = rect[0]
        if (firstRect) {
          const height = firstRect.height
          // 调用父组件的高度变化回调
          props.onHeightChange?.(height)
        }
      } else if (rect && !Array.isArray(rect)) {
        // 如果是单个对象
        const height = rect.height
        // 调用父组件的高度变化回调
        props.onHeightChange?.(height)
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

  useEffect(() => {
    if (quickInputText) {
      setInputValue(quickInputText)
      dispatch(setQuickInputText(''))
    }
  }, [quickInputText])

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
                {/* <Image src={audioIcon} className='form-input-item-left-icon-img' /> */}
                <IconFont 
                  type={ICONFONT_ICONS.AUDIO}
                  color='#90F9F2'
                  size={24}
                />
              </View>
            )
          }
          {
            inputType === InputType.AUDIO && (
              <View className='form-input-item-left-icon' onClick={() => setInputType(InputType.KEYBOARD)}>
                {/* <Image src={keyboardIcon} className='form-input-item-left-icon-img' /> */}
                <IconFont 
                  type={ICONFONT_ICONS.KEYBOARD}
                  color='#90F9F2'
                  size={24}
                />
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
          inputValue && globalStatus === GlobalStatus.FINISHED && (
            <View className='form-input-item-right'>
              <View className='form-input-item-right-icon' onClick={() => onSend()}>
                <IconFont 
                  type={ICONFONT_ICONS.SEND}
                  color='#90F9F2'
                  size={24}
                />
              </View>
            </View>
          )
        }
        {
          inputValue && (globalStatus === GlobalStatus.STREAMING || globalStatus === GlobalStatus.LOADING) && (
            <View className='form-input-item-right'>
              <View className='form-input-item-right-icon' onClick={() => onSend()}>
                <IconFont 
                  type={ICONFONT_ICONS.STOP}
                  color='#90F9F2'
                  size={24}
                />
              </View>
            </View>
          )
        }
      </View>
    </View>
  )
}
