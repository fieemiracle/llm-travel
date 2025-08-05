import { EstimateContain, EstimateContainValues } from "@/utils/enum"
import { getSystemInfo } from "@/utils/system"
import { MovablePanelPropsT } from "./index"

/**
 * 计算MovableView的最终高度
 * @function computeMvViewHeight
 * */
export const computeMvViewHeight = (padding: number[]) => {
  const systemInfo = getSystemInfo()
  const screenHeight = systemInfo.windowHeight
  return `height:${screenHeight - padding[0] - padding[2]}PX`
}

type GetPositionParamsT = {
  padding: number[],
  maxOffset: number, // 组件最小屏
  initialOffset: number, /** 组件初始化时展示的偏移量(半屏偏移)，即：负展示高度 */
  transitionDiff: number,
}

export function getPosition(params: GetPositionParamsT) {
  const { padding, maxOffset, initialOffset, transitionDiff } = params
  const systemInfo = getSystemInfo()
  const { windowHeight } = systemInfo

  /** move-view 的高度，新版实现方案是move-view高度大于move-area，所以在此确认move-view的高度 */
  const mvViewHeight = windowHeight - padding[0] - padding[2]
  const positionStyle = `right: ${padding[1]}px; bottom: ${padding[2]}px; left: ${padding[3]}px;`

  /** 手指离开后的偏移量，针对三个状态有三个定值 */
  function getFinalOffset(cardStatus: EstimateContainValues) {
    if (transitionDiff) {
      return cardStatus === EstimateContain.FULL
        ? -mvViewHeight // 全屏 -100%
        : cardStatus === EstimateContain.HALF
          ? initialOffset || maxOffset // 中间状态
          : -(mvViewHeight - 100) // 收起状态，只显示头部（留出100px显示头部）
    } else {
      return maxOffset || initialOffset
    }
  }

  function getScreenStatus(cardStatus: EstimateContainValues, offsetY: number) {
    console.log('getScreenStatus', cardStatus, offsetY)
    const oldStatus = cardStatus
    let newStatus = oldStatus
    console.log('状态判断参数:', { initialOffset, mvViewHeight, maxOffset, transitionDiff, offsetY })
    // initialOffset = -274
    // mvViewHeight = 611
    // maxOffset = -72
    // transitionDiff = 30
    // offsetY = 343
    if (initialOffset <= -mvViewHeight) {
      // this.initialOffset <= -this.mvViewHeight, COLLAPSE HALF 两段
      if (offsetY > transitionDiff) {
        newStatus = EstimateContain.COLLAPSE
      } else if (offsetY < -transitionDiff) {
        newStatus = EstimateContain.HALF
      }
    } else if (initialOffset && maxOffset) {
      // COLLAPSE HALF FULL 三段
      console.log('offsetY', offsetY, transitionDiff)
      if (offsetY > transitionDiff) {
        newStatus =
          oldStatus === EstimateContain.FULL
            ? offsetY - mvViewHeight > initialOffset // 手指抬起时卡片展示高度小于中间卡片展示高度的阈值，就直接拉到最低
              ? EstimateContain.COLLAPSE
              : EstimateContain.HALF
            : EstimateContain.COLLAPSE
      } else if (offsetY < -transitionDiff) {
        newStatus =
          oldStatus === EstimateContain.COLLAPSE
            ? -(mvViewHeight - 100) + offsetY < initialOffset // 从底部向上滑动超过卡片HALF展示高度阈值，就直接拉到全屏
              ? EstimateContain.FULL
              : EstimateContain.HALF
            : EstimateContain.FULL
      }
    } else {
      // initialOffset=0, HALF FULL 两段
      if (offsetY > transitionDiff) {
        newStatus = EstimateContain.HALF
      } else if (offsetY < -transitionDiff) {
        newStatus = EstimateContain.FULL
      }
    }
    // 尾部特殊处理，当中屏高度和收起高度一致时（车型数量不足导致），不设置为中屏，统一设置为COLLAPSE
    // 注意：只有在 maxOffset 和 initialOffset 都不为 0 且相等时才强制设置为 HALF
    if (maxOffset !== 0 && initialOffset !== 0 && maxOffset === initialOffset) {
      newStatus = EstimateContain.HALF
    }
    return newStatus
  }

  return {
    mvViewHeight,
    getFinalOffset,
    getScreenStatus,
    positionStyle
  }
}

/**
 * 获取自定义样式
 */
export function getCustomeStyle(props: MovablePanelPropsT, { cardStatus, mvViewHeight }) {
  const { isShowTouchBarForFull, initialOffset, maxOffset } = props
  return {
    touchBarClass: !(isShowTouchBarForFull && cardStatus === EstimateContain.FULL) ? cardStatus : '',
    placeholderHeight: getPlaceholderHeight(cardStatus, mvViewHeight, initialOffset, maxOffset)
  }
}

function getPlaceholderHeight(cardStatus: EstimateContainValues, mvViewHeight: number, initialOffset?: number, maxOffset?: number) {
  // todo: 这里尝试加了条件控制tempScroll=true时才补height，但是滚动不到位
  initialOffset = initialOffset || 0
  maxOffset = maxOffset || 0
  if (cardStatus === EstimateContain.FULL) return 0
  let padHeight = cardStatus === EstimateContain.HALF ? initialOffset : maxOffset
  // 对于 COLLAPSE 状态，使用与 getFinalOffset 一致的偏移量
  if (cardStatus === EstimateContain.COLLAPSE) {
    padHeight = -(mvViewHeight - 100) + mvViewHeight
  } else {
    padHeight += mvViewHeight
  }
  return padHeight
}

/**
 * 初始化卡片
 */
export default function initCard(props: MovablePanelPropsT, cardStatus: EstimateContainValues) {
  let scrollY = 0 // 仅用于点击back时重置scroll-view的scrollTop
  function setCardStatus(status: EstimateContainValues) {
    if (status !== cardStatus) {
      props.onChangeStatus(status)
    }
  }
  // 是否在滚动态
  let isScroll = false
  function scrollToTop(status: EstimateContainValues) {
    isScroll = true
    // 触发支付宝的更新
    //  当scrollY=0时 强制触发更新
    if (status !== EstimateContain.FULL) scrollY = scrollY ? 0 : 0.01
    setTimeout(() => {
      isScroll = false
    }, 300)
  }
  function scrollTo(top: number) {
    isScroll = true
    scrollY = top
    isScroll = false
  }
  scrollToTop(cardStatus)

  return {
    setCardStatus,
    scrollToTop,
    scrollTo,
    isScroll,
    scrollY
  }
}