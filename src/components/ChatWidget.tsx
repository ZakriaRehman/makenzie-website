'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { marked } from 'marked'
import { PopupModal } from 'react-calendly'
import { Message } from '@/types/chat'
import { streamChat } from '@/lib/chatService'

// Configure marked for safe HTML rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Helper function to convert markdown to HTML
function markdownToHTML(markdown: string): string {
  try {
    return marked.parse(markdown) as string
  } catch (error) {
    console.error('Error parsing markdown:', error)
    return markdown
  }
}

// Tokenize HTML into tags and text nodes for smooth streaming
function tokenizeHTML(html: string): Array<{ type: 'tag' | 'text', content: string }> {
  const tokens: Array<{ type: 'tag' | 'text', content: string }> = []
  const tagRegex = /<[^>]+>/g
  let lastIndex = 0
  let match

  while ((match = tagRegex.exec(html)) !== null) {
    // Add text before tag
    if (match.index > lastIndex) {
      const text = html.slice(lastIndex, match.index)
      if (text) tokens.push({ type: 'text', content: text })
    }
    // Add tag
    tokens.push({ type: 'tag', content: match[0] })
    lastIndex = tagRegex.lastIndex
  }

  // Add remaining text
  if (lastIndex < html.length) {
    const text = html.slice(lastIndex)
    if (text) tokens.push({ type: 'text', content: text })
  }

  return tokens
}

// Helper function to strip HTML tags and get plain text for TTS and copy
function stripHTML(html: string): string {
  if (typeof document === 'undefined') return html
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ''
}

interface ChatWidgetProps {
  onClose?: () => void
  language?: string
}

function ChatWidget({ onClose, language: propLanguage = 'en' }: ChatWidgetProps = {}) {
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
  const [language, setLanguage] = useState(propLanguage)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Sync language with prop
  useEffect(() => {
    setLanguage(propLanguage)
    setWelcomeText(translations[propLanguage]?.welcome || translations.en.welcome)
  }, [propLanguage])

  const translations: Record<string, any> = {
    en: {
      name: 'English',
      welcome: `Welcome to makenzie.co!\n\nI'm Marie, your AI assistant. I'm here to help you with any questions about our healthcare IT services and solutions.\n\nHow can I assist you today?`,
      quickQuestions: 'FAQs',
      placeholder: 'Type your message...',
      scheduleAppointment: 'Book a Call',
      questions: [
        {
          text: 'What are your services?',
          answer: 'We offer the following services:\n\n- **Healthcare AI Solutions**\n- **Healthcare Data Engineering**\n- **Medical Practice Automation**\n- **Healthcare Analytics & Reporting**\n- **Healthcare Product Development**\n- **Custom Healthcare AI**\n\nAll our services are **HIPAA-compliant** and designed to improve clinical workflows and patient outcomes.'
        },
        {
          text: 'How to contact you?',
          answer: 'You can reach us at **info@makenzie.co** or call **+92 316 0557117**. You can also book a consultation directly through our [scheduler](https://calendly.com/makenzie).'
        },
        {
          text: 'What are our packages?',
          answer: 'We offer three engagement models:\n\n- **Software Development Outsourcing** - for full end-to-end solutions\n- **Dedicated Healthcare Teams** - for long-term integrated support\n- **Healthcare IT Staff Augmentation** - to scale quickly\n\nAll pricing is **custom-tailored** to your specific needs.'
        },
        {
          text: 'Where are you located?',
          answer: 'We are located at **NASTP Delta, Lahore Cantt, Pakistan**. We serve healthcare clients **globally** with HIPAA-compliant solutions.'
        }
      ],
      demoQuestions: [
        {
          text: 'What services do you offer?',
          variations: ['what services', 'your services', 'services you offer', 'what do you offer'],
          answer: 'We offer the following services:\n\n- **Healthcare AI Solutions**\n- **Healthcare Data Engineering**\n- **Medical Practice Automation**\n- **Healthcare Analytics & Reporting**\n- **Healthcare Product Development**\n- **Custom Healthcare AI**\n\nAll our services are **HIPAA-compliant** and designed to improve clinical workflows and patient outcomes.'
        },
        {
          text: 'Are you HIPAA compliant?',
          variations: ['hipaa compliant', 'hipaa compliance', 'are you hipaa', 'hipaa'],
          answer: 'Yes, absolutely. All our solutions are **HIPAA-compliant** with **end-to-end encryption**, **secure data handling**, and **regular compliance audits**. Our team has extensive experience with healthcare regulations to keep your data protected.'
        },
        {
          text: 'What are your pricing and engagement models?',
          variations: ['pricing', 'engagement models', 'pricing models', 'cost', 'how much'],
          answer: 'We offer three flexible models:\n\n- **Software Development Outsourcing** - for complete solutions\n- **Dedicated Healthcare Teams** - for long-term integrated support\n- **Staff Augmentation** - for rapid scaling\n\nAll pricing is **customized** to your specific needs and budget.'
        },
        {
          text: 'Do you work with clients globally?',
          variations: ['work globally', 'global clients', 'international clients', 'worldwide'],
          answer: 'Yes! We serve healthcare clients **worldwide**. We work across all time zones, have experience with international healthcare standards and regulations specializing in **US Healthcare**, and provide **HIPAA-compliant solutions** regardless of your location.'
        }
      ]
    },
    es: {
      name: 'Español',
      welcome: `¡Bienvenido a makenzie.co!\n\nSoy Marie, tu asistente de IA. Estoy aquí para ayudarte con cualquier pregunta sobre nuestros servicios y soluciones tecnológicas de salud.\n\n¿Cómo puedo ayudarte hoy?`,
      quickQuestions: 'FAQs',
      placeholder: 'Escribe tu mensaje...',
      scheduleAppointment: 'Reservar Llamada',
      questions: [
        {
          text: '¿Cuáles son sus servicios?',
          answer: 'Ofrecemos los siguientes servicios:\n\n- **Soluciones de IA para la Salud**\n- **Ingeniería de Datos de Salud**\n- **Automatización de Práctica Médica**\n- **Análisis e Informes de Salud**\n- **Desarrollo de Productos de Salud**\n- **IA Personalizada para la Salud**\n\nTodos nuestros servicios cumplen con **HIPAA** y están diseñados para mejorar los flujos de trabajo clínicos y los resultados de los pacientes.'
        },
        {
          text: '¿Cómo contactarnos?',
          answer: 'Puede contactarnos en **info@makenzie.co** o llamar al **+92 316 0557117**. También puede reservar una consulta directamente a través de nuestro [planificador](https://calendly.com/makenzie).'
        },
        {
          text: '¿Cuáles son nuestros paquetes?',
          answer: 'Ofrecemos tres modelos de compromiso:\n\n- **Outsourcing de Desarrollo de Software** - para soluciones completas\n- **Equipos Dedicados de Salud** - para soporte integrado a largo plazo\n- **Ampliación de Personal de TI en Salud** - para escalar rápidamente\n\nTodos los precios se **personalizan** según sus necesidades específicas.'
        },
        {
          text: '¿Dónde están ubicados?',
          answer: 'Estamos ubicados en **NASTP Delta, Lahore Cantt, Pakistán**. Servimos a clientes del sector salud **a nivel mundial** con soluciones que cumplen con HIPAA.'
        }
      ],
      demoQuestions: [
        {
          text: '¿Qué servicios ofrecen?',
          variations: ['que servicios', 'sus servicios', 'servicios que ofrecen', 'que ofrecen'],
          answer: 'Ofrecemos los siguientes servicios:\n\n- **Soluciones de IA para la Salud**\n- **Ingeniería de Datos de Salud**\n- **Automatización de Práctica Médica**\n- **Análisis e Informes de Salud**\n- **Desarrollo de Productos de Salud**\n- **IA Personalizada para la Salud**\n\nTodos nuestros servicios cumplen con **HIPAA** y están diseñados para mejorar los flujos de trabajo clínicos y los resultados de los pacientes.'
        },
        {
          text: '¿Cumplen con HIPAA?',
          variations: ['hipaa', 'cumplimiento hipaa', 'cumplen hipaa', 'compatibles hipaa'],
          answer: 'Sí, absolutamente. Todas nuestras soluciones cumplen con **HIPAA** con **cifrado de extremo a extremo**, **manejo seguro de datos** y **auditorías de cumplimiento regulares**. Nuestro equipo tiene amplia experiencia con regulaciones de salud para mantener sus datos protegidos.'
        },
        {
          text: '¿Cuáles son sus modelos de precios y compromiso?',
          variations: ['precios', 'modelos de compromiso', 'modelos de precios', 'costo', 'cuanto cuesta'],
          answer: 'Ofrecemos tres modelos flexibles:\n\n- **Outsourcing de Desarrollo de Software** - para soluciones completas\n- **Equipos Dedicados de Salud** - para soporte integrado a largo plazo\n- **Ampliación de Personal** - para escalado rápido\n\nTodos los precios se **personalizan** según sus necesidades específicas y presupuesto.'
        },
        {
          text: '¿Trabajan con clientes a nivel mundial?',
          variations: ['trabajo mundial', 'clientes globales', 'clientes internacionales', 'mundial'],
          answer: '¡Sí! Servimos a clientes del sector salud **en todo el mundo**. Trabajamos en todas las zonas horarias, tenemos experiencia con estándares y regulaciones de salud internacionales especializándonos en **Salud de EE. UU.** y proporcionamos **soluciones compatibles con HIPAA** independientemente de su ubicación.'
        }
      ]
    },
    fr: {
      name: 'Français',
      welcome: `Bienvenue sur makenzie.co !\n\nJe suis Marie, votre assistante IA. Je suis là pour répondre à toutes vos questions sur nos services et solutions technologiques de santé.\n\nComment puis-je vous aider aujourd'hui ?`,
      quickQuestions: 'FAQs',
      placeholder: 'Tapez votre message...',
      scheduleAppointment: 'Réserver un Appel',
      questions: [
        {
          text: 'Quels sont vos services ?',
          answer: 'Nous proposons les services suivants :\n\n• **Solutions IA pour la Santé**\n• **Ingénierie de Données de Santé**\n• **Automatisation de Pratique Médicale**\n• **Analyses et Rapports de Santé**\n• **Développement de Produits de Santé**\n• **IA Personnalisée en Santé**\n\nTous nos services sont conformes **HIPAA** et conçus pour améliorer les flux de travail cliniques et les résultats des patients.'
        },
        {
          text: 'Comment vous contacter ?',
          answer: 'Vous pouvez nous contacter à **info@makenzie.co** ou appeler au **+92 316 0557117**. Vous pouvez également réserver une consultation directement via notre [planificateur](https://calendly.com/makenzie).'
        },
        {
          text: 'Quels sont nos forfaits ?',
          answer: 'Nous proposons trois modèles d\'engagement :\n\n- **Externalisation du Développement Logiciel** - pour des solutions complètes\n- **Équipes Dédiées de Santé** - pour un support intégré à long terme\n- **Augmentation du Personnel IT de Santé** - pour une mise à l\'échelle rapide\n\nTous les prix sont **personnalisés** selon vos besoins spécifiques.'
        },
        {
          text: 'Où êtes-vous situé ?',
          answer: 'Nous sommes situés à **NASTP Delta, Lahore Cantt, Pakistan**. Nous servons des clients du secteur de la santé **dans le monde entier** avec des solutions conformes HIPAA.'
        }
      ],
      demoQuestions: [
        {
          text: 'Quels services proposez-vous ?',
          variations: ['quels services', 'vos services', 'services que vous proposez', 'que proposez-vous'],
          answer: 'Nous proposons les services suivants :\n\n- **Solutions IA pour la Santé**\n- **Ingénierie de Données de Santé**\n- **Automatisation de Pratique Médicale**\n- **Analyses et Rapports de Santé**\n- **Développement de Produits de Santé**\n- **IA Personnalisée en Santé**\n\nTous nos services sont conformes **HIPAA** et conçus pour améliorer les flux de travail cliniques et les résultats des patients.'
        },
        {
          text: 'Êtes-vous conforme HIPAA ?',
          variations: ['hipaa', 'conformité hipaa', 'conforme hipaa', 'compatible hipaa'],
          answer: 'Oui, absolument. Toutes nos solutions sont **conformes HIPAA** avec **chiffrement de bout en bout**, **gestion sécurisée des données** et **audits de conformité réguliers**. Notre équipe a une vaste expérience des réglementations de santé pour protéger vos données.'
        },
        {
          text: 'Quels sont vos modèles de tarification et d\'engagement ?',
          variations: ['tarification', 'modèles d\'engagement', 'modèles de prix', 'coût', 'combien'],
          answer: 'Nous proposons trois modèles flexibles :\n\n- **Externalisation du Développement Logiciel** - pour des solutions complètes\n- **Équipes Dédiées de Santé** - pour un support intégré à long terme\n- **Augmentation du Personnel** - pour une mise à l\'échelle rapide\n\nTous les prix sont **personnalisés** selon vos besoins et votre budget.'
        },
        {
          text: 'Travaillez-vous avec des clients dans le monde entier ?',
          variations: ['travail mondial', 'clients mondiaux', 'clients internationaux', 'monde entier'],
          answer: 'Oui ! Nous servons des clients du secteur de la santé **dans le monde entier**. Nous travaillons dans tous les fuseaux horaires, avons de l\'expérience avec les normes et réglementations de santé internationales spécialisés dans **la Santé aux États-Unis**, et fournissons des **solutions conformes HIPAA** quel que soit votre emplacement.'
        }
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

    // Find the hardcoded answer for this question
    const questionObj = quickQuestions.find((q: any) => q.text === question)

    if (questionObj && questionObj.answer) {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: question,
        timestamp: new Date()
      }

      // Add assistant message with empty content for streaming
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isHTML: true
      }

      setMessages(prev => [...prev, userMessage, assistantMessage])

      // Convert markdown to HTML and tokenize for smooth streaming
      const htmlAnswer = markdownToHTML(questionObj.answer)
      const tokens = tokenizeHTML(htmlAnswer)

      const streamAnswer = async () => {
        // Brief delay to show typing indicator
        await new Promise(resolve => setTimeout(resolve, 300))

        for (const token of tokens) {
          if (token.type === 'tag') {
            // Add tags instantly (no delay)
            assistantMessage.content += token.content
            setMessages(prev => {
              const newMessages = [...prev]
              newMessages[newMessages.length - 1] = { ...assistantMessage }
              return newMessages
            })
          } else {
            // Stream text character by character
            for (const char of token.content) {
              assistantMessage.content += char
              setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = { ...assistantMessage }
                return newMessages
              })
              await new Promise(resolve => setTimeout(resolve, 15))
            }
          }
        }
      }

      streamAnswer()
    } else {
      // Fallback to API call if no hardcoded answer found
      handleSend(question)
    }
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

  const startListening = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Setup MediaRecorder for final Whisper transcription
      audioChunksRef.current = []
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      // Setup Web Audio API for silence detection
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyserRef.current = analyser
      analyser.fftSize = 2048
      source.connect(analyser)

      // Setup browser speech recognition for real-time transcription display
      let finalTranscript = ''
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        const recognition = new SpeechRecognition()
        recognitionRef.current = recognition

        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR'

        recognition.onresult = (event: any) => {
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' '
            } else {
              interimTranscript += transcript
            }
          }

          // Show real-time transcription in input
          const newText = (finalTranscript + interimTranscript).trim()
          setInput(newText)

          // Scroll to end and move cursor to end
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.scrollLeft = inputRef.current.scrollWidth
              inputRef.current.setSelectionRange(newText.length, newText.length)
            }
          }, 0)
        }

        recognition.onerror = (event: any) => {
          console.error('Real-time transcription error:', event.error)
          // Don't show error for interim transcription failures
        }

        recognition.start()
      }

      // Start recording
      mediaRecorder.start()
      setIsListening(true)
      setError(null)

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        setIsListening(false)

        // Stop browser speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.stop()
          recognitionRef.current = null
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())

        // Close audio context
        if (audioContextRef.current) {
          audioContextRef.current.close()
          audioContextRef.current = null
        }

        // Create blob from audio chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })

        // Send to Whisper API for final accurate transcription
        try {
          const formData = new FormData()
          formData.append('audio', audioBlob)
          formData.append('language', language === 'en' ? 'en' : language === 'es' ? 'es' : 'fr')

          const response = await fetch('/api/stt', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('Transcription failed')
          }

          const result = await response.json()
          // Replace interim transcription with accurate Whisper result
          setInput(result.text)

          // Scroll to end and move cursor to end
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.scrollLeft = inputRef.current.scrollWidth
              inputRef.current.setSelectionRange(result.text.length, result.text.length)
            }
          }, 0)
        } catch (error) {
          console.error('Whisper transcription error:', error)
          setError('Failed to transcribe audio. Please try again.')
          // Keep the interim transcription if Whisper fails
        }
      }

      // Silence detection loop
      const checkSilence = () => {
        if (!analyserRef.current || !mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
          return
        }

        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteTimeDomainData(dataArray)

        // Calculate volume level (RMS)
        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
          const normalized = (dataArray[i] - 128) / 128
          sum += normalized * normalized
        }
        const rms = Math.sqrt(sum / bufferLength)
        const volume = rms * 100

        // If volume is below threshold (silence), start/reset timer
        if (volume < 1) {
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop()
              }
            }, 3000) // 3 seconds of silence
          }
        } else {
          // Voice detected, clear silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current)
            silenceTimerRef.current = null
          }
        }

        // Continue checking
        requestAnimationFrame(checkSilence)
      }

      // Start silence detection
      checkSilence()

    } catch (error) {
      console.error('Microphone access error:', error)
      setError('Could not access microphone. Please allow microphone access.')
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSpeak = async (text: string, id: string) => {
    // Stop current audio if clicking on same message
    if (isSpeaking === id) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setIsSpeaking(null)
      return
    }

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setIsSpeaking(id)

    try {
      // Call OpenAI TTS API endpoint
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: language, // Pass current language for natural multilingual support
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }

      // Get audio blob from response
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Create and play audio element
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setIsSpeaking(null)
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      audio.onerror = () => {
        setIsSpeaking(null)
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
        console.error('Audio playback error')
      }

      await audio.play()
    } catch (error) {
      console.error('TTS error:', error)
      setIsSpeaking(null)
      setError('Failed to play audio')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim()
    if (!messageToSend || isLoading) return

    // Check for hardcoded demo questions first (exact match only)
    const normalizedInput = messageToSend.toLowerCase().trim()
    const demoQuestions = t.demoQuestions || []

    const matchedDemo = demoQuestions.find((q: any) => {
      // Only exact match with question text
      return q.text.toLowerCase() === normalizedInput
    })

    // If we found a demo question match, handle it with streaming effect
    if (matchedDemo) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: messageToSend,
        timestamp: new Date()
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isHTML: true
      }

      setMessages(prev => [...prev, userMessage, assistantMessage])
      setInput('')

      // Convert markdown to HTML and tokenize for smooth streaming
      const htmlAnswer = markdownToHTML(matchedDemo.answer)
      const tokens = tokenizeHTML(htmlAnswer)

      const streamAnswer = async () => {
        // Brief delay to show typing indicator
        await new Promise(resolve => setTimeout(resolve, 300))

        for (const token of tokens) {
          if (token.type === 'tag') {
            // Add tags instantly (no delay)
            assistantMessage.content += token.content
            setMessages(prev => {
              const newMessages = [...prev]
              newMessages[newMessages.length - 1] = { ...assistantMessage }
              return newMessages
            })
          } else {
            // Stream text character by character
            for (const char of token.content) {
              assistantMessage.content += char
              setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = { ...assistantMessage }
                return newMessages
              })
              await new Promise(resolve => setTimeout(resolve, 15))
            }
          }
        }
      }

      streamAnswer()

      return
    }

    // Otherwise proceed with API call
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
        isHTML: true
      }

      // Add empty assistant message
      setMessages(prev => [...prev, assistantMessage])

      // Accumulate markdown and convert to HTML for token-based streaming
      let markdownBuffer = ''
      let displayedTokenCount = 0

      // Stream the response - accumulate markdown and convert to HTML
      for await (const token of streamChat({
        message: userMessage.content,
        session_id: sessionId || undefined,
        language: language,
        signal: controller.signal,
      })) {
        markdownBuffer += token

        // Convert current markdown to HTML
        const currentHTML = markdownToHTML(markdownBuffer)

        // Tokenize the full HTML
        const allTokens = tokenizeHTML(currentHTML)

        // Stream only the new tokens we haven't displayed yet
        if (allTokens.length > displayedTokenCount) {
          const newTokens = allTokens.slice(displayedTokenCount)

          for (const htmlToken of newTokens) {
            if (htmlToken.type === 'tag') {
              // Add tags instantly (no delay)
              assistantMessage.content += htmlToken.content
              setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = { ...assistantMessage }
                return newMessages
              })
            } else {
              // Stream text character by character
              for (const char of htmlToken.content) {
                assistantMessage.content += char
                setMessages(prev => {
                  const newMessages = [...prev]
                  newMessages[newMessages.length - 1] = { ...assistantMessage }
                  return newMessages
                })

                // Fast character-by-character streaming
                await new Promise(resolve => setTimeout(resolve, 15))
              }
            }
          }

          displayedTokenCount = allTokens.length
        }
      }

      // Final update with complete HTML
      const finalHTML = markdownToHTML(markdownBuffer)
      if (finalHTML !== assistantMessage.content) {
        assistantMessage.content = finalHTML
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
        <div className="header-controls">
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
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && showWelcome && (
          <div className="message assistant">
            <ReactMarkdown>{welcomeText}</ReactMarkdown>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message-container ${msg.role}`}>
            <div className="message-content-wrapper">
              <div className={`message ${msg.role}`}>
                {msg.role === 'assistant' ? (
                  msg.content ? (
                    msg.isHTML ? (
                      <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )
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
                    onClick={() => handleSpeak(msg.isHTML ? stripHTML(msg.content) : msg.content, msg.id)}
                    aria-label={isSpeaking === msg.id ? "Stop speaking" : "Read aloud"}
                    data-tooltip={isSpeaking === msg.id ? "Stop" : "Listen"}
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
                    onClick={() => handleCopy(msg.isHTML ? stripHTML(msg.content) : msg.content, msg.id)}
                    aria-label="Copy message"
                    data-tooltip={copiedId === msg.id ? "Copied!" : "Copy"}
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
            className={`faq-toggle ${!faqExpanded ? 'collapsed' : ''}`}
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
              <polyline points="6 15 12 9 18 15"></polyline>
            </svg>
          </button>
          {faqExpanded && (
            <div className="quick-questions">
                {quickQuestions.map((q: any, index: number) => (
                  <button
                    key={index}
                    className="quick-question-chip"
                    onClick={() => handleQuickQuestion(q.text)}
                    disabled={isLoading}
                  >
                    <span className="chip-text">{q.text}</span>
                  </button>
                ))}
              </div>
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V5C15 3.34 13.66 2 12 2ZM12 13.5C11.17 13.5 10.5 12.83 10.5 12V5C10.5 4.17 11.17 3.5 12 3.5C12.83 3.5 13.5 4.17 13.5 5V12C13.5 12.83 12.83 13.5 12 13.5ZM17 11C17 14 14.76 16.5 12 16.5C9.24 16.5 7 14 7 11H5.5C5.5 14.48 8.09 17.32 11.25 17.82V21H12.75V17.82C15.91 17.32 18.5 14.48 18.5 11H17Z" />
            </svg>
          )}
        </button>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
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
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>

      {typeof window !== 'undefined' && (
        <PopupModal
          url="https://calendly.com/makenzie-info/new-meeting"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.body}
        />
      )}
    </div>
  )
}

export default ChatWidget
