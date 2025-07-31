import { View, Text, RichText, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import markdownit from 'markdown-it'
// import { RichNodeT } from '@/utils/type'
// import 'highlight.js/styles/default.css'
// import 'normalize.css'
import logoImage from '@/assets/iconfont/youxiaozhu.png'
import loadingImage from '@/assets/iconfont/loading.png'
import './index.less'
import styles from './markdown.module.less'

console.log('styles>>>>>>>', styles, styles?.markdownModule, styles?.testModule)

type AnswerPopupProps = {
  answerText: string
  isLoading: boolean
  isStreaming: boolean
  isFinished: boolean
  isThumbUp: boolean
  isThumbDown: boolean
}

const AnswerPopupStatus = {
  LOADING: '正在理解您的需求...',
  STREAMING: '正在思考...',
  FINISHED: '已深度思考',
}

const md = markdownit({
  html: false, // 允许解析 HTML 标签
  xhtmlOut: true,
  linkify: true, // 自动转换 URL 为链接
  typographer: true, // 启用排版优化（如引号美化
  breaks: true, // 转换段落里的 '\n' 到 <br>
  quotes: '“”‘’'
})

export default function AnswerPopup(props: AnswerPopupProps) {
  // console.log('props>>>>>>>', props)
  // const [richNodes, setRichNodes] = useState<RichNodeT[]>([])
  const [htmlString, setHtmlString] = useState('')

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
        props.isFinished ? (
          <View className='answer-popup-footer'>
            <View className='answer-popup-footer-tools'>
              {/* 复制 */}
              <View className='tool-item copy'>
                <Image className='tool-item-image copy-image' src='https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675812.png' />
              </View>
              {/* 点赞 */}
              <View className='tool-item feedback-up'>
                {
                  props.isThumbUp ? (
                    <Image className='tool-item-image feedback-up-image' src='https://s3-gz01.didistatic.com/packages-mait/img/M4jM8UvrGB1745981291705.png' />
                  ) : (
                    <Image className='tool-item-image feedback-up-image' src='https://s3-gz01.didistatic.com/packages-mait/img/Zrc3ADVjzr1744963102871.png' />
                  )
                }
              </View>
              {/* 点踩 */}
              <View className='tool-item feedback-down'>
                {
                  props.isThumbDown ? (
                    <Image className='tool-item-image feedback-down-image' src='https://s3-gz01.didistatic.com/packages-mait/img/1Y3GleRfoD1745497660019.png' />
                  ) : (
                    <Image className='tool-item-image feedback-down-image' src='https://s3-gz01.didistatic.com/packages-mait/img/ssIcXvTo5a1744963102872.png' />
                  )
                }
              </View>
              {/* 重新生成 */}
              <View className='tool-item resend'>
                <Image className='tool-item-image resend-image' src='https://s3-gz01.didistatic.com/packages-mait/img/jUcWCrIeHk1745933187753.png'></Image>
              </View>
            </View>
            <View className='regenerate'>
              <Text>*</Text>
              <Text>AI生成</Text>
            </View>
          </View>
        ) : (
          <View className='answer-popup-footer'>
            <Image className='loading-image' src={loadingImage}></Image>
          </View>
        )
      }
    </View>
  )
}