'use client'

import React, { useState } from 'react'
import ChatWidget from './ChatWidget'
import '@/styles/chat.css'

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`floating-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <svg
          width="24"
          height="24"
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
        <div className="chat-modal">
          <div className="chat-modal-header">
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>Marie</div>
              <div style={{ fontSize: '13px', fontWeight: '400', opacity: '0.85' }}>Your AI Assistant</div>
            </div>
            <button
              className="close-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="chat-modal-content">
            <ChatWidget />
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingChatButton
