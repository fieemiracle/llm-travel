// 判断环境
// 微信小程序
export const isWeapp = process.env.TARO_ENV === 'weapp'

// 支付宝小程序
export const isAlipay = process.env.TARO_ENV === 'alipay'

// 百度小程序
export const isSwan = process.env.TARO_ENV === 'swan'

// 字节跳动小程序
export const isToutiao = process.env.TARO_ENV === 'tt'

// H5
export const isH5 = process.env.TARO_ENV === 'h5'

// 判断是否为小程序
export const isMiniProgram = isWeapp || isAlipay || isSwan || isToutiao
