export type ArrowDirection = 'top' | 'right' | 'bottom' | 'left'

export type ChatRoleT = 'user' | 'assistant'

export type ChatChunk = {
  id: string
  content: string
  role?: ChatRoleT
}

export type ChatItem = {
  chatId: string
  content: string
  role: ChatRoleT
  createdAt: string
  isThumbUp?: boolean
  isThumbDown?: boolean
  chunks?: ChatChunk[]
  isLoading?: boolean
  isStreaming?: boolean
  isFinished?: boolean
}

export type RichNodeT = {
  type?: 'node'  // 对于 HTMLElement，type 应该是 "node" 或 undefined
  name: string
  attrs: {
    class?: string
    style?: string
    src?: string
    [key: string]: any
  },
  children?: RichNodeT[]
} | {
  type: 'text'
  text: string
}