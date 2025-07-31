import { CommonActionType, UserInfoT } from "@/store/types"
import { RouterNameValues, GlobalStatusValues } from "@/utils/enum"

// 设置当前路由名称
export const setCurrentRouteName = (currentRouteName: RouterNameValues) => {
  return {
    type: CommonActionType.SET_CURRENT_ROUTE_NAME,
    currentRouteName,
  }
}

// 设置用户信息
export const setUserInfo = (userInfo: UserInfoT | null) => {
  return {
    type: CommonActionType.SET_USER_INFO,
    userInfo,
  }
}

// 设置全局状态
export const setGlobalStatus = (globalStatus: GlobalStatusValues) => {
  return {
    type: CommonActionType.SET_GLOBAL_STATUS,
    globalStatus,
  }
}

// 设置快速输入文本
export const setQuickInputText = (quickInputText: string) => {
  return {
    type: CommonActionType.SET_QUICK_INPUT_TEXT,
    quickInputText,
  }
}