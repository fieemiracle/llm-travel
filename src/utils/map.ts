import { MapMarkerType, MapPolylineType } from "@/types/map"
import pointIcon from "@/assets/iconfont/point.png"
import { generateRandomHash } from "./tools"

// 地图点标记
export const genMarker = (markerOptions: MapMarkerType) => {
  const { longitude, latitude, iconPath, id, ...restOPtions } = markerOptions;
  const defaultOptions = {
    id: id || Number(generateRandomHash('0123456789', 6)),
    width: restOPtions.width || 32,
    height: restOPtions.height || 32,
    iconPath: iconPath || pointIcon,
    callout: {
      content: restOPtions.callout?.content || '',
      color: restOPtions.callout?.color || '#000',
      fontSize: restOPtions.callout?.fontSize || 12,
      bgColor: restOPtions.callout?.bgColor || '#fff',
      anchorX: restOPtions.callout?.anchorX || .5,
      anchorY: restOPtions.callout?.anchorY || .5,
      borderRadius: restOPtions.callout?.borderRadius || 10,
      borderWidth: restOPtions.callout?.borderWidth || 1,
      borderColor: restOPtions.callout?.borderColor || '#000',
      padding: restOPtions.callout?.padding || 10,
      display: restOPtions.callout?.display || 'ALWAYS',
      textAlign: restOPtions.callout?.textAlign || 'center'
    }
  }
  return {
    ...defaultOptions,
    longitude,
    latitude,
  }
}

// 折线
export const genPolyline = (polylineOptions: MapPolylineType) => {
  const { points, ...restOptions } = polylineOptions
  return {
    points,
    ...restOptions
  }
}