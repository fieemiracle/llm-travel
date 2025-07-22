import { ChatItem } from "@/utils/type"
import { RouterNameValues } from "@/utils/enum"

// chat相关
export interface ChatStateT {
  chatList: ChatItem[]
  queryText: string
}

export const enum ChatActionType {
  ADD_CHAT_ITEM = 'ADD_CHAT_ITEM',
  UPDATE_CHAT_ITEM = 'UPDATE_CHAT_ITEM',
  CLEAR_CHAT_LIST = 'CLEAR_CHAT_LIST',
  SET_QUERY_TEXT = 'SET_QUERY_TEXT',
}

export type ChatActionReturnT = {
  type: ChatActionType
  chatItem?: ChatItem
  queryText?: string
}

// common相关
export interface CommonStateT {
  currentRouteName: RouterNameValues
}

export const enum CommonActionType {
  SET_CURRENT_ROUTE_NAME = 'SET_CURRENT_ROUTE_NAME',
}

export type CommonActionReturnT = {
  type: CommonActionType
  currentRouteName?: RouterNameValues
}