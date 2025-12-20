import { Phone, FileText, Code, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Discovery Call',
    description: 'We start with a free consultation to understand your business needs, technical requirements, and project goals.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Proposal & Planning',
    description: 'Receive a detailed proposal with clear scope, timeline, and pricing. No surprises, just transparent planning.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our team builds your solution with regular updates, demos, and feedback sessions to ensure we\'re on track.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deployment & Support',
    description: 'We launch your solution to production and provide ongoing maintenance and support to ensure success.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Our Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent, Effective
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From initial consultation to production deployment, we make the journey smooth and predictable
          </p>
        </div>

        {/* Process Steps */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
            {steps.map((step) => (
              <div key={step.number} className="relative flex gap-6">
                {/* Step Icon */}
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="mb-2 text-sm font-bold text-gray-500">{step.number}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-base leading-7 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-slate-900 px-6 py-10 text-center shadow-xl sm:mt-20 sm:px-10 sm:py-16">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to get started?</h3>
          <p className="mt-4 text-lg text-gray-300">
            Schedule a free consultation call to discuss your project
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Schedule Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
