import { View, Text } from '@tarojs/components'
import './index.less'

interface WeatherData {
  city: string
  temperature: string
  condition: string
  description: string
}

interface WeatherProps {
  data: WeatherData
}

export default function Weather({ data }: WeatherProps) {
  // 根据天气条件返回对应的emoji
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return '☀️'
      case 'cloudy':
        return '☁️'
      case 'rainy':
        return '🌧️'
      case 'snowy':
        return '❄️'
      default:
        return '☀️'
    }
  }

  return (
    <View className='weather-container'>
      <View className='weather-icon'>
        <Text className='weather-emoji'>{getWeatherIcon(data.condition)}</Text>
      </View>
      <View className='weather-info'>
        <Text className='weather-city'>{data.city}</Text>
        <Text className='weather-temp'>{data.temperature}</Text>
      </View>
    </View>
  )
} 