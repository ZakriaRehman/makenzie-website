'use client'

import { Building2, Heart, Laptop, Activity, Shield, Pill } from 'lucide-react'
import { motion } from 'framer-motion'

const industries = [
  {
    icon: Building2,
    name: 'Hospitals & Health Systems',
    description: 'Enterprise AI solutions for clinical documentation, decision support, and operational efficiency across multi-facility health systems. Support for Epic, Cerner, and major EHR platforms.',
  },
  {
    icon: Heart,
    name: 'Medical Practices & Clinics',
    description: 'Practice management automation, patient engagement tools, and AI-powered documentation for independent practices and clinic networks. From solo practitioners to multi-location groups.',
  },
  {
    icon: Laptop,
    name: 'Health Tech & Digital Health',
    description: 'Product development for telehealth platforms, remote patient monitoring, healthcare SaaS applications, and digital health startups. Build HIPAA-compliant products from the ground up.',
  },
  {
    icon: Activity,
    name: 'Specialty Healthcare Providers',
    description: 'Custom solutions for behavioral health, dental practices, physical therapy, dermatology, ophthalmology, and other specialty medical providers. Domain-specific workflows and compliance.',
  },
  {
    icon: Shield,
    name: 'Healthcare Payers & Insurance',
    description: 'Claims processing automation, member engagement platforms, and healthcare analytics for insurance companies, health plans, and managed care organizations.',
  },
  {
    icon: Pill,
    name: 'Life Sciences & Medical Devices',
    description: 'Data management solutions for pharmaceutical companies, clinical research organizations, and medical device manufacturers. Support for clinical trials, regulatory compliance, and research data.',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-accent-400 sm:text-lg">Healthcare IT Solutions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Healthcare IT Solutions Across All Settings
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We bring deep healthcare domain expertise to deliver solutions that understand your clinical workflows and compliance requirements
          </p>
        </motion.div>

        {/* Industries Grid with Fast Cascade */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-gray-200 transition-all hover:shadow-card-hover hover:ring-primary-300"
            >
              {/* Icon with Gradient Background and Wiggle Animation */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-400 text-white shadow-lg shadow-accent-400/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-sm"
              >
                <industry.icon className="h-7 w-7" />
              </motion.div>

              <h3 className="mb-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-accent-400">
                {industry.name}
              </h3>
              <p className="text-sm text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
