import { View, Text, Button } from '@tarojs/components'
import { useEffect, useState } from 'react'
import './index.less'

type FloatLayoutProps = {
  isOpened: boolean
  title: string
  customDate?: string
  onClose: () => void
  openCalendar: () => void
  children?: React.ReactNode
}

const DEFAULT_TIME_OPTIONS = ['上午', '下午', '1天', '2天']
const DEFAULT_DATE_OPTIONS = [
  {
    type: 'text',
    name: '还没定'
  },
  {
    type: 'text',
    name: '今天'
  },
  {
    type: 'text',
    name: '明天'
  },
  {
    type: 'custom',
    name: '自定义'
  }
]
const DEFAULT_PURPOSE_OPTIONS = ['经典游', '约会', '遛娃', '朋友', '团建', '一人行', '家庭']

export default function FloatLayout(props: FloatLayoutProps) {
  const [selectedTime, setSelectedTime] = useState(DEFAULT_TIME_OPTIONS[1])
  const [selectedDate, setSelectedDate] = useState('还没定')
  const [selectedPurpose, setSelectedPurpose] = useState('经典游')

  const timeOptions = DEFAULT_TIME_OPTIONS
  const purposeOptions = DEFAULT_PURPOSE_OPTIONS
  const [dateOptions, setDateOptions] = useState(DEFAULT_DATE_OPTIONS)

  useEffect(() => {
    if (props.customDate) {
      setSelectedDate(props.customDate)
      setDateOptions([
        ...DEFAULT_DATE_OPTIONS.slice(0, DEFAULT_DATE_OPTIONS.length - 1),
        {
          type: 'custom',
          name: props.customDate
        }
      ])
    }
  }, [props.customDate])

  useEffect(() => {
    if (props.customDate) {
      setSelectedDate(props.customDate)
    }
  }, [props.customDate])

  const handleCreateItinerary = () => {
    console.log('创建行程:', {
      time: selectedTime,
      date: selectedDate,
      purpose: selectedPurpose
    })
    // TODO: 添加创建行程的逻辑
    props.onClose()
  }

  const handleClose = () => {
    // 重置选择状态
    setSelectedTime('下午')
    setSelectedDate('还没定')
    setSelectedPurpose('经典游')
    props.onClose()
  }

  const onSelectDate = (option: { type: string, name: string }) => {
    const { type, name } = option
    setSelectedDate(name)
    if (type === 'custom') {
      props.openCalendar()
    }
  }

  if (!props.isOpened) {
    return null
  }

  return (
    <View className="float-layout-wrapper">
      {/* 遮罩层 */}
      <View className="float-layout-mask" onClick={handleClose} />
      
      {/* 弹窗内容 */}
      <View className="float-layout-content">
        {/* 头部 */}
        <View className="float-layout-header">
          <Text className="float-layout-title">{props.title}</Text>
          <View className="float-layout-close" onClick={handleClose}>
            <Text>×</Text>
          </View>
        </View>

        {/* 弹窗主体内容 */}
        <View className="float-layout-body">
          {/* 选择出行时间 */}
          <View className="float-layout-section">
            <View className="float-layout-section-title">
              <Text className="float-layout-icon">🕐</Text>
              <Text>选择出行时间</Text>
            </View>
            <View className="float-layout-options">
              {timeOptions.map((option) => (
                <View
                  key={option}
                  className={`float-layout-option ${selectedTime === option ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(option)}
                >
                  <Text>{option}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 选择出发日期 */}
          <View className="float-layout-section">
            <View className="float-layout-section-title">
              <Text className="float-layout-icon">📅</Text>
              <Text>选择出发日期</Text>
            </View>
            <View className="float-layout-options">
              {dateOptions.map((option) => (
                <View
                  key={option.name}
                  className={`float-layout-option ${selectedDate === option.name ? 'selected' : ''}`}
                  onClick={() => onSelectDate(option)}
                >
                  <Text>{option.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 选择出行目的 */}
          <View className="float-layout-section">
            <View className="float-layout-section-title">
              <Text className="float-layout-icon">🎯</Text>
              <Text>选择出行目的</Text>
            </View>
            <View className="float-layout-options purpose-options">
              {purposeOptions.map((option) => (
                <View
                  key={option}
                  className={`float-layout-option ${selectedPurpose === option ? 'selected' : ''}`}
                  onClick={() => setSelectedPurpose(option)}
                >
                  <Text>{option}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 底部按钮 */}
        <View className="float-layout-footer">
          <Button 
            className="float-layout-create-btn"
            onClick={handleCreateItinerary}
          >
            创建行程
          </Button>
        </View>
      </View>
    </View>
  )
}