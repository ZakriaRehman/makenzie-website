'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Message } from '@/types/chat'
import { streamChat } from '@/lib/chatService'

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomeText, setWelcomeText] = useState('')
  const [isWelcomeTyping, setIsWelcomeTyping] = useState(false)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    {
      text: 'What services does Makenzie offer?',
      icon: '💼'
    },
    {
      text: 'How can I contact your team?',
      icon: '📞'
    },
    {
      text: 'What industries do you serve?',
      icon: '🏥'
    },
    {
      text: 'Tell me about your expertise',
      icon: '⭐'
    }
  ]

  const fullWelcomeMessage = `**Welcome to makenzie.co!**

I'm Marie, your AI assistant. I'm here to help you with any questions about our healthcare IT services, solutions, and expertise.

Feel free to ask me anything about:

- Our services and solutions
- Healthcare IT consulting
- Project inquiries
- General information about makenzie.co

How can I assist you today?`

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, welcomeText])

  useEffect(() => {
    // Show welcome message immediately
    setShowWelcome(true)
    setWelcomeText(fullWelcomeMessage)
  }, [])

  const handleStop = () => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    if (isLoading) return
    handleSend(question)
  }

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim()
    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Create new AbortController for this request
    const controller = new AbortController()
    setAbortController(controller)

    try {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      // Add empty assistant message
      setMessages(prev => [...prev, assistantMessage])

      // Stream the response
      for await (const token of streamChat({
        message: userMessage.content,
        session_id: sessionId || undefined,
        signal: controller.signal,
      })) {
        assistantMessage.content += token
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = { ...assistantMessage }
          return newMessages
        })
      }

      // Save session ID from first response (if needed)
      if (!sessionId) {
        setSessionId(Date.now().toString())
      }
    } catch (err: any) {
      // Don't show error if it was aborted by user
      const isAborted =
        err.name === 'AbortError' ||
        err.code === 20 ||
        (err.message && err.message.includes('abort'));

      if (!isAborted) {
        console.error('Chat error:', err)
        setError('Failed to send message. Please try again.')
        // Remove the empty assistant message
        setMessages(prev => prev.slice(0, -1))
      }
    } finally {
      setIsLoading(false)
      setAbortController(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        Marie - Your AI Assistant
      </div>

      <div className="chat-messages">
        {messages.length === 0 && showWelcome && (
          <div className="message assistant">
            <ReactMarkdown>{welcomeText}</ReactMarkdown>
          </div>
        )}

        {showQuickQuestions && (
          <div className="quick-questions">
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                className="quick-question-chip"
                onClick={() => handleQuickQuestion(q.text)}
                disabled={isLoading}
              >
                <span className="chip-icon">{q.icon}</span>
                <span className="chip-text">{q.text}</span>
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.role === 'assistant' ? (
              msg.content ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )
            ) : (
              msg.content
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="chat-input">
        <button className="microphone-button" aria-label="Voice input">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={isLoading ? handleStop : () => handleSend()}
          disabled={!isLoading && !input.trim()}
          aria-label={isLoading ? "Stop generating" : "Send message"}
        >
          {isLoading ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: 'rotate(45deg) translateX(-2px) translateY(2px)' }}
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default ChatWidget
