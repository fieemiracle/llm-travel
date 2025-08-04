import { View, Map as GMap } from "@tarojs/components"
import type { MapProps } from '@tarojs/components'
// import { getStatusBarHeight } from "@/utils/system"
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { useEffect, useState } from "react"
import {
  MapConfigType,
  IncludePaddingStyleT,
  CustomMapStyleT
} from "@/types/map"
import Back from "@/components/map/back"
import Taro from "@tarojs/taro"
import MovablePanel from "@/components/common/MovablePanel"
import { getMenuButtonBoundingClientRect } from "@/utils/system"
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
  // 顶部状态栏高度
  // const statusBarHeight = getStatusBarHeight()
  // 获取胶囊按钮信息
  const menuInfo = getMenuButtonBoundingClientRect()
  const paddingTop = menuInfo.height + menuInfo.top

  const [mapConfig, setMapConfig] = useState<MapConfigType>(DEFAULT_MAP_CONFIG)
  const [gMapMarkers, setGMapMarkers] = useState<MapProps.marker[]>([])
  const [gMapPolylines, setGMapPolylines] = useState<MapProps.polyline[]>([])
  const [gMapCircles, setGMapCircles] = useState<MapProps.circle[]>([])
  const [gMapPolygons, setGMapPolygons] = useState<MapProps.polygon[]>([])
  const [gMapIncludePadding, setGMapIncludePadding] = useState<IncludePaddingStyleT>(DEFAULT_INCLUDE_PADDING)
  const [gMapCustomMapStyle, setGMapCustomMapStyle] = useState<CustomMapStyleT>('default')

  const [isShowCover, setIsShowCover] = useState(false)
  const [estCardStatus, setEstCardStatus] = useState<EstimateContainValues>(EstimateContain.HALF)
  console.log('estCardStatus>>>>>>>', estCardStatus)


  // useEffect(() => {
  //   setMapConfig(DEFAULT_MAP_CONFIG)
  // }, [])
  
  useEffect(() => {
    const isFullScreen = estCardStatus === EstimateContain.FULL
    // const isCollapse = estCardStatus === EstimateContain.COLLAPSE
    setIsShowCover(isFullScreen)
  }, [estCardStatus])
  
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
        onChangePanelStatus={(status) => setEstCardStatus(status)}
        onEstimateBack={() => Taro.navigateBack({ delta: 1 })}
      />

      {/* 可移动面板 */}
      <MovablePanel
        cardStatus={estCardStatus}
        padding={[paddingTop, 0, 0, 0]}
        onChangeStatus={(status) => setEstCardStatus(status)}
        onDragDown={(isChange) => {
          console.log('onDragDown>>>>>>>', isChange)
        }}
      />
    </View>
  )
}