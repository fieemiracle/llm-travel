import { View, Map as GMap, Text } from '@tarojs/components'
import type { MapProps } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { genMarker, genPolyline } from "@/utils/map"
import { MapConfigType, MapMarkerType, MapPolylineType } from "@/types/map"
import './index.less'
import Taro from '@tarojs/taro'

interface MapSectionProps {
  title?: string
  subtitle?: string
  // 地图配置
  mapConfig?: Partial<MapConfigType>
  // 标记点
  markers?: MapMarkerType[]
  // 路线
  polylines?: MapPolylineType[]
  // 底部按钮配置
  footerButtons?: {
    text: string
    type?: 'primary' | 'secondary'
  }[]
  // 地图事件回调
  onMapError?: (error: any) => void
  onRegionChange?: (region: any) => void
  onMarkerTap?: (marker: any) => void
  onCalloutTap?: (callout: any) => void
  onRegenerate?: () => void
  // 拖拽相关回调
  onDragStart?: () => void
  onDragEnd?: (region: any) => void
  // 是否显示底部按钮
  showFooter?: boolean
  // 自定义样式类名
  className?: string
}



const DEFAULT_MAP_CONFIG: MapConfigType = {
  longitude: 116.397428,
  latitude: 39.90923,
  scale: 14,
  minScale: 5,
  maxScale: 20,
  showLocation: true,
  enableZoom: true,
  enableScroll: true, // 确保拖拽功能启用
  enableRotate: true,
  showCompass: false,
  showScale: true
}

const DEFAULT_FOOTER_BUTTONS = [
  {
    text: '重新生成',
    type: 'secondary' as const,
  },
  {
    text: '查看行程',
    type: 'primary' as const,
  }
]

export default function MapSection(props: MapSectionProps) {
  const {
    title,
    subtitle,
    mapConfig = {},
    markers = [],
    polylines = [],
    footerButtons = DEFAULT_FOOTER_BUTTONS,
    onMapError,
    onRegionChange,
    onMarkerTap,
    onCalloutTap,
    onDragStart,
    // onDragEnd,
    showFooter = true,
    className = '',
    onRegenerate,
  } = props

  const [mapMarkers, setMapMarkers] = useState<MapProps.marker[]>([])
  const [mapPolylines, setMapPolylines] = useState<MapProps.polyline[]>([])
  const [currentMapConfig, setCurrentMapConfig] = useState<MapConfigType>({
    ...DEFAULT_MAP_CONFIG,
    ...mapConfig
  })

  // 处理标记点数据
  useEffect(() => {
    if (markers.length > 0) {
      const formattedMarkers = markers.map(marker => genMarker(marker))
      setMapMarkers(formattedMarkers)
    }
  }, [markers])

  // 处理路线数据
  useEffect(() => {
    if (polylines.length > 0) {
      const formattedPolylines = polylines.map(polyline => genPolyline(polyline))
      setMapPolylines(formattedPolylines)
    }
  }, [polylines])

  // 处理地图配置更新
  useEffect(() => {
    setCurrentMapConfig({
      ...DEFAULT_MAP_CONFIG,
      ...mapConfig
    })
  }, [mapConfig])

  // 生成includePoints配置，用于自动调整地图视野
  const generateIncludePoints = () => {
    if (markers.length === 0) return []
    
    return markers.map(marker => ({
      latitude: marker.latitude,
      longitude: marker.longitude
    }))
  }

  // 地图错误处理
  const handleMapError = (error: any) => {
    onMapError?.(error)
  }

  // 地图视野变化处理
  const handleRegionChange = (region: any) => {
    onRegionChange?.(region)
  }

  // 拖拽开始处理
  const handleDragStart = () => {
    onDragStart?.()
  }

  // 拖拽结束处理
  // const handleDragEnd = (region: any) => {
  //   onDragEnd?.(region)
  // }

  // 标记点点击处理
  const handleMarkerTap = (marker: any) => {
    onMarkerTap?.(marker)
  }

  // 气泡点击处理
  const handleCalloutTap = (callout: any) => {
    onCalloutTap?.(callout)
  }

  // 按钮点击处理
  const handleButtonClick = (button: any) => {
    const { text } = button
    if (text === '重新生成') {
      onRegenerate?.()
    } else if (text === '查看行程') {
      Taro.navigateTo({
        url: `/pages/map/index?markers=${encodeURIComponent(JSON.stringify(markers))}&polylines=${encodeURIComponent(JSON.stringify(polylines))}`
      })
    }
  }

  // 当有markers时使用includePoints自动调整视野，否则使用默认配置
  const hasMarkers = markers.length > 0
  const finalMapConfig = hasMarkers 
    ? { 
        ...currentMapConfig, 
        includePoints: generateIncludePoints()
      }
    : currentMapConfig

  return (
    <View className={`map-section ${className}`}>
      {/* 头部 */}
      {
        (title || subtitle) && (
          <View className='map-section-header'>
            <View className='map-section-header-title'>{title}</View>
            <View className='map-section-header-subtitle'>{subtitle}</View>
          </View>
        )
      }
      <View className='map-section-content'>
        <GMap
          className='map-section-map'
          longitude={finalMapConfig.longitude}
          latitude={finalMapConfig.latitude}
          scale={finalMapConfig.scale}
          minScale={finalMapConfig.minScale}
          maxScale={finalMapConfig.maxScale}
          showLocation={finalMapConfig.showLocation}
          enableZoom={finalMapConfig.enableZoom}
          enableScroll={finalMapConfig.enableScroll}
          enableRotate={finalMapConfig.enableRotate}
          showCompass={finalMapConfig.showCompass}
          showScale={finalMapConfig.showScale}
          enableOverlooking={finalMapConfig.enableOverlooking}
          enableSatellite={finalMapConfig.enableSatellite}
          enableTraffic={finalMapConfig.enableTraffic}
          markers={mapMarkers}
          polyline={mapPolylines}
          includePoints={finalMapConfig.includePoints}
          onError={handleMapError}
          onRegionChange={handleRegionChange}
          onMarkerTap={handleMarkerTap}
          onCalloutTap={handleCalloutTap}
          onTap={handleDragStart}
        />
      </View>
      
      {showFooter && (
        <View className='map-section-footer'>
          {footerButtons.map((button, index) => (
            <View
              key={index}
              className={`map-section-footer-item map-section-footer-item-${button.type || 'secondary'}`}
              onClick={() => handleButtonClick(button)}
            >
              <Text className='map-section-footer-item-text'>{button.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}