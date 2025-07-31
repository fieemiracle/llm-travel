import { CommonStateT, CommonActionType, CommonActionReturnT } from "@/store/types"
import { GlobalStatus, RouterName } from "@/utils/enum"

const initialState: CommonStateT = {
  currentRouteName: RouterName.HOME,
  userInfo: null,
  globalStatus: GlobalStatus.FINISHED,
  quickInputText: '',
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
    case CommonActionType.SET_GLOBAL_STATUS:
      return {
        ...state,
        globalStatus: action.globalStatus!,
      }
    case CommonActionType.SET_QUICK_INPUT_TEXT:
      return {
        ...state,
        quickInputText: action.quickInputText!,
      }
    default:
      return state
  }
}