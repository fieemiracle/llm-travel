import { ChatItem } from "@/utils/type"
import { ChatActionType } from "@/store/types"

// 添加聊天项
export const addChatItem = (chatItem: ChatItem) => {
  return {
    type: ChatActionType.ADD_CHAT_ITEM,
    chatItem,
  }
}

// 更新聊天项
export const updateChatItem = (chatItem: Partial<ChatItem>) => {
  return {
    type: ChatActionType.UPDATE_CHAT_ITEM,
    chatItem,
  }
}

// 清除指定chatId的content
export const clearChatItemContent = (chatId: string) => {
  return {
    type: ChatActionType.UPDATE_CHAT_ITEM,
    chatItem: {
      chatId,
      content: '',
      chunks: [],
      isLoading: true,
      isStreaming: false,
      isFinished: false,
      isThumbUp: false,
      isThumbDown: false,
    },
  }
}

// 清空聊天列表
export const clearChatList = () => {
  return {
    type: ChatActionType.CLEAR_CHAT_LIST,
  }
}

// 设置全局提问内容
export const setQueryText = (queryText: string) => {
  return {
    type: ChatActionType.SET_QUERY_TEXT,
    queryText,
  }
}
