// 调用DMXAPI
import { getEnv, ENV_TYPE } from '@tarojs/taro'

// 主流大模型列表
export const DMXAPI_MODELS = {
  DEEPSEEK_R1: 'deepseek-r1',
  DEEPSEEK_V3: 'deepseek-v3',
  HUNYUAN_T1: 'hunyuan-t1-20250321', // 腾讯混元：微信生态整合，T1推理模型
  QWEN_MAX_LATEST: 'qwen-max-latest', // 阿里巴巴（中国）：数学与编程领先
  DOUBAO_1_5_PRO_32K: 'Doubao-1.5-pro-32k',
  ERNIE_4_0_8K: 'ERNIE-4.0-8K',
  GLM_4: 'glm-4',
  GPT_4O_MINI: 'gpt-4o-mini',
  CLAUDE_3_7_SONNET_20250219: 'claude-3-7-sonnet-20250219',
  GEMINI_2_5_PRO_EXP_03_25: 'gemini-2.5-pro-exp-03-25',
  GROK_3_BETA: 'grok-3',
  META_LLAMA_3_1_8B_INSTRUCT: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
}

export const DMXAPI_REQUEST_BASE_URL = 'https://www.dmxapi.cn'

export const DMXAPI_REQUEST_URL = `${DMXAPI_REQUEST_BASE_URL}/v1/chat/completions`

export const DMXAPI_REQUEST_API_KEY = 'sk-tJl5fl5Zl0n0Eb032JKJROIhXLL652zc6gqkh7wSDRZiixSD'

// 获取当前环境
const getCurrentEnv = () => {
  const env = getEnv()
  if (env === ENV_TYPE.WEAPP) return 'weapp'
  if (env === ENV_TYPE.ALIPAY) return 'alipay'
  if (env === ENV_TYPE.SWAN) return 'swan'
  if (env === ENV_TYPE.TT) return 'tt'
  if (env === ENV_TYPE.WEB) return 'h5'
  if (env === ENV_TYPE.RN) return 'rn'
  return 'unknown'
}

// 根据环境生成请求头
export const getRequestHeaders = () => {
  const currentEnv = getCurrentEnv()
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${DMXAPI_REQUEST_API_KEY}`,
  }

  // H5 环境可以使用 User-Agent
  if (currentEnv === 'h5') {
    return {
      ...baseHeaders,
      'User-Agent': 'DMXAPI/1.0.0 (https://www.dmxapi.cn)',
    }
  }

  // 小程序环境使用自定义头部
  return {
    ...baseHeaders,
    'X-Client-Type': 'DMXAPI/1.0.0',
    'X-Client-Platform': currentEnv,
    'X-Client-Url': 'https://www.dmxapi.cn',
  }
}

// 兼容旧版本的静态配置
export const DMXAPI_REQUEST_HEADERS = getRequestHeaders()

export const DMXAPI_REQUEST_TIMEOUT = 6000000

export type HttpMethod = keyof typeof DMXAPI_REQUEST_METHOD

export const DMXAPI_REQUEST_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
}

export type DmxapiResponseData = {
  id: string
  choices: {
    index: number
    delta: {
      content?: string
      role: string
    }
  }[],
  object?: string
  created?: number
  model?: string
}
