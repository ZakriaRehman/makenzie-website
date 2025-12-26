'use client'

import { Award, DollarSign, Zap, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CountUp from 'react-countup'

const reasons = [
  {
    icon: Award,
    title: 'Specialized Expertise',
    description: 'Deep expertise in AI/ML and healthcare technology. We understand the nuances of HIPAA compliance, clinical workflows, and modern AI architectures.',
  },
  {
    icon: DollarSign,
    title: 'International Quality, Competitive Pricing',
    description: 'Get world-class solutions without the premium price tag. We deliver the same quality as top US/European firms at a fraction of the cost.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround & Clear Communication',
    description: 'Rapid development cycles with transparent communication. Regular updates, demos, and direct access to our engineering team throughout the project.',
  },
  {
    icon: Rocket,
    title: 'End-to-End Delivery',
    description: 'From initial design to production deployment and ongoing support. We handle the entire lifecycle so you can focus on your business.',
  },
]

function AnimatedStat({ end, suffix = '', title, subtitle }: { end: number; suffix?: string; title: string; subtitle: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start"
    >
      <div className="text-4xl font-bold gradient-text">
        {isInView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : '0' + suffix}
      </div>
      <div className="mt-2 text-base font-medium text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{subtitle}</div>
    </motion.div>
  )
}

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
            Your Trusted Partner in AI & Data Engineering
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine technical excellence with business understanding to deliver solutions that actually work
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

        {/* Stats Section with Animated Numbers */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-primary-200/50 pt-10 sm:mt-20 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <AnimatedStat
            end={100}
            suffix="%"
            title="Client Satisfaction"
            subtitle="Production-ready delivery"
          />
          <AnimatedStat
            end={24}
            suffix="/7"
            title="Support Available"
            subtitle="Clear communication"
          />
          <AnimatedStat
            end={50}
            suffix="%"
            title="Cost Savings"
            subtitle="vs. traditional agencies"
          />
        </div>
      </div>
    </section>
  )
}
