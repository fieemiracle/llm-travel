import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import './index.less'

type FloatLayoutProps = {
  isOpened: boolean
  title: string
  onClose: () => void
  children?: React.ReactNode
}

export default function FloatLayout(props: FloatLayoutProps) {
  const [selectedTime, setSelectedTime] = useState('下午')
  const [selectedDate, setSelectedDate] = useState('还没定')
  const [selectedPurpose, setSelectedPurpose] = useState('经典游')

  const timeOptions = ['上午', '下午', '1天', '2天']
  const dateOptions = ['还没定', '今天', '明天', '自定义']
  const purposeOptions = ['经典游', '约会', '遛娃', '朋友', '团建', '一人行', '家庭']

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
                  key={option}
                  className={`float-layout-option ${selectedDate === option ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(option)}
                >
                  <Text>{option}</Text>
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