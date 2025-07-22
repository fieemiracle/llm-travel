// src/store/reducers/index.ts
// @ts-ignore
import { combineReducers } from "redux"
import { chatReducer } from "@/store/reducers/chat"
import { commonReducer } from "@/store/reducers/common"

export const rootReducer = combineReducers({
  chat: chatReducer,
  common: commonReducer,
})