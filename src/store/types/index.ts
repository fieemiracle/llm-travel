import { ChatItem } from "@/utils/type"
import { GlobalStatusValues, RouterNameValues } from "@/utils/enum"

// chat相关
export interface ChatStateT {
  chatList: ChatItem[]
  queryText: string
  shareMode: boolean // 是否处于分享模式
  selectedChatIds: string[] // 选中的聊天ID
}

export const enum ChatActionType {
  ADD_CHAT_ITEM = 'ADD_CHAT_ITEM',
  UPDATE_CHAT_ITEM = 'UPDATE_CHAT_ITEM',
  CLEAR_CHAT_LIST = 'CLEAR_CHAT_LIST',
  SET_QUERY_TEXT = 'SET_QUERY_TEXT',
  // 分享相关
  SET_SHARE_MODE = 'SET_SHARE_MODE',
  // 聊天选择相关
  SET_SELECTED_CHAT_IDS = 'SET_SELECTED_CHAT_IDS',
  // 聊天选择相关
  TOGGLE_CHAT_SELECTION = 'TOGGLE_CHAT_SELECTION',
  // 全选聊天
  SELECT_ALL_CHATS = 'SELECT_ALL_CHATS',
  // 清空聊天选择
  CLEAR_CHAT_SELECTION = 'CLEAR_CHAT_SELECTION',
  // 设置全局状态
  SET_GLOBAL_STATUS = 'SET_GLOBAL_STATUS',
}

export type ChatActionReturnT = {
  type: ChatActionType
  chatItem?: ChatItem
  queryText?: string
  shareMode?: boolean
  chatIds?: string[]
  chatId?: string
  globalStatus?: GlobalStatusValues
}

// common相关
export interface CommonStateT {
  currentRouteName: RouterNameValues
  userInfo: UserInfoT | null
  globalStatus: GlobalStatusValues
  quickInputText: string
}

export const enum CommonActionType {
  SET_CURRENT_ROUTE_NAME = 'SET_CURRENT_ROUTE_NAME',
  SET_USER_INFO = 'SET_USER_INFO',
  SET_GLOBAL_STATUS = 'SET_GLOBAL_STATUS',
  SET_QUICK_INPUT_TEXT = 'SET_QUICK_INPUT_TEXT',
}

export type CommonActionReturnT = {
  type: CommonActionType
  currentRouteName?: RouterNameValues
  userInfo?: UserInfoT | null
  globalStatus?: GlobalStatusValues
  quickInputText?: string
}

export interface UserInfoT {
  nickName: string
  avatarUrl: string
  city?: string
  country?: string
  province?: string
  gender?: number
  language?: string
}
