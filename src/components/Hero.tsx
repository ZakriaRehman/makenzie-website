'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, CheckCircle2, Play } from 'lucide-react'
import { motion } from 'framer-motion'

const CalendlyWidget = dynamic(() => import('./CalendlyWidget'), { ssr: false })

export default function Hero() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Subtle Gradient Orb */}
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary-100 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Simple Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm"
          >
            <div className="h-2 w-2 rounded-full bg-accent-400" />
            <span className="text-xs font-medium text-gray-700">Healthcare AI & Data Engineering Specialists</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Transform Healthcare with AI Solutions That{' '}
            <span className="text-accent-400">Actually Work</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            HIPAA-compliant AI systems and data pipelines built specifically for healthcare organizations. From clinical workflows to patient engagement, we deliver solutions that improve outcomes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent-400 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              <Play className="h-4 w-4" />
              View Services
            </a>
          </motion.div>

          {/* Simple Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="mt-1 text-sm text-gray-600">HIPAA Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="mt-1 text-sm text-gray-600">Healthcare Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">40%</div>
              <div className="mt-1 text-sm text-gray-600">Faster Documentation</div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span className="font-medium">Production-Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span className="font-medium">Healthcare Domain Expertise</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calendly Widget */}
      <CalendlyWidget
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </section>
  )
}
