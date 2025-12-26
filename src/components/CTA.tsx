'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Calendar, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const CalendlyWidget = dynamic(() => import('./CalendlyWidget'), { ssr: false })

export default function CTA() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-accent-400 py-24 sm:py-32">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent-300 opacity-20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary-400 opacity-20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transform Your Healthcare Operations with AI
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/90">
            Schedule a free consultation to discuss your healthcare IT needs. No obligation, no sales pressure — just a genuine conversation about improving your clinical workflows and patient outcomes.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-500 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
            >
              <Calendar className="h-5 w-5" />
              Schedule Free Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="mailto:info@makenzie.co"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 glass-dark px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center gap-4 border-t border-white/30 pt-8 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-8"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@makenzie.co" className="transition-colors hover:text-white">
                info@makenzie.co
              </a>
            </div>
            <div className="hidden h-4 w-px bg-white/30 sm:block" />
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+923160557117" className="transition-colors hover:text-white">
                +92 316 0557117
              </a>
            </div>
          </motion.div>

          {/* Reassurance */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-white/80"
          >
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free consultation • No obligation • Fast response time</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Calendly Widget */}
      <CalendlyWidget
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </section>
  )
}
