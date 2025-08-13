import React, { useState, useRef, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { getMenuButtonBoundingClientRect, getSystemInfo } from '@/utils/system'
import './index.less'
import { EstimateContain, EstimateContainValues } from '@/utils/enum'
import arrowDownIcon from '@/assets/iconfont/arrow-down.png'

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
  /** 底部输入框的高度，用于预留空间 */
  bottomPadding?: number
  /** 面板高度改变回调 */
  onHeightChange?: (height: number, status: EstimateContainValues) => void
  /** 自定义样式类 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: React.CSSProperties
  /** 子元素 */
  children?: React.ReactNode
  /** 外部控制的目标高度，用于程序化设置面板高度 */
  targetHeight?: number
}

export default function FloatingPanel({
  duration = 300,
  contentDraggable = true,
  safeAreaInsetBottom = false,
  showScrollbar = true,
  bottomPadding = 0,
  onHeightChange,
  customClass = '',
  customStyle = {},
  children,
  targetHeight
}: FloatingPanelProps) {
  // 系统信息
  const systemInfo = getSystemInfo()
  const menuInfo = getMenuButtonBoundingClientRect()
  const panelHeight = systemInfo.windowHeight - menuInfo.height - menuInfo.top
  const EstPanelAnchor = {
    COLLAPSE: 36,
    HALF: Math.round(0.5 * panelHeight),
    FULL: panelHeight
  }

  const [height, setHeight] = useState(EstPanelAnchor.COLLAPSE)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(EstPanelAnchor.COLLAPSE)
  const [estPanelStatus, setEstPanelStatus] = useState<EstimateContainValues>(EstimateContain.COLLAPSE)
  const panelRef = useRef<HTMLDivElement>(null)

  // 监听外部控制的目标高度
  useEffect(() => {
    if (targetHeight !== undefined && targetHeight !== height) {
      setHeight(targetHeight)
    }
  }, [targetHeight])

  // 公共的状态判断函数
  const getStatus = (h: number) => {
    // 使用分层容差，避免状态边界重叠
    const fullTolerance = 40 // FULL状态容差
    const collapseTolerance = 20 // COLLAPSE状态容差  
    const halfTolerance = 25 // HALF状态容差
    
    // 优先判断极端位置，避免冲突
    // 接近FULL位置时返回FULL状态（优先级最高）
    if (h >= EstPanelAnchor.FULL - fullTolerance) return EstimateContain.FULL
    
    // 接近COLLAPSE位置时返回COLLAPSE状态（优先级第二）
    if (h <= EstPanelAnchor.COLLAPSE + collapseTolerance) return EstimateContain.COLLAPSE
    
    // 在中间区域且接近HALF位置时返回HALF状态
    if (h > EstPanelAnchor.COLLAPSE + collapseTolerance + 10 && 
        h < EstPanelAnchor.FULL - fullTolerance - 10 &&
        Math.abs(h - EstPanelAnchor.HALF) <= halfTolerance) {
      return EstimateContain.HALF
    }
    
    return EstimateContain.OTHER // 自由位置
  }

  useEffect(() => {
    const newStatus = getStatus(height)
    setEstPanelStatus(newStatus)
    onHeightChange?.(height, newStatus)
  }, [height, isDragging])

  // 处理触摸开始
  const onTouchStart = (e: any) => {
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
      const newHeight = Math.max(EstPanelAnchor.COLLAPSE, Math.min(EstPanelAnchor.FULL, startHeight + deltaY))
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
    
    // 拖拽结束后立即更新状态
    const status = getStatus(finalHeight)
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
        {
          (estPanelStatus === EstimateContain.OTHER || estPanelStatus === EstimateContain.HALF) && (
            <View className="floating-panel__handle-indicator"></View>
          )
        }
        {
          (estPanelStatus === EstimateContain.FULL || estPanelStatus === EstimateContain.COLLAPSE) && (
            <View className={`floating-panel__handle-image ${estPanelStatus === EstimateContain.FULL ? 'full' : estPanelStatus === EstimateContain.COLLAPSE ? 'collapse' : ''}`}>
              <Image className='arrow-icon' src={arrowDownIcon} />
            </View>
          )
        }
      </View>

      {/* 内容区域 */}
      <View
        className={`floating-panel__content ${showScrollbar ? 'floating-panel__content--scrollable' : ''}`}
        style={{ paddingBottom: `${bottomPadding}px` }}
        onTouchStart={onContentTouchStart}
        onTouchMove={onContentTouchMove}
        onTouchEnd={onContentTouchEnd}
      >
        {children}
      </View>
    </View>
  )
}