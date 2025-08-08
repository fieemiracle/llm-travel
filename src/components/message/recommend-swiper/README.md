# RecommendSwiper 组件

一个用于显示推荐项目的横向滚动组件，支持多种类型的推荐内容展示。

## 功能特性

- 🎨 美观的卡片式布局
- 🏷️ 支持不同类型的标签（景点、美食、住宿、购物、文化）
- ⭐ 星级评分显示
- 💰 价格信息展示
- 📱 响应式设计，支持横向滚动
- 🎯 点击事件处理
- ⏳ 加载状态支持
- 🎭 悬停和点击动画效果

### 图片加载失败处理
- 自动检测图片加载失败
- 根据内容类型显示不同的默认图片
- 提供加载状态指示器
- 支持图片懒加载

### 默认图片类型
- 景点：蓝色渐变背景
- 美食：粉色渐变背景  
- 住宿：青色渐变背景
- 购物：绿色渐变背景
- 文化：橙红色渐变背景
- 娱乐：粉红色渐变背景
- 运动：浅青色渐变背景

### 图片加载状态
- `loading`: 显示"加载中..."提示
- `success`: 图片加载成功
- `error`: 显示"图片加载失败"提示，并自动切换到默认图片

## 使用方法

```tsx
import RecommendSwiper from '@/components/message/recommend-swiper'
import { RecommendItemType } from '@/types/common'

const recommendList: Array<RecommendItemType> = [
  {
    address: '故宫博物院',
    cover: 'https://invalid-url.com/image.jpg', // 无效图片URL
    rate: '4.8',
    price: '60',
    type: '景点',
    location: {
      latitude: 39.9163,
      longitude: 116.3972
    }
  }
]

function MyComponent() {
  return (
    <RecommendSwiper
      title="推荐景点"
      recommendList={recommendList}
      loading={false}
      onItemClick={(item) => {
        console.log('点击了:', item.address)
      }}
    />
  )
}
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | string | 是 | - | 组件标题 |
| recommendList | RecommendItemType[] | 是 | - | 推荐项目列表 |
| onItemClick | (item: RecommendItemType) => void | 否 | - | 点击项目回调 |
| loading | boolean | 否 | false | 加载状态 |

## RecommendItemType 类型

```tsx
interface RecommendItemType {
  address: string        // 地址/名称
  cover: string         // 封面图片URL
  rate: string          // 评分
  price: string         // 价格
  type: string          // 类型（景点、美食、住宿、购物、文化）
  location: {           // 位置信息
    latitude: number
    longitude: number
  }
  comments?: string     // 评论（可选）
}
```

## 样式定制

组件支持以下CSS类名进行样式定制：

- `.recommend-swiper` - 主容器
- `.recommend-swiper-title` - 标题
- `.recommend-swiper-container` - 滚动容器
- `.recommend-swiper-item` - 推荐项目卡片
- `.recommend-swiper-item-cover` - 封面图片容器
- `.recommend-swiper-item-tag` - 类型标签
- `.recommend-swiper-item-info` - 信息容器
- `.recommend-swiper-item-title` - 项目标题
- `.recommend-swiper-item-rating` - 评分区域
- `.recommend-swiper-item-price` - 价格区域

## 标签类型颜色

- 景点: 蓝紫色渐变
- 美食: 粉红色渐变
- 住宿: 蓝色渐变
- 购物: 绿色渐变
- 文化: 橙黄色渐变

## 改进内容

### 1. 图片加载失败处理
- 添加了 `failedImages` 状态来跟踪加载失败的图片
- 实现了 `getDefaultImageUrl` 函数，根据类型返回相应的默认图片
- 在 `onError` 回调中自动切换到默认图片

### 2. 加载状态指示器
- 添加了 `imageLoadingStates` 状态来跟踪每个图片的加载状态
- 实现了 `renderImageLoadingState` 函数来显示加载状态覆盖层
- 提供了视觉反馈，提升用户体验

### 3. 样式优化
- 添加了图片加载状态覆盖层的样式
- 使用 `backdrop-filter` 实现毛玻璃效果
- 确保标签在覆盖层之上显示

### 4. 错误处理
- 在控制台输出详细的错误信息
- 记录图片URL和类型信息，便于调试
- 提供友好的用户提示

## 技术实现

### 状态管理
```tsx
// 记录图片加载失败的索引
const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

// 记录图片加载状态
const [imageLoadingStates, setImageLoadingStates] = useState<Map<number, 'loading' | 'success' | 'error'>>(new Map())
```

### 图片URL处理
```tsx
const getImageUrl = (index: number, originalUrl: string, type: string) => {
  if (failedImages.has(index)) {
    return getDefaultImageUrl(type)
  }
  return originalUrl
}
```

### 事件处理
```tsx
// 图片加载成功
const handleImageLoadSuccess = (index: number) => {
  setImageLoadingStates(prev => new Map(prev).set(index, 'success'))
}

// 图片加载失败
const handleImageError = (index: number, originalUrl: string, type: string) => {
  console.log('图片加载失败:', originalUrl, '类型:', type)
  setFailedImages(prev => new Set([...prev, index]))
  setImageLoadingStates(prev => new Map(prev).set(index, 'error'))
}
```

## 注意事项

1. 图片URL需要确保可访问
2. 评分范围建议在 0-5 之间
3. 价格为 0 或空字符串时显示"免费"
4. 组件会自动处理空列表和加载状态 
1. 默认图片使用在线占位图服务，确保网络连接正常
2. 图片懒加载功能需要在小程序环境中测试
3. 建议在生产环境中使用本地默认图片资源
4. 可以根据需要调整超时时间和重试机制 