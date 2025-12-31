'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { PopupModal } from 'react-calendly'
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
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null)
  const [faqExpanded, setFaqExpanded] = useState(true)
  const [language, setLanguage] = useState('en')
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const translations: Record<string, any> = {
    en: {
      name: 'English',
      welcome: `**Welcome to makenzie.co!**\n\nI'm Marie, your AI assistant. I'm here to help you with any questions about our healthcare IT services, solutions, and expertise.\n\nFeel free to ask me anything about:\n\n- Our services and solutions\n- Healthcare IT consulting\n- Project inquiries\n- General information about makenzie.co\n\nHow can I assist you today?`,
      quickQuestions: 'Quick Questions',
      placeholder: 'Type your message...',
      scheduleAppointment: 'Schedule Appointment',
      questions: [
        { text: 'What services does Makenzie offer?', icon: '💼' },
        { text: 'How can I contact your team?', icon: '📞' },
        { text: 'What industries do you serve?', icon: '🏥' },
        { text: 'Tell me about your expertise', icon: '⭐' },
        { text: 'Where is your office located?', icon: '📍' }
      ]
    },
    es: {
      name: 'Español',
      welcome: `**¡Bienvenido a makenzie.co!**\n\nSoy Marie, tu asistente de IA. Estoy aquí para ayudarte con cualquier pregunta sobre nuestros servicios de TI para el cuidado de la salud, soluciones y experiencia.\n\nNo dudes en preguntarme sobre:\n\n- Nuestros servicios y soluciones\n- Consultoría de TI para el cuidado de la salud\n- Consultas sobre proyectos\n- Información general sobre makenzie.co\n\n¿Cómo puedo ayudarte hoy?`,
      quickQuestions: 'Preguntas Rápidas',
      placeholder: 'Escribe tu mensaje...',
      scheduleAppointment: 'Programar Cita',
      questions: [
        { text: '¿Qué servicios ofrece Makenzie?', icon: '💼' },
        { text: '¿Cómo puedo contactar a su equipo?', icon: '📞' },
        { text: '¿A qué industrias sirven?', icon: '🏥' },
        { text: 'Cuéntame sobre su experiencia', icon: '⭐' },
        { text: '¿Dónde está su oficina?', icon: '📍' }
      ]
    },
    zh: {
      name: '中文',
      welcome: `**欢迎来到 makenzie.co！**\n\n我是 Marie，您的 AI 助手。我在这里帮助您解答有关我们医疗保健 IT 服务、解决方案和专业知识的任何问题。\n\n请随时询问我：\n\n- 我们的服务和解决方案\n- 医疗保健 IT 咨询\n- 项目咨询\n- 关于 makenzie.co 的一般信息\n\n今天我能为您提供什么帮助？`,
      quickQuestions: '快速问题',
      placeholder: '输入您的消息...',
      scheduleAppointment: '预约',
      questions: [
        { text: 'Makenzie 提供什么服务？', icon: '💼' },
        { text: '如何联系您的团队？', icon: '📞' },
        { text: '您们服务哪些行业？', icon: '🏥' },
        { text: '告诉我您的专业知识', icon: '⭐' },
        { text: '您的办公室在哪里？', icon: '📍' }
      ]
    },
    tl: {
      name: 'Tagalog',
      welcome: `**Maligayang pagdating sa makenzie.co!**\n\nAko si Marie, ang iyong AI assistant. Nandito ako upang tumulong sa iyo sa anumang tanong tungkol sa aming mga serbisyo sa healthcare IT, solusyon, at kadalubhasaan.\n\nMalaya mong itanong ang tungkol sa:\n\n- Aming mga serbisyo at solusyon\n- Konsultasyon sa healthcare IT\n- Mga katanungan sa proyekto\n- Pangkalahatang impormasyon tungkol sa makenzie.co\n\nPaano kita matutulungan ngayon?`,
      quickQuestions: 'Mabilis na Tanong',
      placeholder: 'I-type ang iyong mensahe...',
      scheduleAppointment: 'Mag-schedule ng Appointment',
      questions: [
        { text: 'Anong serbisyo ang inaalok ng Makenzie?', icon: '💼' },
        { text: 'Paano ko makikipag-ugnayan sa inyong koponan?', icon: '📞' },
        { text: 'Anong mga industriya ang inyong pinagsisilbihan?', icon: '🏥' },
        { text: 'Sabihin mo sa akin ang tungkol sa inyong kadalubhasaan', icon: '⭐' },
        { text: 'Nasaan ang inyong opisina?', icon: '📍' }
      ]
    },
    vi: {
      name: 'Tiếng Việt',
      welcome: `**Chào mừng đến với makenzie.co!**\n\nTôi là Marie, trợ lý AI của bạn. Tôi ở đây để giúp bạn với bất kỳ câu hỏi nào về các dịch vụ CNTT chăm sóc sức khỏe, giải pháp và chuyên môn của chúng tôi.\n\nHãy thoải mái hỏi tôi về:\n\n- Các dịch vụ và giải pháp của chúng tôi\n- Tư vấn CNTT chăm sóc sức khỏe\n- Yêu cầu dự án\n- Thông tin chung về makenzie.co\n\nHôm nay tôi có thể giúp gì cho bạn?`,
      quickQuestions: 'Câu Hỏi Nhanh',
      placeholder: 'Nhập tin nhắn của bạn...',
      scheduleAppointment: 'Đặt Lịch Hẹn',
      questions: [
        { text: 'Makenzie cung cấp dịch vụ gì?', icon: '💼' },
        { text: 'Làm thế nào để liên hệ với nhóm của bạn?', icon: '📞' },
        { text: 'Bạn phục vụ ngành nào?', icon: '🏥' },
        { text: 'Nói cho tôi về chuyên môn của bạn', icon: '⭐' },
        { text: 'Văn phòng của bạn ở đâu?', icon: '📍' }
      ]
    },
    ar: {
      name: 'العربية',
      welcome: `**مرحبًا بك في makenzie.co!**\n\nأنا ماري، مساعدك الذكي. أنا هنا لمساعدتك في أي أسئلة حول خدماتنا في تكنولوجيا المعلومات للرعاية الصحية والحلول والخبرة.\n\nلا تتردد في سؤالي عن:\n\n- خدماتنا وحلولنا\n- استشارات تكنولوجيا المعلومات للرعاية الصحية\n- استفسارات المشاريع\n- معلومات عامة حول makenzie.co\n\nكيف يمكنني مساعدتك اليوم؟`,
      quickQuestions: 'أسئلة سريعة',
      placeholder: 'اكتب رسالتك...',
      scheduleAppointment: 'حجز موعد',
      questions: [
        { text: 'ما هي الخدمات التي تقدمها Makenzie؟', icon: '💼' },
        { text: 'كيف يمكنني الاتصال بفريقك؟', icon: '📞' },
        { text: 'ما هي الصناعات التي تخدمها؟', icon: '🏥' },
        { text: 'أخبرني عن خبرتك', icon: '⭐' },
        { text: 'أين يقع مكتبك؟', icon: '📍' }
      ]
    },
    fr: {
      name: 'Français',
      welcome: `**Bienvenue sur makenzie.co !**\n\nJe suis Marie, votre assistante IA. Je suis là pour vous aider avec toutes vos questions sur nos services informatiques de santé, nos solutions et notre expertise.\n\nN'hésitez pas à me poser des questions sur :\n\n- Nos services et solutions\n- Conseil en informatique de santé\n- Demandes de projet\n- Informations générales sur makenzie.co\n\nComment puis-je vous aider aujourd'hui ?`,
      quickQuestions: 'Questions Rapides',
      placeholder: 'Tapez votre message...',
      scheduleAppointment: 'Prendre Rendez-vous',
      questions: [
        { text: 'Quels services Makenzie propose-t-il ?', icon: '💼' },
        { text: 'Comment puis-je contacter votre équipe ?', icon: '📞' },
        { text: 'Quelles industries servez-vous ?', icon: '🏥' },
        { text: 'Parlez-moi de votre expertise', icon: '⭐' },
        { text: 'Où se trouve votre bureau ?', icon: '📍' }
      ]
    },
    ko: {
      name: '한국어',
      welcome: `**makenzie.co에 오신 것을 환영합니다!**\n\n저는 Marie, 여러분의 AI 어시스턴트입니다. 의료 IT 서비스, 솔루션 및 전문 지식에 대한 모든 질문을 도와드립니다.\n\n다음에 대해 자유롭게 질문하세요:\n\n- 서비스 및 솔루션\n- 의료 IT 컨설팅\n- 프로젝트 문의\n- makenzie.co에 대한 일반 정보\n\n오늘 무엇을 도와드릴까요?`,
      quickQuestions: '빠른 질문',
      placeholder: '메시지를 입력하세요...',
      scheduleAppointment: '약속 예약',
      questions: [
        { text: 'Makenzie는 어떤 서비스를 제공하나요?', icon: '💼' },
        { text: '팀에 어떻게 연락하나요?', icon: '📞' },
        { text: '어떤 산업 분야에 서비스를 제공하나요?', icon: '🏥' },
        { text: '전문 지식에 대해 알려주세요', icon: '⭐' },
        { text: '사무실은 어디에 있나요?', icon: '📍' }
      ]
    }
  }

  const t = translations[language]
  const quickQuestions = t.questions
  const fullWelcomeMessage = t.welcome

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

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser')
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      if (event.error !== 'aborted') {
        setError('Could not recognize speech. Please try again.')
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleSpeak = (text: string, id: string) => {
    if (isSpeaking === id) {
      window.speechSynthesis.cancel()
      setIsSpeaking(null)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      setIsSpeaking(id)
    }

    utterance.onend = () => {
      setIsSpeaking(null)
    }

    utterance.onerror = () => {
      setIsSpeaking(null)
    }

    window.speechSynthesis.speak(utterance)
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
        language: language,
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
        <span>Marie - Your AI Assistant</span>
        <select
          className="language-selector"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
        >
          {Object.entries(translations).map(([code, trans]) => (
            <option key={code} value={code}>{trans.name}</option>
          ))}
        </select>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && showWelcome && (
          <div className="message assistant">
            <ReactMarkdown>{welcomeText}</ReactMarkdown>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message-container ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="message-content-wrapper">
              <div className={`message ${msg.role}`}>
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
              {msg.role === 'assistant' && msg.content && (
                <div className="message-actions">
                  <button
                    className="action-button"
                    onClick={() => handleSpeak(msg.content, msg.id)}
                    aria-label={isSpeaking === msg.id ? "Stop speaking" : "Read aloud"}
                    title={isSpeaking === msg.id ? "Stop speaking" : "Read aloud"}
                  >
                    {isSpeaking === msg.id ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    )}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleCopy(msg.content, msg.id)}
                    aria-label="Copy message"
                    title={copiedId === msg.id ? "Copied!" : "Copy"}
                  >
                    {copiedId === msg.id ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}

      {showQuickQuestions && (
        <div className="faq-section">
          <button
            className="faq-toggle"
            onClick={() => setFaqExpanded(!faqExpanded)}
            aria-label={faqExpanded ? "Hide suggestions" : "Show suggestions"}
          >
            <span className="faq-toggle-text">{t.quickQuestions}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`faq-toggle-icon ${faqExpanded ? 'expanded' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {faqExpanded && (
            <>
              <button
                className="schedule-appointment-button"
                onClick={() => setIsCalendlyOpen(true)}
                aria-label="Schedule appointment"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{t.scheduleAppointment}</span>
              </button>
              <div className="quick-questions">
                {quickQuestions.map((q: any, index: number) => (
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
            </>
          )}
        </div>
      )}

      <div className="chat-input">
        <button
          className={`microphone-button ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
          disabled={isLoading}
          aria-label={isListening ? "Stop listening" : "Voice input"}
          title={isListening ? "Stop listening" : "Click to speak"}
        >
          {isListening ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
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
          )}
        </button>
        <input
          type="text"
          placeholder={t.placeholder}
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

      <PopupModal
        url="https://calendly.com/your-calendly-link"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById('root') as HTMLElement}
      />
    </div>
  )
}

export default ChatWidget
