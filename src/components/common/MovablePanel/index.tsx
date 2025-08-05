import { MovableArea, MovableView, ScrollView, View, Slot } from "@tarojs/components"
import { useMemo, useRef, useState } from "react"
import React from "react"
import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import initCard, { computeMvViewHeight, getCustomeStyle, getPosition } from "./useUniversalCard"
import { isAlipay, isH5 } from "@/utils/env"
import "./index.less"
import Taro from "@tarojs/taro"
import { getSystemInfo } from "@/utils/system"

export type MovablePanelPropsT = {
  cardStatus: EstimateContainValues
  // 外层样式，可自定义宽度
  wrapperStyle?: string
  // 内边距 上右下左
  padding?: number[]
  // 组件初始化时展示的偏移量(半屏偏移)，即：负展示高度
  // 传0 默认没有半屏中间态，默认值-274
  initialOffset?: number
  // 组件最大偏移量(半屏偏移)，即：负展示高度
  // 无吸附的滑动场景下，为初始展示偏移高度，默认值-72
  maxOffset?: number
  // 偏移量，当偏移量超过这个值时改变状态
  // 传0 则松开手指无吸附，默认值30
  transitionDiff?: number
  // 内容容器的自定义style，用于覆盖默认样式
  contentStyle?: string
  // 顶部容器的自定义style，用于覆盖默认样式
  headerStyle?: string
  // 是否隐藏操作条
  shouldHiddenTouchBar?: boolean //默认值false
  disable?: boolean // 默认值false
  isShowTouchBarForFull?: boolean // 默认值false
  placeholderStyleSetting?: string // 默认值''
  onChangeStatus: (status: EstimateContainValues) => void
  onDragDown: (isChange: boolean) => void
  children?: React.ReactNode
}

const systemInfo = getSystemInfo()
const DEFAULT_PADDING = [0, 0, 0, 0]
// 初始半屏偏移量
const DEFAULT_INITIAL_OFFSET = -systemInfo.windowHeight * 0.4
// 组件最大偏移量(收起状态偏移)，即：负展示高度，设置为负值以支持 COLLAPSE 状态
const DEFAULT_MAX_OFFSET = -systemInfo.windowHeight * 0.9
const DEFAULT_TRANSITION_DIFF = 10

MovablePanel.defaultProps = {
  padding: DEFAULT_PADDING,
  initialOffset: DEFAULT_INITIAL_OFFSET,
  maxOffset: DEFAULT_MAX_OFFSET,
  transitionDiff: DEFAULT_TRANSITION_DIFF,
  isShowTouchBarForFull: false,
  disable: false,
  placeholderStyleSetting: ''
}

export default function MovablePanel(props: MovablePanelPropsT) {
  const {
    cardStatus, wrapperStyle, contentStyle,
    headerStyle, shouldHiddenTouchBar,
    disable = false, placeholderStyleSetting = '',
    padding = DEFAULT_PADDING, initialOffset = DEFAULT_INITIAL_OFFSET,
    maxOffset = DEFAULT_MAX_OFFSET, transitionDiff = DEFAULT_TRANSITION_DIFF,
  } = props;

  const [randomH, setRandomH] = useState<number>(0)
  const [isAnimation, setIsAnimation] = useState<boolean>(false)
  const [isTouchingBar, setIsTouchingBar] = useState<boolean>(false) // 是否在动操作bar
  const [isScrolledTop, setIsScrolledTop] = useState<boolean>(true) // 是否滚动到顶部
  const [startX, setStartX] = useState<number>(0) // 开始触摸的x坐标
  const [startY, setStartY] = useState<number>(0) // 开始触摸的y坐标
  const [offsetX, setOffsetX] = useState<number>(0) // 滚动偏移量
  const [offsetY, setOffsetY] = useState<number>(0) // 滚动偏移量
  const [isFirstDragDown, setIsFirstDragDown] = useState<boolean>(false) // 是否是第一次下拉
  const scrollViewRef = useRef<any>(null)

  const { mvViewHeight, positionStyle, getFinalOffset, getScreenStatus } = getPosition({padding, maxOffset, initialOffset, transitionDiff})
  const { touchBarClass, placeholderHeight } = getCustomeStyle(props, { cardStatus, mvViewHeight })
  const { setCardStatus, scrollToTop, scrollTo, isScroll, scrollY } = initCard(props, cardStatus)

  // 非第一次时会使用的展示高度
  const finalOffset = useMemo(() => {
    return getFinalOffset(cardStatus) - randomH
  }, [cardStatus, getFinalOffset, randomH])

  const canScroll = useMemo(() => {
    return cardStatus === EstimateContain.HALF && !(isScrolledTop && offsetY > 0)
  }, [cardStatus, isScrolledTop, offsetY])

  // movable-area 是否可以移动
  const disabled = useMemo(() => {
    return disable || (isTouchingBar && canScroll)
  }, [disable, cardStatus])

  const triggerDragDown = (isChange: boolean) => {
    // 下拉超过偏移量时，抛出事件，通知父组件提前漏出地图
    props.onDragDown(isChange)
    // 单次只触发一次
    setIsFirstDragDown(isChange)
  }

  const clearEffects = () => {
    setOffsetX(0)
    setOffsetY(0)
    setStartX(0)
    setStartY(0)
    setIsTouchingBar(false)
  }

  const dealScreenStatus = () => {
    const oldCardStatus = cardStatus
    const oldOffsetX = Math.abs(offsetX)
    // 横向滑动 > 竖向滑动 的时候不收起表单
    if (oldOffsetX > transitionDiff && oldOffsetX > Math.abs(offsetY)) {
      console.log('横向滑动 > 竖向滑动 的时候不收起表单', oldOffsetX, transitionDiff, Math.abs(offsetY))
      return
    }
    let status = getScreenStatus(cardStatus, offsetY)
    console.log('dealScreenStatus', status)
    if (status === EstimateContain.FULL) {
      triggerDragDown(false)
    }
    // 尾部特殊处理，当中屏高度和收起高度一致时（车型数量不足导致），不设置为中屏，统一设置为COLLAPSE
    // 注意：只有在 maxOffset 和 initialOffset 都不为 0 且相等时才强制设置为 HALF
    if (maxOffset !== 0 && initialOffset !== 0 && maxOffset === initialOffset) {
      status = EstimateContain.HALF
    }
    // 统一设置状态
    if (!disable) setCardStatus(status) 
    // 兼容universe-card内部有点击事件时，会同时触发movable-view的touch，未变更卡片状态时更新 y 值，当y偏移量小于3时，不强制更新
    if (status === oldCardStatus && Math.abs(offsetY) > 3) {
      setRandomH(Math.random())
    }
    clearEffects()
  }

  const processScroll = (res: { scrollTop: number }) => {
    if (!res) {
      return
    }
    const { scrollTop } = res
    setIsScrolledTop(scrollTop < 15)
    if (canScroll && !isTouchingBar) {
      console.log('全屏下拉然后又回到原处时，通知隐藏地图', canScroll, isTouchingBar)
      // 全屏下拉然后又回到原处时，通知隐藏地图
      triggerDragDown(false)
      return clearEffects()
    }
    dealScreenStatus()
  }
  
  // 可移动面板事件
  // 顶部触控区触摸事件，用于解开movable的锁定
  const handlerTouchStart = (e: any) => {
    // console.log('handlerTouchStart', e)
    setIsTouchingBar(true)
    const { pageX, pageY } = e.touches[0]
    console.log('handlerTouchStart', pageX, pageY)
    setStartX(pageX)
    setStartY(pageY)
    
    if (isH5) {
      scrollViewRef.current.scrollOffset((res: { scrollTop: number }) => {
        console.log('scrollOffset', res)
        if (res) {
          setIsScrolledTop(res.scrollTop < 15)
        }
      }).exec()
    } else {
      const scrollViewQuery = Taro.createSelectorQuery()
      scrollViewQuery.select('.scroll-container').scrollOffset()
      scrollViewQuery.exec((res) => {
        console.log('handlerTouchStart scrollOffset', res)
        const { scrollTop } = res?.[0]
        setIsScrolledTop(scrollTop < 15)
      })
    }
  }
  // 手指移动事件，主要用于从FULL状态向下移动时，锁定滚动条
  const handlerTouchMove = (e: any) => {
    if (isAlipay || isFirstDragDown || offsetY > 0) {
      return false
    }
    const { pageX, pageY } = e.touches[0]
    if (!startX || !startY) {
      handlerTouchStart(e)
      return false
    }
    const diffX = pageX - startX
    const diffY = pageY - startY
    console.log('移动的时候', 'offsetY=',  `pageY(${pageY}) -`,  `startY(${startY}) = `, pageY-startY);
    
    setOffsetX(diffX)
    setOffsetY(diffY)
    if (!isFirstDragDown && offsetY > transitionDiff) {
      triggerDragDown(true)
    }
    return false
  }
  // 手指抬起，记录最终位置，进行计算，将卡片落入合适的状态中
  const handlerTouchEnd = (e: any) => {
    console.log('handlerTouchEnd', disable, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    if (disable) {
      return
    }
    const { pageX, pageY } = e.changedTouches[0]
    const diffX = pageX - startX
    const diffY = pageY - startY
    console.log('handlerTouchEnd', diffX, diffY, transitionDiff)
    setOffsetX(diffX)
    setOffsetY(diffY)
    
    // 立即计算新的状态，避免回弹效果
    const oldCardStatus = cardStatus
    const oldOffsetX = Math.abs(diffX)
    // 横向滑动 > 竖向滑动 的时候不收起表单
    if (oldOffsetX > transitionDiff && oldOffsetX > Math.abs(diffY)) {
      console.log('横向滑动 > 竖向滑动 的时候不收起表单', oldOffsetX, transitionDiff, Math.abs(diffY))
      clearEffects()
      return
    }
    
    // 立即计算新状态
    const { getScreenStatus } = getPosition({padding, maxOffset, initialOffset, transitionDiff})
    let status = getScreenStatus(cardStatus, diffY)
    console.log('dealScreenStatus', status)
    if (status === EstimateContain.FULL) {
      triggerDragDown(false)
    }
    // 尾部特殊处理，当中屏高度和收起高度一致时（车型数量不足导致），不设置为中屏，统一设置为COLLAPSE
    // 注意：只有在 maxOffset 和 initialOffset 都不为 0 且相等时才强制设置为 HALF
    if (maxOffset !== 0 && initialOffset !== 0 && maxOffset === initialOffset) {
      status = EstimateContain.HALF
    }
    // 立即设置状态，避免延迟
    if (!disable) {
      setCardStatus(status)
      // 强制更新 y 值，确保立即吸附到正确位置
      setRandomH(Math.random())
    }
    
    clearEffects()
  }

  return (
    <MovableArea
      className='panel-static-container'
      style={`${positionStyle} ${wrapperStyle}`}
      onTouchStart={(e) => {
        console.log('111111111111')
        handlerTouchStart(e)
      }}
    >
      <MovableView
        className='panel-wrap'
        style={padding ? computeMvViewHeight(padding) : ''}
        direction='vertical'
        outOfBounds={false}
        damping={40}
        friction={1}
        inertia={false}
        disabled={disabled}
        y={finalOffset}
        animation={true}
        onTouchStart={(e) => {
          console.log('2222222222222')
          handlerTouchStart(e)
        }}
        onTouchMove={handlerTouchMove}
        onTouchEnd={handlerTouchEnd}
      >
        {/* 不占半屏高度，向上压地图区域 */}
        <View className='panel-header-view' style={headerStyle ? headerStyle : ''}>
          <Slot name="header"></Slot>
        </View>
        <View className="touch-wrapper">
          {/* touchbar */}
          {
            !shouldHiddenTouchBar && (
              <View 
                className='touchBar'
                onTouchStart={(e) => {
                  console.log('touchBar onTouchStart triggered')
                  setIsTouchingBar(true)
                  // 阻止事件冒泡到MovableArea
                  e.stopPropagation()
                  return false
                }}
                onTouchMove={(e) => {
                  console.log('touchBar onTouchMove triggered')
                  e.stopPropagation()
                  return false
                }}
                onTouchEnd={(e) => {
                  console.log('touchBar onTouchEnd triggered')
                  e.stopPropagation()
                  return false
                }}
              >
                <View className={`barHandler ${touchBarClass}`}>
                  <View className="item left"></View>
                  <View className="item right"></View>
                </View>
              </View>
            )
          }
          {/* content-header 占半屏高度，向下压tab内容区域，且不在滚动区域 */}
          {/* <slot name="content-header"></slot> */}
        </View>
        <View
          className={`panel-scroll-container ${!transitionDiff ? 'auto' : ''}`}
          style={contentStyle ? contentStyle : ''}
        >
          <View className="panel-scroll-container-header">
            <slot name="content-header"></slot>
          </View>
          <View className="panel-scroll-content">
            <slot name="side-nav"></slot>
            {/* 这个节点 是为了使下面的 min-height: 100% 生效，不能删*/}
            <View style="display: flex; flex: 1; width: 100%">
              <ScrollView
                className="scroll-container"
                ref={scrollViewRef}
                type="list"
                scroll-y={isScroll || canScroll}
                scroll-top={scrollY}
                scroll-with-animation={true}
                enhanced={true}
                show-scrollbar={false}
                style='max-height: calc(100vh - 200rpx)'
              >
                {/* 这里是为了规避因为下面的占位节点导致 slot 内组件设置 height 100% 包含占位高度的问题*/}
                <View
                  style={`display: flex;min-height:calc(100% - ${placeholderHeight}px)`}
                >
                  {/* flex: 1 撑开flex宽度，不能删 */}
                  <View
                    style={`flex: 1;width:100%;padding: 8px; box-sizing: border-box; max-height: ${236 * 4}rpx`}
                  >
                    <Slot></Slot>
                  </View>
                </View>
                {/* 因半屏需要回滚在第n个选中，需要有占位高度 */}
                <View style={`height:${placeholderHeight}px;${placeholderStyleSetting}`}/>
              </ScrollView>
            </View>
          </View>
        </View>
      </MovableView>
    </MovableArea>
  )
}