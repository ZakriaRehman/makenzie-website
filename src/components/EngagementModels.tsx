'use client'

import { Code, Users, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

const models = [
  {
    icon: Code,
    title: 'Software Development Outsourcing',
    description: 'Building your software with our expert team.',
    details: 'Complete end-to-end software development handled by our experienced engineers. From ideation to deployment, we take full ownership of your project while keeping you in the loop at every stage.',
  },
  {
    icon: Users,
    title: 'Dedicated Teams',
    description: 'Long term, integrated teams for your project success.',
    details: 'Get a fully committed team that works exclusively on your project. They integrate seamlessly with your processes and become an extension of your in-house team for consistent, long-term collaboration.',
  },
  {
    icon: UserPlus,
    title: 'IT Staff Augmentation',
    description: 'Quick engagement to boost your team.',
    details: 'Scale your team quickly with skilled professionals who fill specific roles and expertise gaps. Perfect for short-term needs or when you need specialized skills for particular project phases.',
  },
]

export default function EngagementModels() {
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
          <h2 className="text-base font-semibold text-accent-400 sm:text-lg">Engagement Models</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Flexible Ways to Work Together
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the engagement model that best fits your project needs and organizational structure
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-card ring-1 ring-gray-200 transition-all hover:shadow-card-hover hover:ring-primary-300"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-cyan-50/0 opacity-0 transition-opacity duration-500 group-hover:from-primary-50/50 group-hover:to-accent-cyan-50/50 group-hover:opacity-100" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-400 text-white shadow-lg shadow-accent-400/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-md">
                  <model.icon className="h-7 w-7" />
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-accent-400">
                  {model.title}
                </h3>
                <p className="mb-4 text-base font-medium text-gray-700">{model.description}</p>

                {/* Details */}
                <p className="text-sm leading-6 text-gray-600">
                  {model.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
