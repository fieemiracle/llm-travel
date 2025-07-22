import { CommonActionType } from "@/store/types"
import { RouterNameValues } from "@/utils/enum"

// 设置当前路由名称
export const setCurrentRouteName = (currentRouteName: RouterNameValues) => {
  return {
    type: CommonActionType.SET_CURRENT_ROUTE_NAME,
    currentRouteName,
  }
}