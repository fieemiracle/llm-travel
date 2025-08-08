import { View, Text, RichText, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import markdownit from 'markdown-it'
// import { RichNodeT } from '@/utils/type'
// import 'highlight.js/styles/default.css'
// import 'normalize.css'
import logoImage from '@/assets/iconfont/youxiaozhu.png'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { updateChatItem, setShareMode } from '@/store/actions/chat'
import { COPY_FAIL_TEXT, COPY_SUCCESS_TEXT, THUMB_DOWN_TEXT, THUMB_UP_TEXT } from '@/utils/const'
import IconFont from '@/components/common/iconfont'
import { ICONFONT_ICONS } from '@/utils/iconfont'
import styles from './markdown.module.less'
import MapSection from '@/components/map/map-section'
import './index.less'
import { MapMarkerType, MapPolylineType } from '@/types/map'
import pointIcon from "@/assets/iconfont/point-purple.png"
import { generateRandomHash } from '@/utils/tools'

// console.log('styles>>>>>>>', styles, styles?.markdownModule, styles?.testModule)

type AnswerPopupProps = {
  answerText: string
  isLoading: boolean
  isStreaming: boolean
  isFinished: boolean
  isThumbUp: boolean
  isThumbDown: boolean
  isLast: boolean
  chatId: string // 添加chatId用于更新状态
  onRegenerate?: (chatId: string) => void // 添加重新生成回调函数
}

const AnswerPopupStatus = {
  LOADING: '正在理解您的需求...',
  STREAMING: '兜兜正在思考...',
  FINISHED: '已深度思考',
}

// 进度步骤配置
const PROGRESS_STEPS = [
  { key: 'analyze', label: '分析问题', active: false },
  { key: 'search', label: '寻找信息', active: false },
  { key: 'organize', label: '整理结果', active: false },
  { key: 'summarize', label: '总结答案', active: false }
]

const md = markdownit({
  html: false, // 允许解析 HTML 标签
  xhtmlOut: true,
  linkify: true, // 自动转换 URL 为链接
  typographer: true, // 启用排版优化（如引号美化
  breaks: true, // 转换段落里的 '\n' 到 <br>
  quotes: '“”‘’'
})

// 示例数据
const callout = {
  content: '天安门广场',
  bgColor: '#fff',
  color: '#000',
  fontSize: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#000',
  display: 'ALWAYS',
  textAlign: 'center',
  padding: 10,
  anchorX: 0.5,
  anchorY: 0.5,
} as const
const exampleMarkers: MapMarkerType[] = [
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.90923,
    longitude: 116.397428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    callout: {
      ...callout,
      content: '天安门广场'
    }
  },
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.91923,
    longitude: 116.407428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    callout: {
      ...callout,
      content: '故宫博物院'
    }
  },
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.92923,
    longitude: 116.417428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    callout: {
      ...callout,
      content: '景山公园'
    }
  }
]

const examplePolylines: MapPolylineType[] = [
  {
    points: [
      { latitude: 39.90923, longitude: 116.397428 },
      { latitude: 39.91923, longitude: 116.407428 },
      { latitude: 39.92923, longitude: 116.417428 }
    ],
    color: '#667eea',
    width: 6,
  }
]

export default function AnswerPopup(props: AnswerPopupProps) {
  const dispatch = useDispatch()
  // console.log('props>>>>>>>', props)
  // const [richNodes, setRichNodes] = useState<RichNodeT[]>([])
  const [htmlString, setHtmlString] = useState('')
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // console.log('props.answerText>>>>>>>', props.answerText)
    const markdownString = md.render(props.answerText)
    setHtmlString(`<div class="${styles?.markdownModule}">${markdownString}</div>`)
    // const nodes: RichNodeT[] = [{
    //   name: 'div',
    //   attrs: {
    //     class: styles['markdown__it-richtext'],
    //     style: 'font-size: 28rpx; line-height: 1.5;'
    //   },
    //   children: [{
    //     type: 'text',
    //     text:  `<div class="${styles?.['markdown__it-richtext']}">${markdownString}</div>`
    //   }]
    // }]
    // setRichNodes(nodes)
  }, [props.answerText])

  // 模拟进度步骤动画 - 与状态同步
  useEffect(() => {
    if (props.isLoading) {
      // 加载状态：重置到第一步
      setCurrentStep(0)
    } else if (props.isStreaming && !props.isFinished) {
      // 流式状态：逐步推进
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < PROGRESS_STEPS.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 500) // 每.5秒切换一个步骤

      return () => clearInterval(interval)
    } else if (props.isFinished) {
      // 完成状态：显示最后一步
      setCurrentStep(PROGRESS_STEPS.length - 1)
    } else {
      // 其他状态：重置进度
      setCurrentStep(0)
    }
  }, [props.isLoading, props.isStreaming, props.isFinished])

  // 复制
  const onCopy = () => {
    Taro.setClipboardData({
      data: props.answerText,
      success: () => {
        Taro.showToast({
          title: COPY_SUCCESS_TEXT,
          icon: 'success'
        })
      },
      fail: () => {
        Taro.showToast({
          title: COPY_FAIL_TEXT,
          icon: 'none'
        })
      }
    })
  }

  // 点赞&点踩
  const onFeedback = (type: 'up' | 'down') => {
    // 更新Redux状态
    if (type === 'up') {
      dispatch(updateChatItem({
        chatId: props.chatId,
        isThumbUp: !props.isThumbUp,
        isThumbDown: false, // 取消点踩
      }))
    } else {
      dispatch(updateChatItem({
        chatId: props.chatId,
        isThumbDown: !props.isThumbDown,
        isThumbUp: false, // 取消点赞
      }))
    }

    // 显示反馈提示
    if (props.isThumbUp || props.isThumbDown) {
      Taro.showToast({
        title: type === 'up' ? THUMB_UP_TEXT : THUMB_DOWN_TEXT,
        icon: 'success'
      })
    }
  }

  // 重新生成
  const onRegenerate = () => {
    console.log('onRegenerate>>>>>>>', props.chatId)
    if (props.onRegenerate) {
      props.onRegenerate(props.chatId)
    }
  }

  // 分享
  const onShare = () => {
    dispatch(setShareMode(true))
  }

  return (
    <View className='answer-popup'>
      <View className='answer-popup-header'>
        <View className='answer-popup-header-logo'>
          <Image className='logo-image' src={logoImage} />
        </View>
        <View className='answer-popup-header-text'>
          {props.isLoading && <Text>{AnswerPopupStatus.LOADING}</Text>}
          {props.isStreaming && <Text>{AnswerPopupStatus.STREAMING}</Text>}
          {props.isFinished && <Text>{AnswerPopupStatus.FINISHED}</Text>}
        </View>
      </View>

      {/* 进度步骤显示 - 与状态同步 */}
      {(props.isLoading || props.isStreaming) && (
        <View className='progress-steps'>
          {PROGRESS_STEPS.map((step, index) => (
            <View key={step.key} className='progress-step'>
              <View className={`step-circle ${index <= currentStep ? 'active' : ''}`}>
                {index < currentStep && <View className='step-dot'></View>}
              </View>
              <Text className={`step-label ${index <= currentStep ? 'active' : ''}`}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      )}

      {
        props.answerText ? (
          <View className='answer-popup-content'>
            <View className='answer-popup-content-item'>
              {/* <Text dangerouslySetInnerHTML={{ __html: htmlString }}></Text> */}
              {/* <RichText nodes={nodes} /> */}
              <RichText nodes={htmlString} />
            </View>
          </View>
        ) : (
          <View></View>
        )
      }
      {
        props.isFinished && (
          <View className='custom-section-wrapper'>
            <MapSection
              markers={exampleMarkers}
              polylines={examplePolylines}
              onRegenerate={onRegenerate}
            />
          </View>
        )
      }
      {
        props.isFinished ? (
          <View className='answer-popup-footer'>
            <View className='answer-popup-footer-tools'>
              {/* 复制 */}
              <View className='tool-item copy' onClick={() => onCopy()}>
                <Image className='tool-item-image copy-image' src='https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675812.png' />
              </View>
              {/* 点赞 */}
              <View className='tool-item feedback-up' onClick={() => onFeedback('up')}>
                {
                  props.isThumbUp ? (
                    <Image className='tool-item-image feedback-up-image' src='https://s3-gz01.didistatic.com/packages-mait/img/M4jM8UvrGB1745981291705.png' />
                  ) : (
                    <Image className='tool-item-image feedback-up-image' src='https://s3-gz01.didistatic.com/packages-mait/img/Zrc3ADVjzr1744963102871.png' />
                  )
                }
              </View>
              {/* 点踩 */}
              <View className='tool-item feedback-down' onClick={() => onFeedback('down')}>
                {
                  props.isThumbDown ? (
                    <Image className='tool-item-image feedback-down-image' src='https://s3-gz01.didistatic.com/packages-mait/img/1Y3GleRfoD1745497660019.png' />
                  ) : (
                    <Image className='tool-item-image feedback-down-image' src='https://s3-gz01.didistatic.com/packages-mait/img/ssIcXvTo5a1744963102872.png' />
                  )
                }
              </View>
              {/* 重新生成 */}
              <View className='tool-item resend' onClick={onRegenerate}>
                <Image className='tool-item-image resend-image' src='https://s3-gz01.didistatic.com/packages-mait/img/jUcWCrIeHk1745933187753.png'></Image>
              </View>
              {/* 分享 */}
              <View className='tool-item share' onClick={onShare}>
                <IconFont
                  type={ICONFONT_ICONS.SHARE1}
                  size={24}
                />
              </View>
            </View>
            <View className='regenerate'>
              <Text>*</Text>
              <Text>AI生成</Text>
            </View>
          </View>
        ) : (
          <View className='answer-popup-footer'>
            <View className='loading-icon'>
              <IconFont
                type={ICONFONT_ICONS.LOADING}
                color='#90F9F2'
                size={24}
              />
            </View>
          </View>
        )
      }
    </View>
  )
}