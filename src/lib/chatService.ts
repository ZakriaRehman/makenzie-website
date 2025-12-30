const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000'

export interface ChatMessage {
  message: string
  session_id?: string
  language?: string
  use_rag?: boolean
  stream?: boolean
}

export async function* streamChat(request: ChatMessage): AsyncGenerator<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: request.message,
      session_id: request.session_id || null,
      language: request.language || 'en',
      use_rag: request.use_rag !== false,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) {
    throw new Error('No response body')
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data.trim()) {
            try {
              const parsed = JSON.parse(data)

              // Extract content from token events
              if (parsed.content) {
                yield parsed.content
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', data)
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
