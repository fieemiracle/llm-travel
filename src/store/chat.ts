import { ChatItem } from '@/utils/type'

export const chatStore = {
  chatList: [] as ChatItem[],


  addChatItem: (item: ChatItem) => {
    chatStore.chatList.push(item)
  },
  updateChatItem: (chatItem: ChatItem) => {
    const { chatId } = chatItem
    const index = chatStore.chatList.findIndex((item) => item.chatId === chatId)
    if (index !== -1) {
      chatStore.chatList[index] = chatItem
    }
  },
  removeChatItem: (chatId: string) => {
    const index = chatStore.chatList.findIndex((item) => item.chatId === chatId)
    if (index !== -1) {
      chatStore.chatList.splice(index, 1)
    }
  },

  getChatList: (): ChatItem[] => {
    return chatStore.chatList
  },
  clearChatList: () => {
    chatStore.chatList = []
  },
}