import React, { useState, useRef, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getMenuButtonBoundingClientRect, getSystemInfo } from '@/utils/system'
import './index.less'
import { EstimateContain, EstimateContainValues } from '@/utils/enum'

interface FloatingPanelProps {
  /** 当前面板的显示高度 */
  height?: number
  /** 设置自定义锚点, 单位 px */
  anchors?: number[]
  /** 动画时长，单位ms，设置为 0 可以禁用动画 */
  duration?: number
  /** 允许拖拽内容容器 */
  contentDraggable?: boolean
  /** 是否开启底部安全区适配 */
  safeAreaInsetBottom?: boolean
  /** 是否开启滚动条 */
  showScrollbar?: boolean
  /** 面板高度改变回调 */
  onHeightChange?: (height: number, status: EstimateContainValues) => void
  /** 自定义样式类 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: React.CSSProperties
  /** 子元素 */
  children?: React.ReactNode
}

export default function FloatingPanel({
  duration = 300,
  contentDraggable = true,
  safeAreaInsetBottom = false,
  showScrollbar = true,
  onHeightChange,
  customClass = '',
  customStyle = {},
  children
}: FloatingPanelProps) {
  // 系统信息
  const systemInfo = getSystemInfo()
  const menuInfo = getMenuButtonBoundingClientRect()
  const panelHeight = systemInfo.windowHeight - menuInfo.height - menuInfo.top
  const EstPanelAnchor = {
    COLLAPSE: 24,
    HALF: Math.round(0.5 * panelHeight),
    FULL: panelHeight
  }

  const [height, setHeight] = useState(EstPanelAnchor.HALF)
  onHeightChange?.(height, EstimateContain.HALF)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(EstPanelAnchor.HALF)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getStatus = (h: number) => {
      if (h === EstPanelAnchor.FULL) return EstimateContain.FULL
      if (h === EstPanelAnchor.HALF) return EstimateContain.HALF  
      if (h === EstPanelAnchor.COLLAPSE) return EstimateContain.COLLAPSE
      return EstimateContain.OTHER // 自由位置
    }
    const status = getStatus(height)
    onHeightChange?.(height, status)
  }, [height])

  // 处理触摸开始
  const onTouchStart = (e: any) => {
    // console.log('Touch start:', e.touches?.[0]?.clientY)
    setIsDragging(true)
    const clientY = e.touches?.[0]?.clientY || 0
    setStartY(clientY)
    setStartHeight(height) // 在触摸开始时设置起始高度
  }

  // 处理触摸移动
  const onTouchMove = (e: any) => {
    if (!isDragging) return

    const currentY = e.touches?.[0]?.clientY || 0
    const deltaY = startY - currentY
    
    if (Math.abs(deltaY) > 3) { // 降低拖拽阈值，让响应更灵敏
      // console.log('deltaY>>>>>>>', startY, currentY, deltaY, startHeight)
      const newHeight = Math.max(EstPanelAnchor.COLLAPSE, Math.min(EstPanelAnchor.FULL, startHeight + deltaY))
      // console.log('Touch move:', { currentY, deltaY, newHeight })
      setHeight(newHeight)
    }
  }

  // 处理触摸结束
  const onTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    
    // 不再强制吸附到锚点，保持当前位置
    // 只需要确保在合理范围内
    const finalHeight = Math.max(EstPanelAnchor.COLLAPSE, Math.min(EstPanelAnchor.FULL, height))
    setHeight(finalHeight)
    
    // 根据当前高度判断状态
    const getStatus = (h: number) => {
      if (h === EstPanelAnchor.FULL) return EstimateContain.FULL
      if (h === EstPanelAnchor.HALF) return EstimateContain.HALF  
      if (h === EstPanelAnchor.COLLAPSE) return EstimateContain.COLLAPSE
      return EstimateContain.OTHER // 自由位置
    }
    
    const status = getStatus(finalHeight)
    // console.log('Touch end, final height:', finalHeight, status)
    onHeightChange?.(finalHeight, status)
  }

  // 处理内容区域触摸
  const onContentTouchStart = (e: any) => {
    if (!contentDraggable) return
    onTouchStart(e)
  }

  const onContentTouchMove = (e: any) => {
    if (!contentDraggable) return
    onTouchMove(e)
  }

  const onContentTouchEnd = () => {
    if (!contentDraggable) return
    onTouchEnd()
  }

  const panelStyle: React.CSSProperties = {
    height: `${height}px`,
    transition: isDragging ? 'none' : `height ${duration}ms ease-out`,
    ...customStyle
  }

  const panelClassName = `floating-panel ${customClass} ${safeAreaInsetBottom ? 'safe-area' : ''} ${isDragging ? 'dragging' : ''}`

  return (
    <View
      className={panelClassName}
      style={panelStyle}
      ref={panelRef}
    >
      {/* 拖拽手柄 */}
      <View
        className="floating-panel__handle"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <View className="floating-panel__handle-indicator" />
      </View>

      {/* 内容区域 */}
      <View
        className={`floating-panel__content ${showScrollbar ? 'floating-panel__content--scrollable' : ''}`}
        onTouchStart={onContentTouchStart}
        onTouchMove={onContentTouchMove}
        onTouchEnd={onContentTouchEnd}
      >
        {children}
      </View>
    </View>
  )
}