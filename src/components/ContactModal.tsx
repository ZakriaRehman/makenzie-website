'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Focus management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-3xl transform rounded-2xl bg-white shadow-2xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            ref={firstFocusableRef}
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            aria-label="Close contact form"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="max-h-[90vh] overflow-y-auto p-8 sm:p-12">
            {/* Header */}
            <div className="mb-8">
              <h2
                id="modal-title"
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                Let's Work Together
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
                We're excited to hear about your project!
              </p>
            </div>

            {/* Form */}
            <ContactForm onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
