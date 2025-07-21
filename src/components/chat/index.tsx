import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import { chatStore } from '@/store'
import { ChatRole } from '@/utils/enum'
import { ChatRoleT } from '@/utils/type'
import QueryPopup from '@/components/queryPopup'
import AnswerPopup from '@/components/answerPopup'
import { useState } from 'react'
import './index.less'

type ChatProps = {
  queryText: string
}

export default function Chat (props: ChatProps) {
  const chatList = chatStore.getChatList()
  const [currentChatList, setCurrentChatList] = useState(chatList)

  const onSendQuery = (value: string) => {
    const userChatItem = {
      chatId: new Date().getTime().toString(),
      content: value,
      role: ChatRole.USER as ChatRoleT,
      createdAt: new Date().toISOString(),
    }
    setCurrentChatList(() => {
      return [...currentChatList, userChatItem]
    })
    console.log('query>>>>>>>', value)
  }

  return (
    <View className='chat-wrapper'>
      <View className='chat-content'>
        {
          currentChatList.map((item) => {
            return (
              <View className='chat-item' key={item.chatId}>
                  {
                    item.role === ChatRole.USER && (
                      <QueryPopup queryText={item.content} />
                    )
                  }
                  {
                    item.role === ChatRole.ASSISTANT && (
                      <AnswerPopup answerText={item.content} />
                    )
                  }
              </View>
            )
          })
        }
      </View>
      <View className='chat-input'>
        <FormInput onSend={(value) => onSendQuery(value)} />
      </View>
    </View>
  )
}
