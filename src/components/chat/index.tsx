import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addChatItem, updateChatItem } from '@/store/actions/chat'
import { ChatRole } from '@/utils/enum'
import { ChatChunk, ChatItem, ChatRoleT } from '@/utils/type'
import { generateRandomHash } from '@/utils/tools'
import QueryPopup from '@/components/queryPopup'
import AnswerPopup from '@/components/answerPopup'
import { useEffect } from 'react'
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
import { debugRequestHeaders } from '@/utils/debug'
import './index.less'

type ChatProps = {
}

export default function Chat(props: ChatProps) {
  const chatList = useSelector((state: RootState) => state.chat.chatList)
  const queryText = useSelector((state: RootState) => state.chat.queryText)
  const dispatch = useDispatch()

  // sse
  const sendMessage = (userChatItem: ChatItem, assistantChatItem: ChatItem) => {
    console.log('sendMessage>>>>>>>', userChatItem, assistantChatItem)
    
    // 调试请求头
    debugRequestHeaders()
    
    const payload = {
      model: DMXAPI_MODELS.GROK_3_BETA,
      stream: true,
      messages: [
        {
          role: userChatItem.role,
          content: userChatItem.content
        }
      ]
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
        // 其他逻辑
        Taro.showToast({
          title: '发送失败',
          icon: 'error'
        })
      }
    })

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
          requestTask.abort()
          dispatch(updateChatItem({
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
              console.log('delta.content>>>>>>>', delta.content)
              const chatItem = chatList.find((item) => item.chatId === assistantChatItem.chatId)
              const preContent = chatItem?.content || ''
              const preChunks = chatItem?.chunks || [] as ChatChunk[]
              if (chatItem) {
                dispatch(updateChatItem({
                  content: preContent + delta.content,
                  chunks: [...preChunks, {
                    id,
                    content: delta.content,
                  }],
                  isLoading: false,
                  isStreaming: true,
                  isFinished: false,
                }))
              }
            }
          }
        } catch (error) {
          console.log('error>>>>>>>', error)
        }
      }
    })
  }

  const onSendQuery = (query: string) => {
    const userChatItem = formatChatItem(query, ChatRole.USER)
    dispatch(addChatItem(userChatItem))
    const assistantChatItem = formatChatItem('', ChatRole.ASSISTANT, { isLoading: true })
    dispatch(addChatItem(assistantChatItem))
    sendMessage(userChatItem, assistantChatItem)
  }

  useEffect(() => {
    if (queryText) {
      console.log('useEffect queryText>>>>>>>', queryText)
      const userChatItem = formatChatItem(queryText, ChatRole.USER)
      dispatch(addChatItem(userChatItem))
      const assistantChatItem = formatChatItem('', ChatRole.ASSISTANT, { isLoading: true })
      dispatch(addChatItem(assistantChatItem))
      sendMessage(userChatItem, assistantChatItem)
    }
  }, [queryText, dispatch])

  // 格式化聊天项
  const formatChatItem = (
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
  }

  return (
    <View className='chat-wrapper'>
      <View className='chat-content'>
        {
          chatList.map((item: ChatItem) => {
            return (
              <View className='chat-item' key={item.chatId}>
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
                    />
                  )
                }
              </View>
            )
          })
        }
      </View>
      <View className='chat-input'>
        <FormInput onSend={(query) => onSendQuery(query)} />
      </View>
    </View>
  )
}
