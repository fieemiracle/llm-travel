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
      return {
        ...state,
        chatList: state.chatList.map((item) => item.chatId === action.chatItem?.chatId ? action.chatItem : item),
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