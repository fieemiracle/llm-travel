import { View, Image, Text } from "@tarojs/components"
import { useMemo, useState } from "react"
import { RecommendItemType } from "@/types/common"
import "./index.less"

type RecommendSwiperProps = {
  title: string
  recommendList: Array<RecommendItemType>
  onItemClick?: (item: RecommendItemType) => void
  loading?: boolean
  showAppSelection?: boolean // 是否显示应用选择弹窗
}

export default function RecommendSwiper(props: RecommendSwiperProps) {
  const { recommendList, title, onItemClick, loading = false } = props

  // 记录图片加载失败的索引
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  // 记录图片加载状态
  const [imageLoadingStates, setImageLoadingStates] = useState<Map<number, 'loading' | 'success' | 'error'>>(new Map())

  // 获取默认图片URL
  const getDefaultImageUrl = (type: string) => {
    const typeMap: Record<string, string> = {
      '景点': 'https://via.placeholder.com/200x150/667eea/ffffff?text=景点',
      '美食': 'https://via.placeholder.com/200x150/f093fb/ffffff?text=美食',
      '住宿': 'https://via.placeholder.com/200x150/4facfe/ffffff?text=住宿',
      '购物': 'https://via.placeholder.com/200x150/43e97b/ffffff?text=购物',
      '文化': 'https://via.placeholder.com/200x150/fa709a/ffffff?text=文化',
      '娱乐': 'https://via.placeholder.com/200x150/ff9a9e/ffffff?text=娱乐',
      '运动': 'https://via.placeholder.com/200x150/a8edea/ffffff?text=运动'
    }
    return typeMap[type] || 'https://via.placeholder.com/200x150/cccccc/666666?text=暂无图片'
  }

  // 处理图片加载开始
  // const handleImageLoadStart = (index: number) => {
  //   setImageLoadingStates(prev => new Map(prev).set(index, 'loading'))
  // }

  // 处理图片加载成功
  const handleImageLoadSuccess = (index: number) => {
    setImageLoadingStates(prev => new Map(prev).set(index, 'success'))
  }

  // 处理图片加载失败
  const handleImageError = (index: number, originalUrl: string, type: string) => {
    console.log('handleImageError>>>>>>>', index, originalUrl, type)
    setFailedImages(prev => new Set([...prev, index]))
    setImageLoadingStates(prev => new Map(prev).set(index, 'error'))
  }

  // 获取图片URL
  const getImageUrl = (index: number, originalUrl: string, type: string) => {
    if (failedImages.has(index)) {
      return getDefaultImageUrl(type)
    }
    return originalUrl
  }

  // 渲染图片加载状态
  const renderImageLoadingState = (index: number) => {
    const state = imageLoadingStates.get(index)
    
    if (state === 'loading') {
      return (
        <View className="image-loading-overlay">
          <Text className="loading-text">加载中...</Text>
        </View>
      )
    }
    
    if (state === 'error') {
      return (
        <View className="image-error-overlay">
          <Text className="error-text">图片加载失败</Text>
        </View>
      )
    }
    
    return null
  }

  // 渲染评分星星
  const renderRatingStars = (rating: string) => {
    const numRating = parseFloat(rating)
    const fullStars = Math.floor(numRating)
    const hasHalfStar = numRating % 1 !== 0
    
    return (
      <View className="rating-stars">
        {Array.from({ length: 5 }, (_, index) => {
          if (index < fullStars) {
            return '★'
          } else if (index === fullStars && hasHalfStar) {
            return '☆'
          } else {
            return '☆'
          }
        }).join('')}
      </View>
    )
  }

  // 渲染价格
  const renderPrice = (price: string) => {
    if (!price || price === '0') {
      return <Text className="price-unit">免费</Text>
    }
    return (
      <>
        <Text>¥{price}</Text>
        <Text className="price-unit">/人</Text>
      </>
    )
  }

  // 获取标签样式类名
  const getTagClassName = useMemo(() => {
    const typeMap: Record<string, string> = {
      '景点': 'tag-scenic',
      '美食': 'tag-food',
      '住宿': 'tag-hotel',
      '购物': 'tag-shopping',
      '文化': 'tag-culture'
    }
    return (type: string) => `recommend-swiper-item-tag ${typeMap[type] || 'tag-default'}`
  }, [])

  return (
    <View className="recommend-swiper">
      <View className="recommend-swiper-title">{title}</View>
      {loading ? (
        <View className="recommend-swiper-loading">
          <Text>加载中...</Text>
        </View>
      ) : recommendList.length > 0 ? (
        <View className="recommend-swiper-container">
          {
            recommendList.map((item, index) => (
            <View 
              className="recommend-swiper-item" 
              key={index}
              onClick={() => onItemClick?.(item)}
            >
              <View className="recommend-swiper-item-cover">
                <Image 
                  src={getImageUrl(index, item.cover, item.type)}
                  onLoad={() => handleImageLoadSuccess(index)}
                  onError={() => handleImageError(index, item.cover, item.type)}
                  mode="aspectFill"
                  lazyLoad
                  showMenuByLongpress={false}
                />
                {renderImageLoadingState(index)}
                {item.type && (
                  <View className={getTagClassName(item.type)}>
                    {item.type}
                  </View>
                )}
              </View>
              <View className="recommend-swiper-item-info">
                <View className="recommend-swiper-item-title">
                  {item.address}
                </View>
                <View className="recommend-swiper-item-rating">
                  {item.rate ? (
                    <>
                      {renderRatingStars(item.rate)}
                      <Text className="rating-text">{item.rate}</Text>
                    </>
                  ) : (
                    <Text className="rating-text">暂无评分</Text>
                  )}
                </View>
                <View className="recommend-swiper-item-price">
                  {renderPrice(item.price)}
                </View>
              </View>
            </View>
          ))
        }
        </View>
      ) : (
        <View className="recommend-swiper-empty">
          <Text>暂无推荐内容</Text>
        </View>
      )}
    </View>
  )
}