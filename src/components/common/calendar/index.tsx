import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import Modal from '../modal'
import './index.less'

type CalendarProps = {
  isOpened: boolean
  onClose: () => void
  onConfirm: (date: Date) => void
  onCancel?: () => void
  title?: string
  defaultDate?: Date
}

export default function Calendar(props: CalendarProps) {
  const { isOpened, onClose, onConfirm, onCancel, title = '选择出发日期', defaultDate } = props
  
  const [currentDate, setCurrentDate] = useState(defaultDate || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate || null)

  // 获取当前月份的第一天和最后一天
  const getMonthInfo = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    return { startDate, lastDay, year, month }
  }

  // 生成日历数据
  const generateCalendarDays = (date: Date): Date[] => {
    const { startDate } = getMonthInfo(date)
    const days: Date[] = []
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      days.push(currentDate)
    }
    
    return days
  }

  // 切换到上个月
  const prevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  // 切换到下个月
  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // 选择日期
  const selectDate = (date: Date) => {
    setSelectedDate(date)
  }

  // 确认选择
  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm(selectedDate)
      onClose()
    }
  }

  // 取消选择
  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  // 格式化日期显示
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  }

  // 判断是否为当前月份
  const isCurrentMonth = (date: Date) => {
    const { year, month } = getMonthInfo(currentDate)
    return date.getFullYear() === year && date.getMonth() === month
  }

  // 判断是否为选中日期
  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  // 判断是否为今天
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const calendarDays = generateCalendarDays(currentDate)
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <View className='calendar-container'>
        {/* 头部 */}
        <View className='calendar-header'>
          <Text className='calendar-title'>{title}</Text>
          <View className='calendar-character' onClick={onClose}>×</View>
        </View>
        
        {/* 日历内容 */}
        <View className='calendar-content'>
          {/* 月份导航 */}
          <View className='calendar-nav'>
            <View className='nav-arrow' onClick={prevMonth}>‹</View>
            <Text className='nav-month'>{formatDate(currentDate)}</Text>
            <View className='nav-arrow' onClick={nextMonth}>›</View>
          </View>
          
          {/* 星期标题 */}
          <View className='calendar-weekdays'>
            {weekDays.map(day => (
              <View key={day} className='weekday'>{day}</View>
            ))}
          </View>
          
          {/* 日历网格 */}
          <View className='calendar-grid'>
            {calendarDays.map((date, index) => (
              <View
                key={index}
                className={`calendar-day ${
                  !isCurrentMonth(date) ? 'other-month' : ''
                } ${
                  isSelectedDate(date) ? 'selected' : ''
                } ${
                  isToday(date) ? 'today' : ''
                }`}
                onClick={() => isCurrentMonth(date) && selectDate(date)}
              >
                <Text className='day-text'>{date.getDate()}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* 底部按钮 */}
        <View className='calendar-footer'>
          <View className='footer-button cancel' onClick={handleCancel}>
            取消
          </View>
          <View className='footer-button confirm' onClick={handleConfirm}>
            选好了
          </View>
        </View>
      </View>
    </Modal>
  )
} 