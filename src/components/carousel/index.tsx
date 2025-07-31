import { View, Text, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './index.less'

interface CarouselItem {
  id: string
  title: string
  subtitle: string
  image: string
  tags: string[]
}

interface CarouselProps {
  data: CarouselItem[]
  onItemClick?: (item: CarouselItem) => void
}

export default function Carousel({ data, onItemClick }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 自动轮播
  useEffect(() => {
    if (data.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [data.length])

  const handleItemClick = (item: CarouselItem) => {
    onItemClick?.(item)
  }

  if (!data || data.length === 0) return null

  return (
    <View className='carousel-container'>
      <View className='carousel-wrapper'>
        {data.map((item, index) => (
          <View
            key={item.id}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <Image className='carousel-image' src={item.image} mode='aspectFill' />
            <View className='carousel-content'>
              <View className='carousel-tags'>
                {item.tags.map(tag => (
                  <View key={tag} className='carousel-tag'>
                    <Text className='carousel-tag-text'>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text className='carousel-title'>{item.title}</Text>
              <Text className='carousel-subtitle'>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
      
      {/* 指示器 */}
      {data.length > 1 && (
        <View className='carousel-indicators'>
          {data.map((_, index) => (
            <View
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </View>
      )}
    </View>
  )
} 