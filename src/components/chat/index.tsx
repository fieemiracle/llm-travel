import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import { chatStore } from '@/store'
import { ChatRole } from '@/utils/enum'
import { ChatRoleT } from '@/utils/type'
import QueryPopup from '@/components/queryPopup'
import AnswerPopup from '@/components/answerPopup'
import './index.less'

type ChatProps = {
}

export default function Chat (props: ChatProps) {
  const chatList = chatStore.getChatList()
  const queryText = chatStore.getQueryText()
  console.log('queryText>>>>>>>', queryText)

  const onSendQuery = (query: string) => {
    const userChatItem = {
      chatId: new Date().getTime().toString(),
      content: query,
      role: ChatRole.USER as ChatRoleT,
      createdAt: new Date().toISOString(),
    }
    chatStore.addChatItem(userChatItem)
    console.log('query>>>>>>>', query)
  }

  return (
    <View className='chat-wrapper'>
      <View className='chat-content'>
        {
          chatList.map((item) => {
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
        <FormInput onSend={(query) => onSendQuery(query)} />
      </View>
    </View>
  )
}
