# llm-didi-travel

> 🚀 智能旅游规划助手，让您的旅行更轻松！只需输入目的地和天数，小滴就能为您量身定制完美的吃喝玩乐住行攻略，适合个人游，家庭亲子游，情侣浪漫游，团队团建游，周末短途游，都能找到最适合的行程安排。

## 注意 CSS 原生单位（px） 和 小程序专用单位（rpx） 的转换问题

- **Taro 默认单位转换** 在编译到小程序时，Taro 默认会将 px 转换为 rpx（1px = 2rpx，在 750px 设计稿标准下）
- **转换**
- 1. 使用大写 PX 禁止转换（推荐）

## pnpm包管理

- pnpm install
- pnpm add xxx
- pnpm remove xxx
- pnpm prune

## 声明周期函数（@tarojs/taro）

- **useLaunch**
- **useError**
- **usePageNotFound**
- **useUnhandledRejection**
- **useRouter**
- **useLoad**
- **useReady**
- **useDidShow**           页面显示/切入前台时触发
- **useDidHide**           页面隐藏/切入后台时触发
- **useUnload**
- **usePullDownRefresh**   监听用户下拉动作
- **useReachBottom**       监听用户上拉触底事件
- **usePageScroll**        监听用户滑动页面事件
- **useResize**            小程序屏幕旋转时触发
- **useShareAppMessage**  监听用户点击页面内转发按钮（Button 组件 openType='share'）或右上角菜单“转发”按钮的行为，并自定义转发内容，`【Breaking】Taro 3.0.3 开始，使用此 Hook 时必须为页面配置 enableShareAppMessage: true。（修改配置文件后请重新编译项目）`
- **useTabItemTap**  点击 tab 时触发
- **useAddToFavorites**  监听用户点击右上角菜单“收藏”按钮的行为，并自定义收藏内容
- **useShareTimeline**  监听右上角菜单“分享到朋友圈”按钮的行为，并自定义分享内容，`使用时，必须为页面配置 enableShareTimeline: true。（修改配置文件后请重新编译项目）`
- **useSaveExitState**  每当小程序可能被销毁之前，页面回调函数 onSaveExitState 会被调用，可以进行退出状态的保存

- **useTitleClick**       只有支付宝小程序支持，点击标题触发
- **useOptionMenuClick**  只有支付宝小程序支持，点击导航栏额外图标触发
- **usePullIntercept**    只有支付宝小程序支持，下拉截断时触发

## 状态管理（Redux）

- pnpm add redux react-redux

- **redux-thunk**
- **redux-logger**
- **useSelector**
- **useDispatch**
- **useStore**

## 环境判断

### process.env.TARO_ENV & Taro.getEnv()

| 特性         | process.env.TARO_ENV   | Taro.getEnv()         |
| ------------ | ---------------------- | --------------------- |
| 执行时机     | 编译时确定             | 运行时动态获取        |
| 代码压缩     | 会被Tree Shaking优化   | 无法被静态分析        |
| 多端兼容性   | 需要记住各平台字符串   | 使用标准常量          |
| 推荐场景     | 条件编译（如不同平台组件） | 运行时逻辑判断    |

## Taro UI

- **安装** pnpm add taro-ui
- **微信版本库限制** 因为要支持自定义主题功能，需要将样式从组件中抽离，在微信小程序中依赖`globalClass`功能，所以需要微信基础库版本在`v2.2.3以上`
- 配置需要额外编译的源码模块
- 由于引用`node_modules`的模块，默认不会编译，所以需要额外给H5配置`esnextModules`，在taro项目的`config/index.ts`中新增如下配置项
```javascript
h5: {
  esnextModules: ['taro-ui']
}
```
- **使用方式**
```javascript
// 引入所需组件
import { AtButton } from 'taro-ui'

// 方式1: 组件依赖的样式文件（按需引用时需要）（CSS中）
@import "~taro-ui/dist/style/components/button.scss";

// 方式2: 全局引入（JS中）
import 'taro-ui/dist/style/index.scss'

// 方式3: 全局引入（CSS中）
@import "~taro-ui/dist/style/index.scss";
```
