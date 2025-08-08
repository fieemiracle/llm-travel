import { ChatStateT, ChatActionType, ChatActionReturnT } from "@/store/types"

const initialState: ChatStateT = {
  chatList: [],
  queryText: '',
  shareMode: false,
  selectedChatIds: [],
}

export const chatReducer = (state = initialState, action: ChatActionReturnT) => {
  switch (action.type) {
    case ChatActionType.SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.chatList,
      }
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
    case ChatActionType.SET_SHARE_MODE:
      return {
        ...state,
        shareMode: action.shareMode || false,
        // 进入分享模式时默认选中所有对话
        selectedChatIds: action.shareMode ? state.chatList.map(item => item.chatId) : [],
      }
    case ChatActionType.SET_SELECTED_CHAT_IDS:
      return {
        ...state,
        selectedChatIds: action.chatIds || [],
      }
    case ChatActionType.TOGGLE_CHAT_SELECTION:
      const chatId = action.chatId
      const isSelected = state.selectedChatIds.includes(chatId!)
      return {
        ...state,
        selectedChatIds: isSelected 
          ? state.selectedChatIds.filter(id => id !== chatId)
          : [...state.selectedChatIds, chatId!],
      }
    case ChatActionType.SELECT_ALL_CHATS:
      return {
        ...state,
        selectedChatIds: state.chatList.map(item => item.chatId),
      }
    case ChatActionType.CLEAR_CHAT_SELECTION:
      return {
        ...state,
        selectedChatIds: [],
      }
    case ChatActionType.SET_GLOBAL_STATUS:
      return {
        ...state,
        globalStatus: action.globalStatus!,
      }
    default:
      return state
  }
}