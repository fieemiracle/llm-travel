// 判断环境
import { getEnv, ENV_TYPE } from '@tarojs/taro'

// Taro.getEnv() 可以在任何地方调用
// process.env.TARO_ENV 只能在编译阶段使用

// 微信小程序
export const isWeapp = getEnv() === ENV_TYPE.WEAPP

// 支付宝小程序
export const isAlipay = getEnv() === ENV_TYPE.ALIPAY

// 百度小程序
export const isSwan = getEnv() === ENV_TYPE.SWAN

// 字节跳动小程序（抖音小程序）
export const isToutiao = getEnv() === ENV_TYPE.TT

// Web｜H5
export const isH5 = getEnv() === ENV_TYPE.WEB

// 快应用
export const isQuickApp = getEnv() === ENV_TYPE.QUICKAPP

// RN
export const isRN = getEnv() === ENV_TYPE.RN

// QQ小程序
export const isQQ = getEnv() === ENV_TYPE.QQ

// 京东小程序
export const isJD = getEnv() === ENV_TYPE.JD

// 判断是否为小程序
export const isMiniProgram = !(isH5 && isRN && isQuickApp)
