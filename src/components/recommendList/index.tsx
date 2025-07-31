import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.less'

interface RecommendItem {
  id: string
  title: string
  duration: string
  spots: number
  image: string
}

interface RecommendListProps {
  data: RecommendItem[]
  onItemClick?: (item: RecommendItem) => void
}

export default function RecommendList({ data, onItemClick }: RecommendListProps) {
  const handleItemClick = (item: RecommendItem) => {
    onItemClick?.(item)
  }

  if (!data || data.length === 0) {
    return (
      <View className='recommend-empty'>
        <Text className='empty-text'>暂无推荐内容</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      className='recommend-scroll'
      scrollX
      showScrollbar={false}
    >
      <View className='recommend-list'>
        {data.map(item => (
          <View
            key={item.id}
            className='recommend-item'
            onClick={() => handleItemClick(item)}
          >
            <Image 
              className='recommend-image' 
              src={item.image} 
              mode='aspectFill'
            />
            <View className='recommend-content'>
              <Text className='recommend-title'>{item.title}</Text>
              <Text className='recommend-info'>
                {item.duration} {item.spots}个地点
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
} 