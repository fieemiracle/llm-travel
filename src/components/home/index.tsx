import { View, Text } from '@tarojs/components'
import { HOME_WELCOME_TEXT } from '@/utils/const'
import { formatArrayByCustomLength } from '@/utils/tools'
import { HOME_BOTTOM_TIPS } from '@/mock'
import FormInput from '@/components/common/formInput'
import TravelRoute from '@/components/travelRoute'
import FloatLayout from '@/components/common/float-layout'
import Calendar from '@/components/common/calendar'
import { useState } from 'react'
import * as dayjs from 'dayjs'
import './index.less'

type HomeProps = {
  getTipText: (tipText: string) => void
  getInputValue: (inputText: string) => void
}

export default function Home(props: HomeProps) {
  const homeTipsList = formatArrayByCustomLength(HOME_BOTTOM_TIPS, 2)

  // 展示弹窗
  const [showPopup, setShowPopup] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  // 点击词条
  const onTipsClick = (item: { type: string, name: string }) => {
    console.log('onTipsClick:', item)
    if (item.type === 'text') {
      props.getTipText(item.name)
    }
    if (item.type === 'popup') {
      console.log('Setting showPopup to true')
      setShowPopup(true)
    }
  }

  // 发送查询
  const onSendQuery = (inputText: string) => {
    console.log(inputText, 'onSendQuery')
    const query = inputText.trim()
    if (!query) {
      return
    }
    props.getInputValue(query)
  }

  return (
    <View className='home-wrapper'>
      {/* 欢迎语 */}
      <View className='home-welcome'>
        <Text>{HOME_WELCOME_TEXT}</Text>
      </View>
      
      {/* 内容区 */}
      <View className='home-content'>
        <TravelRoute />
      </View>
      <View className='home-footer'>
        {/* 底部词条 */}
        <View className='home-tips'>
          {
            homeTipsList.map((listItem, listIndex) => (
              <View className='home-tip' key={listIndex}>
                {listItem.map((item, index) => (
                  <View key={index} className='home-tips-item' onClick={() => onTipsClick(item)}>
                    <Text>{item.name}</Text>
                  </View>
                ))}
              </View>
            ))
          }
        </View>
        
        {/* 输入框 */}
        <View className='home-input'>
          <FormInput onSend={(inputText) => onSendQuery(inputText)} />
        </View>
      </View>

      {/* 弹窗 */}
      <FloatLayout 
        isOpened={showPopup} 
        title='创建行程'
        customDate={selectedDate}
        openCalendar={() => {
          setShowCalendar(true)
        }}
        onClose={() => {
          console.log('FloatLayout onClose called')
          setShowPopup(false)
        }} 
      />

      {/* 日历选择 */}
      <Calendar
        isOpened={showCalendar}
        onClose={() => {
          console.log('Calendar onClose called')
          setShowCalendar(false)
          setShowPopup(true)
        }}
        onConfirm={(date: any) => {
          console.log('handleDateConfirm', date, dayjs(date).format('MM月DD日'))
          const dateStr = dayjs(date).format('MM月DD日')
          setSelectedDate(dateStr)
          setShowCalendar(false)
        }}
        onCancel={() => {
          console.log('handleDateCancel')
          setShowCalendar(false)
        }}
        title='选择出发日期'
        defaultDate={new Date()}
      />
    </View>
  )
}
