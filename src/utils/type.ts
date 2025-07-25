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
  chunks?: ChatChunk[]
  isLoading?: boolean
  isStreaming?: boolean
  isFinished?: boolean
}