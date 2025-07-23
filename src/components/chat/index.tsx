import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addChatItem } from '@/store/actions/chat'
import { ChatRole } from '@/utils/enum'
import { ChatItem, ChatRoleT } from '@/utils/type'
import QueryPopup from '@/components/queryPopup'
import AnswerPopup from '@/components/answerPopup'
import { useEffect } from 'react'
import './index.less'

type ChatProps = {
}

export default function Chat (props: ChatProps) {
  const chatList = useSelector((state: RootState) => state.chat.chatList)
  const queryText = useSelector((state: RootState) => state.chat.queryText)
  const dispatch = useDispatch()

  const onSendQuery = (query: string) => {
    const userChatItem = formatChatItem(query, ChatRole.USER)
    dispatch(addChatItem(userChatItem))
  }

  useEffect(() => {
    if (queryText) {
      console.log('useEffect queryText>>>>>>>', queryText)
      const userChatItem = formatChatItem(queryText, ChatRole.USER)
      dispatch(addChatItem(userChatItem))
      const assistantChatItem = formatChatItem('', ChatRole.ASSISTANT)
      dispatch(addChatItem(assistantChatItem))
    }
  }, [queryText, dispatch])

  // 格式化聊天项
  const formatChatItem = (content: string, role: ChatRoleT): ChatItem => {
    const chatItem = {
      chatId: new Date().getTime().toString(),
      content,
      role,
      createdAt: new Date().toISOString(),
      ...(role === ChatRole.ASSISTANT && {
        isLoading: true,
        isStream: false,
        isFinished: false,
      }),
    }
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
