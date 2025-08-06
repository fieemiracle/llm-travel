import { View, Map as GMap, Text } from "@tarojs/components"
import type { MapProps } from '@tarojs/components'
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { useState } from "react"
import {
  MapConfigType,
  IncludePaddingStyleT,
  CustomMapStyleT
} from "@/types/map"
import Back from "@/components/map/back"
import Taro, { useLoad } from "@tarojs/taro"
import FloatingPanel from "@/components/common/floating-panel"
import pointIcon from '@/assets/iconfont/point.png'
import './index.less'

const DEFAULT_MAP_CONFIG: MapConfigType = {
  longitude: 116.397428,
  latitude: 39.90923,
  scale: 10,
  minScale: 3,
  maxScale: 20,
  showLocation: true
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
  const [gMapCircles, setGMapCircles] = useState<MapProps.circle[]>([])
  const [gMapPolygons, setGMapPolygons] = useState<MapProps.polygon[]>([])
  const [gMapIncludePadding, setGMapIncludePadding] = useState<IncludePaddingStyleT>(DEFAULT_INCLUDE_PADDING)
  const [gMapCustomMapStyle, setGMapCustomMapStyle] = useState<CustomMapStyleT>('default')

  const [isShowCover, setIsShowCover] = useState(false)
  const [estCardStatus, setEstCardStatus] = useState<EstimateContainValues>(EstimateContain.HALF)
  // console.log('面板状态>>>>>>>', estCardStatus)

  // 接收参数
  const { point } = Taro.getCurrentInstance().router?.params || {}
  console.log('point>>>>>>>', point)
  useLoad((options) => {
    console.log('options>>>>>>>', options, options.point)
    if (options.point) {
      try {
        const point = JSON.parse(decodeURIComponent(options.point))
        const { location } = point
        console.log('经纬度>>>>>>>', location)
        
        if (location && location.longitude && location.latitude) {
          setMapConfig({
            ...mapConfig,
            longitude: location.longitude,
            latitude: location.latitude
          })
          setGMapMarkers([
            {
              latitude: location.latitude,
              longitude: location.longitude,
              iconPath: pointIcon,
              width: 32,
              height: 32,
              callout: {
                content: point.title,
                color: '#000',
                fontSize: 12,
                bgColor: '#fff',
                anchorX: .5,
                anchorY: .5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#000',
                padding: 10,
                display: 'ALWAYS',
                textAlign: 'center'
              }
            }
          ])
          // console.log('接收到的数据>>>>>>>', point)
        } else {
          console.error('location数据不完整:', location)
        }
      } catch (error) {
        console.error('解析point参数失败:', error)
      }
    }
  })

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
          includePoints={mapConfig.includePoints}
          includePadding={gMapIncludePadding}
          customMapStyle={gMapCustomMapStyle}
          markers={gMapMarkers}
          polyline={gMapPolylines}
          circles={gMapCircles}
          polygons={gMapPolygons}
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

      {/* 悬浮面板 */}
      <FloatingPanel
        onHeightChange={(newHeight, status) => {
          console.log('onHeightChange>>>>>>>', newHeight, status)
          setEstCardStatus(status)
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
            自定义锚点面板
          </Text>
          
        </View>
      </FloatingPanel>
    </View>
  )
}