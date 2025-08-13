import { View, Map as GMap } from "@tarojs/components"
import type { MapProps } from '@tarojs/components'
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { useState } from "react"
import {
  MapConfigType,
} from "@/types/map"
import Back from "@/components/map/back"
import Taro, { useLoad } from "@tarojs/taro"
import FloatingPanel from "@/components/common/floating-panel"
import './index.less'
import { genMarker, genPolyline } from "@/utils/map"
import IconFont from "@/components/common/iconfont"
import { ICONFONT_ICONS } from "@/utils/iconfont"
import { useDispatch } from "react-redux"
import { setQueryText } from "@/store/actions/chat"
import Chat from "@/components/chat"
import { getSystemInfo, getMenuButtonBoundingClientRect } from "@/utils/system"

const DEFAULT_MAP_CONFIG: MapConfigType = {
  longitude: 116.397428,
  latitude: 39.90923,
  scale: 14, // 进一步提高默认缩放级别，让标点更居中
  minScale: 5, // 提高最小缩放级别，避免过度缩小
  maxScale: 20,
  showLocation: true,
  enableZoom: true // 确保启用缩放功能
}

const CHANGE_LOCATION_TEXT = '换地点'
const DELETE_LOCATION_TEXT = '删地点'



export default function Map() {
  const [mapConfig, setMapConfig] = useState<MapConfigType>(DEFAULT_MAP_CONFIG)
  const [gMapMarkers, setGMapMarkers] = useState<MapProps.marker[]>([])
  const [gMapPolylines, setGMapPolylines] = useState<MapProps.polyline[]>([])


  const [isShowCover, setIsShowCover] = useState(false)
  const [estCardStatus, setEstCardStatus] = useState<EstimateContainValues>(EstimateContain.HALF)
  const [panelHeight, setPanelHeight] = useState<number>(0)
  const [tabPane, setTabPane] = useState<string>('')
  const [mytour, setMytour] = useState<{title: string, tourdetail: any[]} | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [targetPanelHeight, setTargetPanelHeight] = useState<number | undefined>(undefined)

  const dispatch = useDispatch()

  // 接收参数
  useLoad((options) => {
    // 出游路线
    if (options.mytour) {
      const mytour = JSON.parse(decodeURIComponent(options.mytour))
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
          const updateConfig = calculateMapCenter(markers)
          setMapConfig({
            ...mapConfig,
            longitude: updateConfig?.centerLng || mapConfig.longitude,
            latitude: updateConfig?.centerLat || mapConfig.latitude,
            scale: updateConfig?.scale || mapConfig.scale
          })
          if (polyline) {
            setGMapPolylines([polyline])
          }
          // 使用includePoints自动调整视野，确保所有marker都在视野内
          const includePoints = generateIncludePoints(markers)
          setMapConfig({
            ...mapConfig,
            includePoints
            // 当使用includePoints时，不需要手动设置longitude、latitude和scale
          })
        }
        return {
          ...tourItem,
          markers,
          polyline
        }
      })
      setMytour({
        title,
        tourdetail: formatTour,
      })
    }
    if (options.markers) {
      const markers = JSON.parse(decodeURIComponent(options.markers))
      setGMapMarkers(markers)
      const updateConfig = calculateMapCenter(markers)
      setMapConfig({
        ...mapConfig,
        longitude: updateConfig?.centerLng || mapConfig.longitude,
        latitude: updateConfig?.centerLat || mapConfig.latitude,
        scale: updateConfig?.scale || mapConfig.scale
      })
    }
    if (options.polylines) {
      const polylines = JSON.parse(decodeURIComponent(options.polylines))
      setGMapPolylines(polylines)
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
    
    return { centerLat, centerLng, scale }
  }

  // 生成includePoints配置，用于自动调整地图视野
  const generateIncludePoints = (markers: any[]) => {
    if (!markers || markers.length === 0) return []
    
    return markers.map(marker => ({
      latitude: marker.latitude,
      longitude: marker.longitude
    }))
  }

  const onTabPaneChange = (tourItem: any) => {
    const { day, markers, polyline } = tourItem
    setTabPane(day)
    setGMapMarkers(markers)
    if (polyline) {
      setGMapPolylines([polyline])
    }
    
    // 使用includePoints自动调整视野
    const includePoints = generateIncludePoints(markers)
    setMapConfig({
      ...mapConfig,
      includePoints
    })
  }

  const changeLocation = (type: 'change' | 'delete', text: string) => {
    console.log('changeLocation>>>>>>>', type)
    setShowChat(true)
    dispatch(setQueryText(text))
    // 计算半屏高度
    const systemInfo = getSystemInfo()
    const menuInfo = getMenuButtonBoundingClientRect()
    const panelHeight = systemInfo.windowHeight - menuInfo.height - menuInfo.top
    const halfHeight = Math.round(0.5 * panelHeight)
    setTargetPanelHeight(halfHeight)
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
          // customMapStyle={gMapCustomMapStyle}
          markers={gMapMarkers}
          polyline={gMapPolylines}
          // circles={gMapCircles}
          // polygons={gMapPolygons}
          // 组件错误时触发
          onError={({ detail }) => {
            console.log('onError>>>>>>>', detail)
          }}
          // 视野发生变化时触发
          onRegionChange={({ detail }) => {
            console.log('onRegionChange>>>>>>>', detail)
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
              <View className="panel-header-tab-pane-item" onClick={() => changeLocation('change', CHANGE_LOCATION_TEXT)}>
                <View className="panel-header-tab-pane-item-icon">
                  <IconFont type={ICONFONT_ICONS.CHANGE} size={18} color="#41C9A9"/>
                </View>
                <View className="panel-header-tab-pane-item-text">{CHANGE_LOCATION_TEXT}</View>
              </View>
              <View className="panel-header-tab-pane-item" onClick={() => changeLocation('delete', DELETE_LOCATION_TEXT)}>
                <View className="panel-header-tab-pane-item-icon">
                  <IconFont type={ICONFONT_ICONS.DELETE} size={18} color="#D81F06"/>
                </View>
                <View className="panel-header-tab-pane-item-text">{DELETE_LOCATION_TEXT}</View>
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
          setEstCardStatus(status)
          setPanelHeight(newHeight)
          setIsShowCover(status === EstimateContain.FULL)
          // 如果当前高度已经达到目标高度，清除目标高度
          if (targetPanelHeight !== undefined && Math.abs(newHeight - targetPanelHeight) < 5) {
            setTargetPanelHeight(undefined)
          }
        }}
        contentDraggable={true}
        showScrollbar={true}
        duration={300}
        targetHeight={targetPanelHeight}
      >
        {
          showChat && (
            <Chat />
          )
        }
      </FloatingPanel>
    </View>
  )
}