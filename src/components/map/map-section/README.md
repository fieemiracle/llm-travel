# MapSection 地图组件

一个功能完善的地图展示组件，支持标记点、路线显示、交互事件和自定义配置。

## 功能特性

- 🗺️ 基础地图展示
- 📍 支持多个标记点
- 🛣️ 支持路线显示
- 🎨 美观的渐变头部设计
- 🔘 可自定义底部操作按钮
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ⚡ 丰富的交互事件
- 🎯 自动计算地图中心点和缩放级别
- 🖱️ 支持地图拖拽和缩放
- 📍 拖拽状态监听和回调

## 基础用法

```tsx
import MapSection from '@/components/map/map-section'

// 基础用法
<MapSection
  title="北京旅游路线"
  subtitle="探索古都文化，感受历史魅力"
/>
```

## 拖拽功能使用

```tsx
import { useState } from 'react'
import MapSection from '@/components/map/map-section'

const MapWithDrag = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [currentRegion, setCurrentRegion] = useState(null)

  const handleDragStart = () => {
    setIsDragging(true)
    console.log('地图拖拽开始')
  }

  const handleDragEnd = (region) => {
    setIsDragging(false)
    setCurrentRegion(region)
    console.log('地图拖拽结束', region)
  }

  return (
    <MapSection
      title="可拖拽地图"
      subtitle="支持拖拽和缩放操作"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onRegionChange={(region) => console.log('视野变化', region)}
    />
  )
}
```

## 带标记点的地图

```tsx
import { MapMarkerType } from '@/types/map'

const markers: MapMarkerType[] = [
  {
    latitude: 39.90923,
    longitude: 116.397428,
    callout: {
      content: '天安门广场',
      bgColor: '#fff',
      color: '#333',
      fontSize: 14,
      borderRadius: 8,
      padding: 8
    }
  }
]

<MapSection
  title="景点打卡路线"
  subtitle="天安门 → 故宫 → 景山公园"
  markers={markers}
  onMarkerTap={(marker) => console.log('点击标记点:', marker)}
  onCalloutTap={(callout) => console.log('点击气泡:', callout)}
/>
```

## 带路线的地图

```tsx
import { MapPolylineType } from '@/types/map'

const polylines: MapPolylineType[] = [
  {
    points: [
      { latitude: 39.90923, longitude: 116.397428 },
      { latitude: 39.91923, longitude: 116.407428 },
      { latitude: 39.92923, longitude: 116.417428 }
    ],
    color: '#667eea',
    width: 6,
    arrowLine: true
  }
]

<MapSection
  title="完整旅游路线"
  subtitle="包含路线规划和景点标记"
  markers={markers}
  polylines={polylines}
/>
```

## 自定义按钮

```tsx
const customButtons = [
  {
    text: '重新规划',
    type: 'secondary',
    onClick: () => console.log('重新规划路线')
  },
  {
    text: '查看详情',
    type: 'primary',
    onClick: () => console.log('查看路线详情')
  },
  {
    text: '分享',
    type: 'secondary',
    onClick: () => console.log('分享路线')
  }
]

<MapSection
  title="自定义操作"
  subtitle="支持多种操作按钮"
  markers={markers}
  polylines={polylines}
  footerButtons={customButtons}
/>
```

## 自定义地图配置

```tsx
<MapSection
  title="高精度地图"
  subtitle="支持卫星图和交通信息"
  markers={markers}
  polylines={polylines}
  mapConfig={{
    scale: 16,
    enableSatellite: true,
    enableTraffic: true,
    showCompass: true,
    showScale: true
  }}
/>
```

## API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 地图标题 |
| subtitle | string | - | 地图副标题 |
| mapConfig | Partial<MapConfigType> | - | 地图配置选项 |
| markers | MapMarkerType[] | [] | 标记点数组 |
| polylines | MapPolylineType[] | [] | 路线数组 |
| footerButtons | ButtonConfig[] | 默认按钮 | 底部按钮配置 |
| showFooter | boolean | true | 是否显示底部按钮 |
| className | string | '' | 自定义样式类名 |
| onMapError | (error: any) => void | - | 地图错误回调 |
| onRegionChange | (region: any) => void | - | 地图视野变化回调 |
| onMarkerTap | (marker: any) => void | - | 标记点点击回调 |
| onCalloutTap | (callout: any) => void | - | 气泡点击回调 |
| onDragStart | () => void | - | 拖拽开始回调 |
| onDragEnd | (region: any) => void | - | 拖拽结束回调 |

### MapConfigType

```tsx
interface MapConfigType {
  longitude: number
  latitude: number
  scale?: number
  minScale?: number
  maxScale?: number
  showLocation?: boolean
  enableZoom?: boolean
  enableScroll?: boolean
  enableRotate?: boolean
  showCompass?: boolean
  showScale?: boolean
  enableOverlooking?: boolean
  enableSatellite?: boolean
  enableTraffic?: boolean
}
```

### MapMarkerType

```tsx
interface MapMarkerType {
  latitude: number
  longitude: number
  iconPath?: string
  id?: number
  title?: string
  callout?: {
    content: string
    color?: string
    fontSize?: number
    bgColor?: string
    borderRadius?: number
    padding?: number
  }
}
```

### MapPolylineType

```tsx
interface MapPolylineType {
  points: { latitude: number; longitude: number }[]
  color?: string
  width?: number
  arrowLine?: boolean
}
```

### ButtonConfig

```tsx
interface ButtonConfig {
  text: string
  type?: 'primary' | 'secondary'
  onClick?: () => void
}
```

## 样式定制

组件使用 BEM 命名规范，可以通过以下类名进行样式定制：

- `.map-section` - 主容器
- `.map-section-header` - 头部区域
- `.map-section-header-title` - 标题
- `.map-section-header-subtitle` - 副标题
- `.map-section-content` - 地图内容区域
- `.map-section-footer` - 底部按钮区域
- `.map-section-footer-item` - 按钮项
- `.map-section-footer-item-primary` - 主要按钮样式
- `.map-section-footer-item-secondary` - 次要按钮样式

## 注意事项

1. 组件会自动计算标记点的中心位置和合适的缩放级别
2. 支持响应式设计，在不同屏幕尺寸下自动调整
3. 支持深色模式，会根据系统设置自动切换
4. 地图加载失败时会触发 `onMapError` 回调
5. 所有交互事件都是可选的，可以根据需要添加
6. 地图默认启用拖拽功能（enableScroll: true），可以通过 mapConfig 配置
7. 拖拽时会触发 onRegionChange 事件，可以通过 onDragStart 和 onDragEnd 监听拖拽状态

## 示例

查看 `example.tsx` 文件获取完整的使用示例。 