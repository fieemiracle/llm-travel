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

// 设置分享模式
export const setShareMode = (shareMode: boolean) => {
  return {
    type: ChatActionType.SET_SHARE_MODE,
    shareMode,
  }
}

// 设置选中的聊天ID
export const setSelectedChatIds = (chatIds: string[]) => {
  return {
    type: ChatActionType.SET_SELECTED_CHAT_IDS,
    chatIds,
  }
}

// 切换单个聊天选择状态
export const toggleChatSelection = (chatId: string) => {
  return {
    type: ChatActionType.TOGGLE_CHAT_SELECTION,
    chatId,
  }
}

// 全选聊天
export const selectAllChats = () => {
  return {
    type: ChatActionType.SELECT_ALL_CHATS,
  }
}

// 清空聊天选择
export const clearChatSelection = () => {
  return {
    type: ChatActionType.CLEAR_CHAT_SELECTION,
  }
}
