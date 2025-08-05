import React, { useState, useRef } from 'react'
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
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(EstPanelAnchor.HALF)
  const panelRef = useRef<HTMLDivElement>(null)

  // 处理触摸开始
  const onTouchStart = (e: any) => {
    console.log('Touch start:', e.touches?.[0]?.clientY)
    setIsDragging(true)
    setStartY(e.touches?.[0]?.clientY || 0)
  }

  // 处理触摸移动
  const onTouchMove = (e: any) => {
    if (!isDragging) return

    const currentY = e.touches?.[0]?.clientY || 0
    const deltaY = startY - currentY
    if (Math.abs(deltaY) > 10) {
      console.log('deltaY>>>>>>>', startY, currentY, deltaY, startHeight, EstPanelAnchor.HALF)
      const newHeight = Math.max(EstPanelAnchor.COLLAPSE, Math.min(EstPanelAnchor.FULL, startHeight + deltaY))
      console.log('Touch move:', { currentY, deltaY, newHeight })
      setHeight(newHeight)
      setStartHeight(newHeight)
    }
  }

  // 处理触摸结束
  const onTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    const status = height === EstPanelAnchor.FULL
      ? EstimateContain.FULL
      : height === EstPanelAnchor.HALF
        ? EstimateContain.HALF
        : height === EstPanelAnchor.COLLAPSE
          ? EstimateContain.COLLAPSE
          : EstimateContain.OTHER
    console.log('Touch end, current height:', height, status)
    onHeightChange?.(height, status)
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