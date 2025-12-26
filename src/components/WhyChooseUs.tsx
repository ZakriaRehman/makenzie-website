'use client'

import { Award, Shield, TrendingUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  {
    icon: Award,
    title: 'Healthcare Domain Expertise',
    description: 'Deep understanding of healthcare workflows, regulations, and challenges. We\'ve built solutions for hospitals, clinics, and health tech companies—we speak your language and understand HIPAA, HL7/FHIR, and clinical operations.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security & Compliance',
    description: 'HIPAA-compliant infrastructure from day one. Every solution we build meets healthcare security standards, includes audit trails, encryption, and follows best practices for patient data protection.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Healthcare Results',
    description: 'Measurable impact on clinical efficiency and patient outcomes. Our clients report reduced documentation time, improved patient satisfaction, and streamlined operations within months of deployment.',
  },
  {
    icon: Heart,
    title: 'Full-Lifecycle Partnership',
    description: 'From compliance review to clinical validation to ongoing support. We understand healthcare IT procurement and work seamlessly with your existing systems and workflows.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-accent-400">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Healthcare Organizations Choose Makenzie
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine healthcare domain expertise with technical excellence to deliver solutions that transform clinical workflows
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-400 text-white shadow-lg shadow-accent-400/20">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{reason.title}</h3>
              <p className="text-base leading-7 text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
