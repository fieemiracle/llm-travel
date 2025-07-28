import { View, Text, RichText } from '@tarojs/components'
import { useEffect, useState } from 'react'
import markdownit from 'markdown-it'
// import { RichNodeT } from '@/utils/type'
// import 'highlight.js/styles/default.css'
// import 'normalize.css'
import './index.less'
import styles from './markdown.module.less'

console.log('styles>>>>>>>', styles, styles?.markdownModule)

type AnswerPopupProps = {
  answerText: string
  isLoading: boolean
  isStreaming: boolean
  isFinished: boolean
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

export default function AnswerPopup (props: AnswerPopupProps) {
  // console.log('props>>>>>>>', props)
  // const [richNodes, setRichNodes] = useState<RichNodeT[]>([])
  const [htmlString, setHtmlString] = useState('')
  
  useEffect(() => {
    console.log('props.answerText>>>>>>>', props.answerText)
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
        props.isFinished && (
          <View className='answer-popup-footer'>
            <View className='answer-popup-footer-feedback'>
              <View className='answer-popup-footer-feedback-up'>
                <Text>👍</Text>
              </View>
              <View className='answer-popup-footer-feedback-down'>
                <Text>👎</Text>
              </View>
            </View>
            <View className='answer-popup-footer-regenerate'>
              <Text>重新生成</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}