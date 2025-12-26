'use client'

import { Brain, Heart, Database, Zap, Code, TrendingUp, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const services = [
  {
    id: 'healthcare-ai',
    icon: Heart,
    title: 'Healthcare AI Solutions',
    shortDesc: 'HIPAA-compliant AI systems',
    description: 'Purpose-built AI systems for healthcare providers. Automate clinical documentation, support diagnosis decisions, and enhance patient care—all while maintaining strict HIPAA compliance.',
    features: [
      'HIPAA-compliant infrastructure',
      'Clinical documentation automation (AI scribes, chart notes)',
      'Clinical decision support systems',
      'Patient engagement & communication tools',
    ],
  },
  {
    id: 'healthcare-data',
    icon: Database,
    title: 'Healthcare Data Engineering',
    shortDesc: 'HL7/FHIR-compatible data pipelines',
    description: 'Build robust data infrastructure for healthcare organizations. Integrate EHRs, manage patient data securely, and enable real-time analytics for better decision-making.',
    features: [
      'HL7/FHIR data integration',
      'EHR system integration (Epic, Cerner, etc.)',
      'Healthcare data warehousing',
      'Real-time patient data processing',
    ],
  },
  {
    id: 'practice-automation',
    icon: Zap,
    title: 'Medical Practice Automation',
    shortDesc: 'Streamline healthcare operations',
    description: 'Automate administrative tasks and workflows to let healthcare professionals focus on patient care. Reduce overhead and eliminate manual processes.',
    features: [
      'Appointment scheduling & reminders',
      'Insurance verification automation',
      'Billing & claims processing',
      'Patient intake automation',
    ],
  },
  {
    id: 'healthcare-analytics',
    icon: TrendingUp,
    title: 'Healthcare Analytics & Reporting',
    shortDesc: 'Data-driven healthcare insights',
    description: 'Transform healthcare data into actionable insights. Track outcomes, identify trends, and make evidence-based decisions to improve patient care.',
    features: [
      'Population health analytics',
      'Clinical outcomes tracking',
      'Operational efficiency metrics',
      'Predictive analytics for patient risk',
    ],
  },
  {
    id: 'healthcare-product',
    icon: Code,
    title: 'Healthcare Product Development',
    shortDesc: 'End-to-end healthcare software',
    description: 'Build production-ready healthcare applications from scratch. Patient portals, provider dashboards, telehealth platforms—secure, compliant, and user-friendly.',
    features: [
      'HIPAA-compliant web & mobile apps',
      'Patient portal development',
      'Provider dashboard & admin tools',
      'Telehealth platform development',
    ],
  },
  {
    id: 'custom-healthcare-ai',
    icon: Brain,
    title: 'Custom Healthcare AI',
    shortDesc: 'Specialized AI for unique challenges',
    description: 'Custom AI solutions for specialized healthcare needs beyond our core offerings. From medical imaging analysis to predictive patient risk models.',
    features: [
      'Medical imaging AI (radiology, pathology)',
      'Predictive patient risk modeling',
      'Natural language processing for medical records',
      'Custom clinical algorithms',
    ],
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(services[0])
  const [isPaused, setIsPaused] = useState(false)

  // Auto-cycle through services
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveService((current) => {
        const currentIndex = services.findIndex((s) => s.id === current.id)
        const nextIndex = (currentIndex + 1) % services.length
        return services[nextIndex]
      })
    }, 4000) // Change service every 4 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const handleServiceClick = (service: typeof services[0]) => {
    setActiveService(service)
    setIsPaused(true)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000)
  }

  return (
    <section
      id="services"
      className="relative bg-gray-50 py-20 sm:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold text-accent-400">Our Solutions</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Healthcare AI & Data Solutions
          </h2>
          <p className="mt-4 text-base text-gray-600">
            HIPAA-compliant systems and data pipelines that transform healthcare organizations
          </p>
        </motion.div>

        {/* Compact Split Screen Layout */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left: Service Navigation - Compact */}
            <div className="lg:col-span-4">
              <div className="space-y-2">
                {services.map((service, index) => {
                  const IconComponent = service.icon
                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      initial={{ opacity: 1, x: 0 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`group relative w-full text-left transition-all duration-300`}
                    >
                      <div
                        className={`relative rounded-xl p-4 transition-all duration-300 ${
                          activeService.id === service.id
                            ? 'bg-accent-400 shadow-lg scale-105'
                            : 'bg-white hover:bg-gray-50 shadow-sm hover:scale-102'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={activeService.id === service.id ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.5 }}
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                              activeService.id === service.id
                                ? 'bg-white/20 text-white'
                                : 'bg-accent-50 text-accent-400'
                            }`}
                          >
                            <IconComponent className="h-5 w-5" strokeWidth={2.5} />
                          </motion.div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-sm font-semibold ${
                              activeService.id === service.id
                                ? 'text-white'
                                : 'text-gray-900'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p
                            className={`text-xs mt-0.5 ${
                              activeService.id === service.id
                                ? 'text-white/80'
                                : 'text-gray-500'
                            }`}
                          >
                            {service.shortDesc}
                          </p>
                        </div>

                        <ArrowRight
                          className={`h-4 w-4 flex-shrink-0 transition-all ${
                            activeService.id === service.id
                              ? 'text-white opacity-100'
                              : 'text-gray-400 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>

                      {/* Progress bar for active service */}
                      {activeService.id === service.id && !isPaused && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 4, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Right: Service Showcase - Compact */}
            <div className="lg:col-span-8">
              <div className="lg:sticky lg:top-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
                      <div>
                        {/* Icon */}
                        <motion.div
                          initial={{ scale: 0.8, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                          className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-400 text-white shadow-lg shadow-accent-400/30"
                        >
                          {(() => {
                            const ActiveIcon = activeService.icon
                            return <ActiveIcon className="h-7 w-7" strokeWidth={2.5} />
                          })()}
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4 text-2xl font-bold text-gray-900"
                        >
                          {activeService.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 text-base text-gray-600"
                        >
                          {activeService.description}
                        </motion.p>

                        {/* Features */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Key Features
                          </p>
                          <ul className="mt-3 space-y-2">
                            {activeService.features.map((feature, idx) => (
                              <motion.li
                                key={feature}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <svg className="h-5 w-5 flex-shrink-0 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* CTA */}
                        <div className="mt-8 flex gap-3">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500"
                          >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                          </a>
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
