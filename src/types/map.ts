import type { MapProps } from '@tarojs/components'

// 地图组件类型
export type IncludePaddingStyleT = {
  left: string | number
  right: string | number
  top: string | number
  bottom: string | number
}

// 地图样式类型
export type CustomMapStyleT = 'default' | 'light'

// 地图配置类型
export type MapConfigType = {
  longitude: number
  latitude: number
  showLocation?: boolean
  scale?: number
  minScale?: number
  maxScale?: number
  showCompass?: boolean // 显示指南针, 默认false
  showScale?: boolean // 显示比例尺, 默认false
  enableOverlooking?: boolean // 是否开启俯视, 默认false
  enableZoom?: boolean // 是否开启缩放, 默认true
  enableScroll?: boolean // 是否开启拖动, 默认true
  enableRotate?: boolean // 是否开启旋转, 默认false
  enableSatellite?: boolean // 是否开启卫星图, 默认false
  enableTraffic?: boolean // 是否开启实时交通, 默认false
  includePoints?: MapProps.point[]
  includePadding?: IncludePaddingStyleT // 视野在地图 padding 范围内展示
  subkey?: string // 个性化地图使用的key
  layerStyle?: number // 个性化地图使用的layerStyle，不支持动态修改
  rotate?: number // 旋转角度，范围 0 ~ 360, 地图正北和设备 y 轴角度的夹角，默认为0
  skew?: number // 倾斜角度，范围 0 ~ 40 , 关于 z 轴的倾角，默认为0
  customMapStyle?: CustomMapStyleT
}

// callout 气泡窗口类型
export type MarkerCalloutType = {
  content: string
  color?: string
  fontSize?: number
  bgColor?: string
  anchorX?: number
  anchorY?: number
  borderWidth?: number
  borderRadius?: number
  borderColor?: string
  padding?: number
  display?: 'BYCLICK' | 'ALWAYS' // 'BYCLICK':点击显示; 'ALWAYS':常显
  textAlign?: 'left' | 'center' | 'right' // 文本对齐方式
}

// marker 上的自定义气泡 customCallout
// customCallout 存在时将忽略 callout 与 title 属性。自定义气泡采用采用 cover-view 定制，灵活度更高
export type MarkerCustomCalloutType = Pick<MarkerCalloutType, 'display' | 'anchorX' | 'anchorY'>

// label 标签类型
export type LabelType = Omit<MarkerCalloutType, 'display'>

// anchor 锚点类型
export type AnchorType = {
  x: number // 水平方向偏移量，默认0, 范围 0~1
  y: number // 垂直方向偏移量，默认0, 范围 0~1
}

// 地图点标记类型
export type MapMarkerType = {
  latitude: number
  longitude: number
  iconPath?: string // 显示的图标
  id?: number // 标记点id
  title?: string // 标注点名
  zIndex?: number // 标注点层级
  alpha?: number // 标注点透明度
  width?: number
  height?: number
  callout?: MarkerCalloutType // 标记点上方的气泡窗口
  customCallout?: MarkerCalloutType // 自定义气泡窗口
  label?: LabelType // 为标记点旁边增加标签
  anchor?: AnchorType // 经纬度在标注图标的锚点，默认底边中点
  ariaLabel?: string // 无障碍访问，（属性）元素的额外描述
}

// polyline 折线类型 指定一系列坐标点，从数组第一项连线至最后一项
export type MapPolylineType = {
  points: {
    latitude: number
    longitude: number
  }[] // [{latitude: 0, longitude: 0}]
  color?: string // 十六进制
  width?: number
  dottedLine?: boolean // 是否使用虚线，默认false
  arrowLine?: boolean // 是否使用箭头，默认false
  arrowIconPath?: string // 箭头图标路径
  borderColor?: string // 线的边框颜色
  borderWidth?: number // 箭头图标宽度
}

// polygon 指定一系列坐标点，根据 points 坐标数据生成闭合多边形
// export type MapPolygonType = {
//   points: MapProps.point[] // [{latitude: 0, longitude: 0}]
//   color?: string // 十六进制
//   borderColor?: string // 线的边框颜色
//   borderWidth?: number // 线的边框宽度
// }

// circle 指定圆心坐标和半径，生成圆形覆盖物
export type MapCircleType = {
  latitude: number
  longitude: number
  radius: number
  color?: string // 十六进制
  fillColor?: string // 十六进制
  strokeWidth?: number
}
