import { RouterName, RouterNameValues } from "@/utils/enum"

export const commonStore = {
  // 当前选中的路由名称，默认是 RouterName.HOME
  currentRouteName: RouterName.HOME as RouterNameValues,

  getCurrentRouteName: (): RouterNameValues => {
    return commonStore.currentRouteName
  },

  setCurrentRouteName: (routeName: RouterNameValues) => {
    commonStore.currentRouteName = routeName
  },
}
