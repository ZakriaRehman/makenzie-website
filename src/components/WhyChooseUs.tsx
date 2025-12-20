import { Award, DollarSign, Zap, Rocket } from 'lucide-react'

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

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Trusted Partner in AI & Data Engineering
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine technical excellence with business understanding to deliver solutions that actually work
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{reason.title}</h3>
              <p className="text-base leading-7 text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-gray-200 pt-10 sm:mt-20 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col items-start">
            <div className="text-4xl font-bold text-slate-900">100%</div>
            <div className="mt-2 text-base font-medium text-gray-900">Client Satisfaction</div>
            <div className="mt-1 text-sm text-gray-600">Production-ready delivery</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-4xl font-bold text-slate-900">24/7</div>
            <div className="mt-2 text-base font-medium text-gray-900">Support Available</div>
            <div className="mt-1 text-sm text-gray-600">Clear communication</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-4xl font-bold text-slate-900">50%</div>
            <div className="mt-2 text-base font-medium text-gray-900">Cost Savings</div>
            <div className="mt-1 text-sm text-gray-600">vs. traditional agencies</div>
          </div>
        </div>
      </div>
    </section>
  )
}
