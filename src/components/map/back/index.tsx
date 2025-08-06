import { View, Image } from "@tarojs/components"
import { useReady } from "@tarojs/taro"
import { useState } from "react"
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { getMenuButtonBoundingClientRect, getStatusBarHeight, getSystemInfo } from "@/utils/system"
import arrowLeft from '@/assets/iconfont/arrow-left.png'
import "./index.less"

type BackProps = {
  status: 'normal' | 'down'
  onChangePanelStatus?: (status: EstimateContainValues) => void
  onEstimateBack?: () => void
}

export default function Back({
  status,
  onChangePanelStatus,
  onEstimateBack,
}: BackProps) {
  const [backStyle, setBackStyle] = useState<React.CSSProperties>({})

  const handlerTap = () => {
    if (status === 'down') {
      onChangePanelStatus?.(EstimateContain.HALF)
      return
    }
    onEstimateBack?.()
  }

  const initStyle = () => {
    // 获取状态栏高度
    const statusBarHeight = getStatusBarHeight()
    // 获取胶囊按钮信息
    const menuInfo = getMenuButtonBoundingClientRect()
    // 获取系统信息
    const systemInfo = getSystemInfo()
    const left = systemInfo.windowWidth - menuInfo.right
    
    const styleObj = {
      top: `${statusBarHeight}PX`,
      left: `${left}PX`,
      height: `${menuInfo.height}PX`,
      width: `${menuInfo.height}PX`,
      lineHeight: `${menuInfo.height}PX`,
    }
    
    setBackStyle(styleObj)
  }

  useReady(() => {
    initStyle()
  })

  return (
    <View 
      className={`back-container ${status}`} 
      style={backStyle} 
      onClick={handlerTap}
    >
      <Image className={`image-${status}`} src={arrowLeft} />
    </View>
  )
}