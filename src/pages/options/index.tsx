import { View, Text, Button } from '@tarojs/components'
import UserNavBar from '@/components/mine/userNavBar'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { setQueryText } from '@/store/actions/chat'
import { setCurrentRouteName } from '@/store/actions/common'
import { RouterName } from '@/utils/enum'
import './index.less'

const AFTER_FIX = '行程定制'

// 类型定义
interface EntertainmentOption {
  icon: string
  title: string
  subtitle: string
}

interface UserPreferences {
  food: string[]
  entertainment: string
}

// 美食偏好选项
const FOOD_OPTIONS = [
  '推荐',
  '火锅',
  '烧烤烤肉',
  '地方菜',
  '异域料理',
  '自助餐',
  '鱼鲜海鲜',
  '小吃快餐'
]

// 娱乐偏好选项
const ENTERTAINMENT_OPTIONS: EntertainmentOption[] = [
  {
    icon: '❄️',
    title: '赏雪',
    subtitle: '情书里的雪'
  },
  {
    icon: '♨️',
    title: '温泉',
    subtitle: 'chill到心趴上'
  },
  {
    icon: '🎬',
    title: '电影',
    subtitle: '新年电影'
  },
  {
    icon: '🚶',
    title: '漫步',
    subtitle: '城市漫步'
  },
  {
    icon: '🖼️',
    title: '展览',
    subtitle: '人间皆是浪漫'
  },
  {
    icon: '🎤',
    title: '演出',
    subtitle: '仪式感拉满'
  },
  {
    icon: '✂️',
    title: '手工',
    subtitle: '专属纪念'
  },
  {
    icon: '🍷',
    title: '酒吧',
    subtitle: '微醺・Cheers'
  },
  {
    icon: '🎭',
    title: '剧本',
    subtitle: '人生如戏'
  }
]

export default function Options() {
  const [title, setTitle] = useState('')
  const [selectedFood, setSelectedFood] = useState<string[]>([])
  const [selectedEntertainment, setSelectedEntertainment] = useState<string>('')
  const [prefixText, setPrefixText] = useState('')

  const dispatch = useDispatch()

  useLoad((options) => {
    console.log('options', options)
    const { time, date, purpose } = options
    setTitle(purpose + AFTER_FIX)
    const prefixQuery = `帮我规划${date}出发、${time}的${purpose}的${purpose}旅游行程。`
    setPrefixText(prefixQuery)
  })

  // 处理美食偏好选择
  const handleFoodSelect = (food: string) => {
    if (selectedFood.includes(food)) {
      setSelectedFood(selectedFood.filter(item => item !== food))
    } else {
      setSelectedFood([...selectedFood, food])
    }
  }

  // 完成创建
  const handleComplete = () => {
    const preferences: UserPreferences = {
      food: selectedFood,
      entertainment: selectedEntertainment
    }
    
    console.log('选择的偏好:', preferences)
    let afterText = ''
    if (selectedFood.length > 0) {
      afterText += `我喜欢${selectedFood.join('、')}`
    }
    if (selectedEntertainment) {
      afterText += `，想体验${selectedEntertainment}。`
    }
    dispatch(setQueryText(prefixText + afterText))
    Taro.navigateTo({
      url: '/pages/layout/index'
    })
    dispatch(setCurrentRouteName(RouterName.CHAT))
  }

  // 跳过，直接开启会话
  const handleSkip = () => {
    console.log('跳过偏好设置，直接开启会话')
    Taro.navigateTo({
      url: '/pages/layout/index'
    })
    dispatch(setCurrentRouteName(RouterName.CHAT))
  }

  return (
    <View className='options-wrapper'>
      <UserNavBar title={title} />
      
      <View className='options-content'>
        {/* 美食偏好 */}
        <View className='preference-section'>
          <View className='preference-header'>
            <Text className='preference-icon'>🍽️</Text>
            <Text className='preference-title'>美食偏好</Text>
          </View>
          <View className='food-options'>
            {FOOD_OPTIONS.map((food) => (
              <View
                key={food}
                className={`food-option ${selectedFood.includes(food) ? 'selected' : ''}`}
                onClick={() => handleFoodSelect(food)}
              >
                <Text>{food}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 娱乐偏好 */}
        <View className='preference-section'>
          <View className='preference-header'>
            <Text className='preference-icon'>😊</Text>
            <Text className='preference-title'>娱乐偏好</Text>
          </View>
          <View className='entertainment-options'>
            {ENTERTAINMENT_OPTIONS.map((item) => (
              <View
                key={item.title}
                className={`entertainment-option ${selectedEntertainment.includes(item.title) ? 'selected' : ''}`}
                onClick={() => setSelectedEntertainment(item.title)}
              >
                <View className='entertainment-option-header'>
                  <Text className='entertainment-icon'>{item.icon}</Text>
                  <Text className='entertainment-title'>{item.title}</Text>
                </View>
                <Text className='entertainment-subtitle'>{item.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 底部操作区域 */}
      <View className='options-footer'>
        <Button className='complete-btn' onClick={handleComplete}>
          完成创建
        </Button>
        <View className='skip-text' onClick={handleSkip}>
          跳过,直接开启会话
        </View>
      </View>
    </View>
  )
}