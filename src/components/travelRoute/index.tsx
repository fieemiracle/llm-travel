import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import Carousel from '@/components/carousel'
import Weather from '@/components/weather'
import RecommendList from '@/components/recommendList'
import { CAROUSEL_DATA, WEATHER_DATA, RECOMMEND_TABS, RECOMMEND_DATA } from '@/mock'
import Taro from '@tarojs/taro'
import './index.less'

export default function TravelRoute() {
  const [activeTab, setActiveTab] = useState('classic')

  // 处理tab切换
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // 处理轮播图点击
  const handleCarouselClick = (item: any) => {
    Taro.navigateTo({
      url: `/pages/map/index?mytour=${encodeURIComponent(JSON.stringify(item))}`
    })
  }

  // 处理推荐项点击
  const handleRecommendClick = (item: any) => {
    Taro.navigateTo({
      url: `/pages/map/index?mytour=${encodeURIComponent(JSON.stringify(item))}`
    })
  }

  return (
    <View className='travel-route-container'>
      {/* 标题区域 */}
      <View className='travel-route-header'>
        <Text className='travel-route-title'>出游路线</Text>
        <View className='weather-wrapper'>
          <Weather data={WEATHER_DATA} />
        </View>
      </View>

      {/* 轮播图 */}
      <View className='carousel-section'>
        <Carousel 
          data={CAROUSEL_DATA}
          onItemClick={handleCarouselClick}
        />
      </View>

      {/* Tab切换 */}
      <View className='tab-section'>
        {RECOMMEND_TABS.map(tab => (
          <View
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <Text className='tab-text'>{tab.name}</Text>
            {activeTab === tab.id && <View className='tab-line' />}
          </View>
        ))}
      </View>

      {/* 推荐内容 */}
      <View className='recommend-section'>
        <RecommendList
          data={RECOMMEND_DATA[activeTab] || []}
          onItemClick={handleRecommendClick}
        />
      </View>
    </View>
  )
} 