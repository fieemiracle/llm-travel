import { MapMarkerType } from "@/types/map";

// 地图点标记
export const genMarker = (markerOptions: MapMarkerType) => {
  const { longitude, latitude, iconPath, id, ...restOPtions} = markerOptions;
  return {
    longitude,
    latitude,
    iconPath,
    id,
    ...restOPtions
  }
}