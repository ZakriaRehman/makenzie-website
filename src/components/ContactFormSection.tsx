'use client'

import { ArrowRight } from 'lucide-react'

interface ContactFormSectionProps {
  onOpenModal: () => void
}

export default function ContactFormSection({ onOpenModal }: ContactFormSectionProps) {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
          >
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Let's discuss how we can help you improve clinical efficiency, enhance patient care, and maintain HIPAA compliance with AI-powered healthcare solutions.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent-400 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
            >
              LET'S WORK TOGETHER
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Reassurance */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Quick response • No obligation • Free consultation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
