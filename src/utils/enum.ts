export const RouterName = {
  HOME: 'home',
  CHAT: 'chat',
  USER: 'user'
} as const;

// 定义 RouterName 值的类型
export type RouterNameValues = typeof RouterName[keyof typeof RouterName];

export const InputType = {
  KEYBOARD: 'keyboard',
  AUDIO: 'audio'
} as const;

// 定义 InputType 值的类型
export type InputTypeValues = typeof InputType[keyof typeof InputType];

export const ChatRole = {
  USER: 'user',
  ASSISTANT: 'assistant'
} as const;

// 定义 ChatRole 值的类型
export type ChatRoleValues = typeof ChatRole[keyof typeof ChatRole];

export const GlobalStatus = {
  LOADING: 'loading',
  STREAMING: 'streaming',
  FINISHED: 'finished',
} as const;

// 定义 GlobalStatus 值的类型
export type GlobalStatusValues = typeof GlobalStatus[keyof typeof GlobalStatus];