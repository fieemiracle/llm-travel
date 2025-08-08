import { View, Map as GMap, Text } from "@tarojs/components"
import type { MapProps } from '@tarojs/components'
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { useState } from "react"
import {
  MapConfigType,
  IncludePaddingStyleT,
} from "@/types/map"
import Back from "@/components/map/back"
import Taro, { useLoad } from "@tarojs/taro"
import FloatingPanel from "@/components/common/floating-panel"
import './index.less'
import { genMarker, genPolyline } from "@/utils/map"
import IconFont from "@/components/common/iconfont"
import { ICONFONT_ICONS } from "@/utils/iconfont"

const DEFAULT_MAP_CONFIG: MapConfigType = {
  longitude: 116.397428,
  latitude: 39.90923,
  scale: 14, // 进一步提高默认缩放级别，让标点更居中
  minScale: 5, // 提高最小缩放级别，避免过度缩小
  maxScale: 20,
  showLocation: true,
  enableZoom: true // 确保启用缩放功能
}

const DEFAULT_INCLUDE_PADDING: IncludePaddingStyleT = {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100
}

export default function Map() {
  const [mapConfig, setMapConfig] = useState<MapConfigType>(DEFAULT_MAP_CONFIG)
  const [gMapMarkers, setGMapMarkers] = useState<MapProps.marker[]>([])
  const [gMapPolylines, setGMapPolylines] = useState<MapProps.polyline[]>([])
  // const [gMapCircles, setGMapCircles] = useState<MapProps.circle[]>([])
  // const [gMapPolygons, setGMapPolygons] = useState<MapProps.polygon[]>([])
  const [gMapIncludePadding, setGMapIncludePadding] = useState<IncludePaddingStyleT>(DEFAULT_INCLUDE_PADDING)
  // const [gMapCustomMapStyle, setGMapCustomMapStyle] = useState<CustomMapStyleT>('default')

  const [isShowCover, setIsShowCover] = useState(false)
  const [estCardStatus, setEstCardStatus] = useState<EstimateContainValues>(EstimateContain.HALF)
  const [panelHeight, setPanelHeight] = useState<number>(0)
  const [tabPane, setTabPane] = useState<string>('')
  const [mytour, setMytour] = useState<{title: string, tourdetail: any[]} | null>(null)
  // console.log('面板状态>>>>>>>', estCardStatus)

  // 接收参数
  useLoad((options) => {
    // 出游路线
    if (options.mytour) {
      const mytour = JSON.parse(decodeURIComponent(options.mytour))
      // console.log('mytour>>>>>>>', mytour)
      const { title, tourdetail } = mytour as any
      const formatTour = tourdetail.map((tourItem: { day: string,footprint: { address: string, location: { longitude: number, latitude: number } }[] }, tourIdx: number) => {
        const { day, footprint } = tourItem
        const points = footprint.map((fpItem) => fpItem.location)
        const markers = footprint.map((item: { address: string, location: { longitude: number, latitude: number } }) => {
          const { address, location } = item
          return genMarker({
            longitude: location.longitude,
            latitude: location.latitude,
            callout: {
              content: address,
            }
          })
        })
        let polyline: MapProps.polyline | null = null
        if (points.length > 1) {
          polyline = genPolyline({
            points,
            color: '#41C9A9',
            width: 6,
          })
        }
        if (tourIdx === 0) {
          setTabPane(day)
          setGMapMarkers(markers)
          if (polyline) {
            setGMapPolylines([polyline])
          }
          // 使用手动计算的中心点和缩放级别
          const centerInfo = calculateMapCenter(markers)
          if (centerInfo) {
            setMapConfig({
              ...mapConfig,
              longitude: centerInfo.centerLng,
              latitude: centerInfo.centerLat,
              scale: centerInfo.scale,
              includePoints: undefined // 不使用自动缩放
            })
          }
        }
        return {
          ...tourItem,
          markers,
          polyline
        }
      })
      console.log('formatTour>>>>>>>', formatTour)
      setMytour({
        title,
        tourdetail: formatTour,
      })
    }
    if (options.markers) {
      const markers = JSON.parse(decodeURIComponent(options.markers))
      console.log('markers>>>>>>>', markers)
      setGMapMarkers(markers)
    }
    if (options.polylines) {
      const polylines = JSON.parse(decodeURIComponent(options.polylines))
      setGMapPolylines(polylines)
      console.log('polylines>>>>>>>', polylines)
    }
  })

  // 计算所有标点的中心位置和合适的缩放级别
  const calculateMapCenter = (markers: any[]) => {
    if (!markers || markers.length === 0) return null

    const latitudes = markers.map(m => m.latitude)
    const longitudes = markers.map(m => m.longitude)
    
    const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2
    const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2
    
    // 计算距离范围来确定合适的缩放级别
    const latRange = Math.max(...latitudes) - Math.min(...latitudes)
    const lngRange = Math.max(...longitudes) - Math.min(...longitudes)
    const maxRange = Math.max(latRange, lngRange)
    
    // 根据范围计算缩放级别，范围越大缩放级别越小
    let scale = 14 // 默认较高的缩放级别
    if (maxRange > 0.1) scale = 12
    if (maxRange > 0.5) scale = 10
    if (maxRange > 1) scale = 8
    if (maxRange > 2) scale = 6
    
    // console.log('计算中心点:', { centerLat, centerLng, scale, maxRange })
    
    return { centerLat, centerLng, scale: 14 }
  }

  const onTabPaneChange = (tourItem: any) => {
    // console.log('onTabPaneChange>>>>>>>', tourItem)
    const { day, markers, polyline } = tourItem
    setTabPane(day)
    setGMapMarkers(markers)
    if (polyline) {
      setGMapPolylines([polyline])
    }
    
    // 计算中心点和缩放级别
    const centerInfo = calculateMapCenter(markers)
    if (centerInfo) {
      setMapConfig({
        ...mapConfig,
        longitude: centerInfo.centerLng,
        latitude: centerInfo.centerLat,
        scale: centerInfo.scale,
        includePoints: undefined // 不使用自动缩放
      })
    }
  }

  return (
    <View
      className='map-page-wrapper'
      style={{
        // paddingTop: `${statusBarHeight}PX`
      }}
    >
      {/* 地图容器 */}
      <View className='map-container'>
        <GMap
          className='my-gmap'
          longitude={mapConfig.longitude}
          latitude={mapConfig.latitude}
          showLocation={!!mapConfig.showLocation}
          scale={mapConfig.scale}
          minScale={mapConfig.minScale}
          maxScale={mapConfig.maxScale}
          showCompass={!!mapConfig.showCompass}
          enableZoom={!!mapConfig.enableZoom}
          enableScroll={true} // 启用滚动
          enableRotate={true} // 启用旋转
          includePoints={mapConfig.includePoints}
          includePadding={gMapIncludePadding}
          // customMapStyle={gMapCustomMapStyle}
          markers={gMapMarkers}
          polyline={gMapPolylines}
          // circles={gMapCircles}
          // polygons={gMapPolygons}
          // 组件错误时触发
          onError={({ detail }) => {
            console.log('地图错误>>>>>>>', detail)
          }}
          // 视野发生变化时触发
          onRegionChange={({ detail }) => {
            console.log('地图视野变化>>>>>>>', detail)
          }}
          // 点击定位时触发
          onAnchorPointTap={({ detail }) => {
            const { longitude, latitude } = detail
            console.log('onAnchorPointTap>>>>>>>', longitude, latitude, detail)
          }}
        />
      </View>

      {/* 全屏时顶部背景 */}
      <View
        className='map-cover'
        style={{
          opacity: isShowCover ? 1 : 0,
          zIndex: isShowCover ? 0 : -1,
        }}
      ></View>

      {/* 返回按钮 */}
      <Back
        status={estCardStatus === EstimateContain.FULL ? 'down' : 'normal'}
        onChangePanelStatus={(status) => {
          console.log('onChangePanelStatus>>>>>>>', status)
        }}
        onEstimateBack={() => Taro.navigateBack({ delta: 1 })}
      />

      {/* header */}
      {
        estCardStatus !== EstimateContain.FULL && (
          <View className="panel-header" style={{bottom: `${panelHeight}PX`}}>
            {/* tab切换 */}
            <View className="panel-header-tab-pane">
              {
                mytour?.tourdetail && mytour.tourdetail.length > 1 && (
                  mytour.tourdetail.map((tourItem, index) => (
                    <View className={`panel-header-tab-pane-item ${tabPane === tourItem.day ? 'active' : ''}`} key={index} onClick={() => onTabPaneChange(tourItem)}>
                      <View className="panel-header-tab-pane-item-icon"></View>
                      <View className="panel-header-tab-pane-item-text">{tourItem.day}</View>
                    </View>
                  ))
                )
              }
              <View className="panel-header-tab-pane-item">
                <View className="panel-header-tab-pane-item-icon">
                  <IconFont type={ICONFONT_ICONS.CHANGE} size={18} color="#41C9A9"/>
                </View>
                <View className="panel-header-tab-pane-item-text">换地点</View>
              </View>
              <View className="panel-header-tab-pane-item">
                <View className="panel-header-tab-pane-item-icon">
                  <IconFont type={ICONFONT_ICONS.DELETE} size={18} color="#D81F06"/>
                </View>
                <View className="panel-header-tab-pane-item-text">删地点</View>
              </View>
            </View>
            {/* 地图操作工具 */}
            <View className="panel-header-content">
              
            </View>
          </View>
        )
      }

      {/* 悬浮面板 */}
      <FloatingPanel
        onHeightChange={(newHeight, status) => {
          // console.log('高度发生改变>>>>>>>', newHeight, status, EstimateContain.FULL)
          setGMapIncludePadding({
            ...gMapIncludePadding,
            bottom: newHeight
          })
          setEstCardStatus(status)
          setPanelHeight(newHeight)
          setIsShowCover(status === EstimateContain.FULL)
        }}
        contentDraggable={true}
        showScrollbar={true}
        duration={300}
      >
        <View style={{ padding: '16px' }}>
          <Text style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            display: 'block'
          }}>
            自定义锚点面板 {JSON.stringify(estCardStatus)}
          </Text>
          
        </View>
      </FloatingPanel>
    </View>
  )
}