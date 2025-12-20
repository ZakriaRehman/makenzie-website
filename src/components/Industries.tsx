import { Heart, Laptop, ShoppingCart, Scale, Briefcase } from 'lucide-react'

const industries = [
  {
    icon: Heart,
    name: 'Healthcare & Medical',
    description: 'HIPAA-compliant AI solutions, clinical decision support, and healthcare data integration.',
  },
  {
    icon: Laptop,
    name: 'SaaS & Technology',
    description: 'AI-powered features, automation tools, and intelligent data pipelines for tech companies.',
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce & Retail',
    description: 'Personalization engines, inventory optimization, and customer service automation.',
  },
  {
    icon: Scale,
    name: 'Finance & Legal',
    description: 'Document processing, compliance automation, and intelligent data analysis.',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    description: 'Workflow automation, client management systems, and business intelligence.',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Industries We Serve</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Expertise Across Multiple Sectors
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We bring industry-specific knowledge to deliver solutions that understand your unique challenges
          </p>
        </div>

        {/* Industries Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-5">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform group-hover:scale-110">
                <industry.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">{industry.name}</h3>
              <p className="text-sm text-gray-600">{industry.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
          <p className="text-base text-gray-600">
            Working in a different industry?{' '}
            <a href="#contact" className="font-semibold text-slate-900 hover:text-slate-800">
              We're happy to discuss how we can help →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
