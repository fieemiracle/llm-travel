import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addChatItem } from '@/store/actions/chat'
import { ChatRole } from '@/utils/enum'
import { ChatItem, ChatRoleT } from '@/utils/type'
import QueryPopup from '@/components/queryPopup'
import AnswerPopup from '@/components/answerPopup'
import './index.less'

type ChatProps = {
}

export default function Chat (props: ChatProps) {
  const chatList = useSelector((state: RootState) => state.chat.chatList)
  const queryText = useSelector((state: RootState) => state.chat.queryText)
  const dispatch = useDispatch()

  const onSendQuery = (query: string) => {
    const userChatItem = {
      chatId: new Date().getTime().toString(),
      content: query,
      role: ChatRole.USER as ChatRoleT,
      createdAt: new Date().toISOString(),
    }
    dispatch(addChatItem(userChatItem))
    console.log('query>>>>>>>', props, query, queryText)
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
