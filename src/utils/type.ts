export type ArrowDirection = 'top' | 'right' | 'bottom' | 'left'

export type ChatRoleT = 'user' | 'assistant'

export type ChatItem = {
  chatId: string
  content: string
  role: ChatRoleT
  createdAt: string
  isLoading?: boolean
  isStreaming?: boolean
  isFinished?: boolean
}