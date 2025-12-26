'use client'

import { Shield, FileText, Users, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: Shield,
    title: 'Discovery & Compliance Review',
    description: 'Free consultation to understand your clinical workflows, technical requirements, and compliance needs. We review your existing systems (EHR, practice management) and identify integration opportunities.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Proposal & Security Assessment',
    description: 'Detailed proposal with clear scope, HIPAA compliance plan, security assessment, and integration roadmap. Transparent pricing with no surprises.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Development & Clinical Validation',
    description: 'Agile development with regular demos to your clinical and administrative staff. Iterative feedback ensures the solution fits your real-world workflows.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deployment & Ongoing Support',
    description: 'Production launch with staff training, compliance documentation, and 24/7 support. Ongoing maintenance and updates to keep your system secure and compliant.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-gradient-to-b from-white via-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-accent-400 sm:text-lg">Our Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent, Effective
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From initial consultation to production deployment, we make the journey smooth and predictable
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Step Icon with Glow Effect */}
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-400 text-white shadow-lg shadow-accent-400/30 animate-pulse-glow"
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="mb-2 text-sm font-bold gradient-text">{step.number}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-base leading-7 text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 px-6 py-10 text-center shadow-xl shadow-accent-400/30 sm:mt-20 sm:px-10 sm:py-16"
        >
          {/* Animated Background Orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-cyan-400 blur-3xl"
          />

          <div className="relative">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to transform your healthcare operations?</h3>
            <p className="mt-4 text-lg text-primary-100">
              Schedule a free consultation to discuss your healthcare IT needs
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-primary-500 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
            >
              Schedule Free Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
