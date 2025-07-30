import { CommonActionType, UserInfoT } from "@/store/types"
import { RouterNameValues } from "@/utils/enum"

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