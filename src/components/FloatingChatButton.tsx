'use client'

import React, { useState } from 'react'
import ChatWidget from './ChatWidget'
import '@/styles/chat.css'

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [language, setLanguage] = useState('en')
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  const toggleChat = () => {
    if (isOpen) {
      // Start closing animation
      setIsClosing(true)
      // Wait for animation to complete before actually closing
      setTimeout(() => {
        setIsOpen(false)
        setIsClosing(false)
      }, 400) // Match the CSS animation duration
    } else {
      setIsOpen(true)
    }
  }

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen)
  }

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setLanguageMenuOpen(false)
  }

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' }
  ]

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`floating-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Widget Modal */}
      {isOpen && (
        <div className={`chat-modal ${isClosing ? 'closing' : ''}`}>
          <div className="chat-modal-header">
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>Marie</div>
              <div style={{ fontSize: '13px', fontWeight: '400', opacity: '0.85', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                Online
              </div>
            </div>
            <div className="header-controls">
              <div className={`language-pill ${languageMenuOpen ? 'expanded' : ''}`}>
                {languageMenuOpen && (
                  <div className="language-flags">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`flag-button ${language === lang.code ? 'active' : ''}`}
                        onClick={() => selectLanguage(lang.code)}
                        aria-label={lang.name}
                      >
                        <span className="flag-icon">{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="globe-button"
                  onClick={toggleLanguageMenu}
                  aria-label="Select language"
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </button>
              </div>
              <button
                className="close-button"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat-modal-content">
            <ChatWidget language={language} />
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingChatButton
