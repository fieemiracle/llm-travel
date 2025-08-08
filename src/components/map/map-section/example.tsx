import { View } from '@tarojs/components'
import MapSection from './index'
import { MapMarkerType, MapPolylineType } from '@/types/map'

// 示例数据
const exampleMarkers: MapMarkerType[] = [
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
  },
  {
    latitude: 39.91923,
    longitude: 116.407428,
    callout: {
      content: '故宫博物院',
      bgColor: '#fff',
      color: '#333',
      fontSize: 14,
      borderRadius: 8,
      padding: 8
    }
  },
  {
    latitude: 39.92923,
    longitude: 116.417428,
    callout: {
      content: '景山公园',
      bgColor: '#fff',
      color: '#333',
      fontSize: 14,
      borderRadius: 8,
      padding: 8
    }
  }
]

const examplePolylines: MapPolylineType[] = [
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

const customFooterButtons = [
  {
    text: '重新规划',
    type: 'secondary' as const,
    onClick: () => {
      console.log('重新规划路线')
    }
  },
  {
    text: '查看详情',
    type: 'primary' as const,
    onClick: () => {
      console.log('查看路线详情')
    }
  },
  {
    text: '分享',
    type: 'secondary' as const,
    onClick: () => {
      console.log('分享路线')
    }
  }
]

export default function MapSectionExample() {
  const handleMapError = (error: any) => {
    console.log('地图加载错误:', error)
  }

  const handleRegionChange = (region: any) => {
    console.log('地图视野变化:', region)
  }

  const handleMarkerTap = (marker: any) => {
    console.log('点击标记点:', marker)
  }

  const handleCalloutTap = (callout: any) => {
    console.log('点击气泡:', callout)
  }

  return (
    <View style={{ padding: '20rpx' }}>
      {/* 基础用法 */}
      <MapSection
        title="北京旅游路线"
        subtitle="探索古都文化，感受历史魅力"
        className="mb-20"
      />

      {/* 带标记点的地图 */}
      <MapSection
        title="景点打卡路线"
        subtitle="天安门 → 故宫 → 景山公园"
        markers={exampleMarkers}
        className="mb-20"
        onMarkerTap={handleMarkerTap}
        onCalloutTap={handleCalloutTap}
      />

      {/* 带路线的地图 */}
      <MapSection
        title="完整旅游路线"
        subtitle="包含路线规划和景点标记"
        markers={exampleMarkers}
        polylines={examplePolylines}
        className="mb-20"
        onMapError={handleMapError}
        onRegionChange={handleRegionChange}
      />

      {/* 自定义按钮 */}
      <MapSection
        title="自定义操作"
        subtitle="支持多种操作按钮"
        markers={exampleMarkers}
        polylines={examplePolylines}
        footerButtons={customFooterButtons}
        className="mb-20"
      />

      {/* 隐藏底部按钮 */}
      <MapSection
        title="纯展示地图"
        subtitle="不显示底部操作按钮"
        markers={exampleMarkers}
        polylines={examplePolylines}
        showFooter={false}
        className="mb-20"
      />

      {/* 自定义地图配置 */}
      <MapSection
        title="高精度地图"
        subtitle="支持卫星图和交通信息"
        markers={exampleMarkers}
        polylines={examplePolylines}
        mapConfig={{
          scale: 16,
          enableSatellite: true,
          enableTraffic: true,
          showCompass: true,
          showScale: true
        }}
        className="mb-20"
      />
    </View>
  )
} 