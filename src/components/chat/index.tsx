import { View, ScrollView } from '@tarojs/components'
import FormInput from '@/components/common/formInput'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addChatItem, setQueryText, updateChatItem, clearChatItemContent } from '@/store/actions/chat'
import { ChatRole } from '@/utils/enum'
import { ChatChunk, ChatItem, ChatRoleT } from '@/utils/type'
import { generateRandomHash } from '@/utils/tools'
import QueryPopup from '@/components/message/queryPopup'
import AnswerPopup from '@/components/message/answerPopup'
import SuggestedQuestions from '@/components/message/suggestedQuestions'
import ChatSelection from '@/components/chatSelection'
import ShareActionBar from '@/components/shareActionBar'
import { useEffect, useCallback, useRef, useState } from 'react'
import {
  DMXAPI_REQUEST_URL,
  DMXAPI_REQUEST_TIMEOUT,
  DMXAPI_MODELS,
  getRequestHeaders,
  DMXAPI_REQUEST_METHOD,
  HttpMethod,
  DmxapiResponseData,
} from '@/service/dmxapi'
import Taro from '@tarojs/taro'
import { TextDecoder } from 'text-encoding-shim'
// import { debugRequestHeaders } from '@/utils/debug'
import './index.less'

type ChatProps = {
  getInputHeight?: (height: number) => void
}

export default function Chat(props: ChatProps) {
  const chatList = useSelector((state: RootState) => state.chat.chatList)
  const queryText = useSelector((state: RootState) => state.chat.queryText)
  const shareMode = useSelector((state: RootState) => state.chat.shareMode)
  const dispatch = useDispatch()
  
  // 使用 ref 来存储最新的 chatList，避免闭包问题
  const chatListRef = useRef(chatList)
  chatListRef.current = chatList

  // const [currentAnswerText, setCurrentAnswerText] = useState('')
  // const [currentAnswerChunks, setCurrentAnswerChunks] = useState<ChatChunk[]>([])
  const chatContentRef = useRef<any>(null)
  
  // 存储当前的请求任务，用于清理
  const currentRequestTaskRef = useRef<any>(null)
  
  // 自动滚动相关状态
  const [scrollTop, setScrollTop] = useState(0)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const scrollViewRef = useRef<any>(null)

  // 添加调试信息，监控 chatList 变化
  // useEffect(() => {
  //   console.log('chatList updated:', chatList.length, 'items')
  //   chatList.forEach((item, index) => {
  //     console.log(`Item ${index}:`, {
  //       chatId: item.chatId,
  //       role: item.role,
  //       content: item.content?.substring(0, 50) + '...',
  //       isLoading: item.isLoading,
  //       isStreaming: item.isStreaming,
  //       isFinished: item.isFinished,
  //       chunksCount: item.chunks?.length || 0
  //     })
  //   })
  // }, [chatList])

  // 格式化聊天项
  const formatChatItem = useCallback((
    content: string,
    role: ChatRoleT,
    options?: Partial<Pick<ChatItem, 'isLoading' | 'isStreaming' | 'isFinished'>>,
  ): ChatItem => {
    const chatItem = {
      chatId: generateRandomHash(),
      content,
      role,
      createdAt: new Date().toISOString(),
      ...(role === ChatRole.ASSISTANT && {
        isLoading: false,
        isStreaming: false,
        isFinished: false,
        ...(options || {})
      }),
    }
    // console.log('formatChatItem>>>>>>>', chatItem)
    return chatItem
  }, [])

  // sse
  const sendMessage = useCallback((userChatItem: ChatItem, assistantChatItem: ChatItem) => {
    console.log('sendMessage>>>>>>>', userChatItem, assistantChatItem)
    // 模拟产生数据
    dispatch(updateChatItem({
        chatId: assistantChatItem.chatId,
        content: '111111模拟数据',
        chunks: [],
        isLoading: false,
        isStreaming: true,
        isFinished: true,
        isThumbUp: false,
        isThumbDown: false,
    }))
    return;
    // console.log('sendMessage>>>>>>>', userChatItem, assistantChatItem)
    let updateContent = ''
    let updateChunks = [] as ChatChunk[]
    
    // 调试请求头
    // debugRequestHeaders()
    
    // 带上上下文 - 手动构建包含新消息的列表
    const currentChatList = [...chatListRef.current, userChatItem, assistantChatItem]
    console.log('currentChatList>>>>>>>', currentChatList)
    const formatMessages = currentChatList.map((chatItem: ChatItem) => {
      return {
        role: chatItem.role,
        content: chatItem.content
      }
    })
    const payload = {
      model: DMXAPI_MODELS.GROK_3_BETA,
      stream: true,
      messages: formatMessages
    }
    const requestTask = Taro.request({
      url: DMXAPI_REQUEST_URL,
      timeout: DMXAPI_REQUEST_TIMEOUT,
      method: DMXAPI_REQUEST_METHOD.POST as HttpMethod,
      header: getRequestHeaders(),
      enableChunked: true,
      data: payload,
      responseType: 'text',
      dataType: 'text/event-stream',
      success: (res) => {
        console.log('sendMessage success>>>>>>>', res)
        // 由客户端断开链接
        // requestTask.abort()
        // 其他逻辑
      },
      fail: (err) => {
        console.log('sendMessage fail>>>>>>>', err)
        // 由客户端断开链接
        // requestTask.abort()
        // requestTask.offChunkReceived(() => {})
        // 其他逻辑
        Taro.showToast({
          title: '发送失败',
          icon: 'error'
        })
      }
    })
    
    // 保存请求任务引用
    currentRequestTaskRef.current = requestTask

    // 接收数据
    requestTask.onChunkReceived((chunk: any) => {
      // console.log('onChunkReceived>>>>>>>', chunk)
      const { data } = chunk
      // console.log('data>>>>>>>', data)
      const uint8Array = new Uint8Array(data)
      const decoder = new TextDecoder('utf-8').decode(uint8Array)
      // console.log('decoder>>>>>>>', decoder)
      const chunks = decoder.split('data: ').filter((chunkSlice: string) => chunkSlice)
      const endTag = '[DONE]'
      for (const chunkItem of chunks) {
        // 结束处理
        if (chunkItem.includes(endTag)) {
          // requestTask.abort()
          setTimeout(() => {
            requestTask.offChunkReceived(() => {})
          }, 1000)
          dispatch(updateChatItem({
            chatId: assistantChatItem.chatId,
            isLoading: false,
            isStreaming: false,
            isFinished: true,
          }))
          break
        }
        // 数据处理
        try {
          const json = JSON.parse(chunkItem)
          // console.log('json>>>>>>>', json)
          const { id, choices } = json as DmxapiResponseData
          // console.log('id>>>>>>>', id, choices)
          if (choices && choices.length) {
            const { delta } = choices[0]
            if (delta && delta.content) {
              // console.log('delta.content>>>>>>>', delta.content)
              // 使用 ref 中的最新 chatList，避免闭包问题
              const chatItem = currentChatList.find((item) => item?.chatId === assistantChatItem.chatId)
              updateContent = updateContent + delta.content
              updateChunks = [...updateChunks, {
                id,
                content: delta.content,
              }]
              // const preChunks = chatItem?.chunks || [] as ChatChunk[]
              if (chatItem) {
                dispatch(updateChatItem({
                  chatId: assistantChatItem.chatId,
                  content: updateContent,
                  chunks: updateChunks,
                  isLoading: false,
                  isStreaming: true,
                  isFinished: false,
                  isThumbUp: false,
                  isThumbDown: false,
                }))
              }
            }
          }
        } catch (error) {
          console.log('error>>>>>>>', error)
        }
      }
    })
  }, [dispatch])

  // 重新生成处理函数
  const handleRegenerate = useCallback((chatId: string) => {
    console.log('handleRegenerate>>>>>>>', chatId)
    // 重新生成前确保自动滚动开启
    setShouldAutoScroll(true)
    
    // 找到要重新生成的聊天项
    const chatItem = chatList.find(item => item.chatId === chatId)
    if (!chatItem) {
      console.log('未找到对应的聊天项')
      return
    }
    
    // 找到对应的用户消息（通常是前一条消息）
    const userMessageIndex = chatList.findIndex(item => item.chatId === chatId)
    if (userMessageIndex <= 0) {
      console.log('未找到对应的用户消息')
      return
    }
    
    const userChatItem = chatList[userMessageIndex - 1]
    if (!userChatItem || userChatItem.role !== ChatRole.USER) {
      console.log('前一条消息不是用户消息')
      return
    }
    
    // 清除当前回答的内容
    dispatch(clearChatItemContent(chatId))
    
    // 重新发送请求
    sendMessage(userChatItem, { ...chatItem, content: '', chunks: [] } as ChatItem)
  }, [dispatch, chatList, sendMessage])

  const onSendQuery = useCallback((query: string) => {
    // 发送消息前确保自动滚动开启
    setShouldAutoScroll(true)
    
    const userChatItem = formatChatItem(query, ChatRole.USER)
    dispatch(addChatItem(userChatItem))
    const assistantChatItem = formatChatItem('', ChatRole.ASSISTANT, { isLoading: true })
    dispatch(addChatItem(assistantChatItem))
    dispatch(setQueryText(''))
    sendMessage(userChatItem, assistantChatItem)
  }, [dispatch, formatChatItem, sendMessage])

  useEffect(() => {
    if (queryText) {
      console.log('useEffect queryText>>>>>>>', queryText)
      // 发送消息前确保自动滚动开启
      setShouldAutoScroll(true)
      
      const userChatItem = formatChatItem(queryText, ChatRole.USER)
      dispatch(addChatItem(userChatItem))
      const assistantChatItem = formatChatItem('', ChatRole.ASSISTANT, { isLoading: true })
      dispatch(addChatItem(assistantChatItem))
      sendMessage(userChatItem, assistantChatItem)
    }
  }, [queryText, dispatch, formatChatItem, sendMessage])

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    if (shouldAutoScroll) {
      // 延迟执行滚动，确保DOM更新完成
      setTimeout(() => {
        setScrollTop(999999) // 设置一个很大的值确保滚动到底部
      }, 100)
    }
  }, [shouldAutoScroll])

  // 监听 chatList 变化，自动滚动到底部
  useEffect(() => {
    if (chatList.length > 0) {
      scrollToBottom()
    }
  }, [chatList.length, scrollToBottom])

  // 监听消息内容变化（流式更新时）
  useEffect(() => {
    const lastMessage = chatList[chatList.length - 1]
    if (lastMessage && lastMessage.role === ChatRole.ASSISTANT && lastMessage.isStreaming) {
      scrollToBottom()
    }
  }, [chatList, scrollToBottom])

  // 处理用户手动滚动
  const handleScroll = useCallback((e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.detail
    // 如果用户滚动到接近底部（容忍50px误差），则开启自动滚动
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50
    setShouldAutoScroll(isNearBottom)
  }, [])

  // 手动滚动到底部
  const handleScrollToBottom = useCallback(() => {
    setShouldAutoScroll(true)
    scrollToBottom()
  }, [scrollToBottom])

  // 组件卸载时清理请求任务
  useEffect(() => {
    return () => {
      if (currentRequestTaskRef.current) {
        currentRequestTaskRef.current.offChunkReceived(() => {})
        currentRequestTaskRef.current.abort()
      }
    }
  }, [])

  return (
    <View className='chat-wrapper'>
      {
        !chatList.length && (
          <SuggestedQuestions 
            questions={[]}
            onQuestionClick={() => {}}
          />
        )
      }
      <ScrollView
        className='chat-content'
        ref={scrollViewRef}
        scrollY
        scrollWithAnimation
        enhanced
        showScrollbar={false}
        scrollTop={scrollTop}
        onScroll={handleScroll}
      >
        {
          chatList.map((item: ChatItem) => {
            return (
              <View className={`chat-item ${shareMode ? 'share-mode' : ''}`} key={item.chatId}>
                <View className='chat-item-content'>
                  {/* 分享模式下显示选择框 */}
                  <ChatSelection chatId={item.chatId} />
                  
                  <View className='chat-item-message'>
                    {
                      item.role === ChatRole.USER && (
                        <QueryPopup queryText={item.content} />
                      )
                    }
                    {
                      item.role === ChatRole.ASSISTANT && (
                        <AnswerPopup
                          answerText={item.content}
                          isLoading={item.isLoading!}
                          isStreaming={item.isStreaming!}
                          isFinished={item.isFinished!}
                          isThumbUp={item.isThumbUp!}
                          isThumbDown={item.isThumbDown!}
                          chatId={item.chatId}
                          onRegenerate={handleRegenerate}
                        />
                      )
                    }
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      
      {/* 分享模式下隐藏输入框，显示分享操作栏 */}
      {!shareMode && (
        <View className='chat-input'>
          <FormInput onSend={(query) => onSendQuery(query)} onHeightChange={(height) => props.getInputHeight?.(height)} />
        </View>
      )}
      
      {/* 回到底部按钮 */}
      {!shouldAutoScroll && !shareMode && (
        <View className='scroll-to-bottom' onClick={handleScrollToBottom}>
          <View className='scroll-icon'>↓</View>
        </View>
      )}

      {/* 分享操作栏 */}
      <ShareActionBar />
    </View>
  )
}
