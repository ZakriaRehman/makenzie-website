export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isHTML?: boolean
}

export interface ChatResponse {
  session_id: string
  message_id: string
  content: string
  sources?: Array<{
    id: string
    score: number
  }>
}
