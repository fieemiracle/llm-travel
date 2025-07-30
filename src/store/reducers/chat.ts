import { ChatStateT, ChatActionType, ChatActionReturnT } from "@/store/types"

const initialState: ChatStateT = {
  chatList: [],
  queryText: '',
}

export const chatReducer = (state = initialState, action: ChatActionReturnT) => {
  switch (action.type) {
    case ChatActionType.ADD_CHAT_ITEM:
      return {
        ...state,
        chatList: [...state.chatList, action.chatItem],
      }
    case ChatActionType.UPDATE_CHAT_ITEM:
      // 确保状态更新是响应式的，创建新的数组和对象引用
      const updateChatList = state.chatList.map((item) => {
        if (item.chatId === action.chatItem?.chatId) {
          return {
            ...item,
            ...action.chatItem,
            // 确保嵌套对象也被正确更新
            chunks: action.chatItem.chunks ? [...(action.chatItem.chunks as any[])] : item.chunks,
          }
        }
        return item
      })
      return {
        ...state,
        chatList: updateChatList,
      }
    case ChatActionType.CLEAR_CHAT_LIST:
      return {
        ...state,
        chatList: [],
      }
    case ChatActionType.SET_QUERY_TEXT:
      return {
        ...state,
        queryText: action.queryText,
      }
    default:
      return state
  }
}