// API配置文件
export const API_CONFIG = {
  // DeepSeek API (推荐 - 国内可用)
  deepseek: {
    url: 'https://api.deepseek.com/v1/chat/completions',
    token: 'sk-6f1f6f2f60634380b4ef8c8a24bab269', // 请替换为你的DeepSeek API Key
    model: 'deepseek-chat',
    name: 'DeepSeek'
  },
  // ChatAnywhere API (备选)
  chatanywhere: {
    url: 'https://api.chatanywhere.tech/v1/chat/completions',
    token: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 请替换为你的ChatAnywhere API Key
    model: 'gpt-3.5-turbo',
    name: 'ChatAnywhere'
  },
  // 通义千问 API (阿里云)
  qwen: {
    url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    token: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 请替换为你的通义千问 API Key
    model: 'qwen-turbo',
    name: '通义千问'
  },
  // 文心一言 API (百度)
  ernie: {
    url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 请替换为你的文心一言 API Key
    model: 'ernie-bot-turbo',
    name: '文心一言'
  },
  // OpenAI API (原配置)
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    token: 'sk-proj-ZM6O5pPmPzaCCcgxTYdKT3BlbkFJJP8ftC218mdERz8RPH8m',
    model: 'gpt-3.5-turbo',
    name: 'OpenAI'
  }
}

// 当前使用的API配置 (可以切换)
export const currentAPI = API_CONFIG.deepseek // 默认使用DeepSeek

// API切换函数
export function switchAPI(apiName: keyof typeof API_CONFIG) {
  return API_CONFIG[apiName]
}

// 获取所有可用的API列表
export function getAvailableAPIs() {
  return Object.keys(API_CONFIG).map(key => ({
    key,
    ...API_CONFIG[key as keyof typeof API_CONFIG]
  }))
}
