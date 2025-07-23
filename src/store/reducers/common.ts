import { CommonStateT, CommonActionType, CommonActionReturnT } from "@/store/types"
import { RouterName } from "@/utils/enum"

const initialState: CommonStateT = {
  currentRouteName: RouterName.HOME,
  userInfo: null,
}

export const commonReducer = (state = initialState, action: CommonActionReturnT) => {
  switch (action.type) {
    case CommonActionType.SET_CURRENT_ROUTE_NAME:
      return {
        ...state,
        currentRouteName: action.currentRouteName!,
      }
    case CommonActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo!,
      }
    default:
      return state
  }
}