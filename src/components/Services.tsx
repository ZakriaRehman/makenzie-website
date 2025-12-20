import { Bot, HeartPulse, Database, Zap, Layers, Brain } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'Custom AI Development',
    description: 'Build intelligent solutions tailored to your business needs with cutting-edge AI technology.',
    features: [
      'LLM integration and fine-tuning',
      'RAG systems',
      'AI chatbots and virtual assistants',
      'Conversational AI for business',
    ],
    technologies: ['OpenAI', 'Claude', 'LangChain', 'LlamaIndex'],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare AI Solutions',
    description: 'HIPAA-compliant AI systems designed specifically for the healthcare industry.',
    features: [
      'HIPAA-compliant AI systems',
      'Medical documentation automation',
      'Clinical decision support',
      'Healthcare chatbots',
    ],
    technologies: ['HL7', 'FHIR', 'Python', 'FastAPI'],
  },
  {
    icon: Database,
    title: 'Data Engineering & Pipelines',
    description: 'Design and build scalable data infrastructure that powers your business intelligence.',
    features: [
      'ETL/ELT pipeline development',
      'Data warehouse design',
      'Real-time data processing',
      'Healthcare data integration',
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'Elasticsearch', 'AWS'],
  },
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Streamline workflows and eliminate manual tasks with intelligent automation solutions.',
    features: [
      'Workflow automation',
      'Document processing & extraction',
      'Business process automation',
      'System integration',
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'APIs'],
  },
  {
    icon: Layers,
    title: 'Full-Stack AI Applications',
    description: 'Complete AI product development from concept to deployment on cloud infrastructure.',
    features: [
      'End-to-end AI product development',
      'API development and integration',
      'Cloud deployment',
      'Scalable AI infrastructure',
    ],
    technologies: ['Next.js', 'React', 'AWS', 'Azure', 'GCP'],
  },
  {
    icon: Brain,
    title: 'Machine Learning Solutions',
    description: 'Custom ML models and predictive analytics to unlock insights from your data.',
    features: [
      'Custom model development',
      'Predictive analytics',
      'Computer vision solutions',
      'Natural language processing',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Hugging Face'],
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive AI & Data Engineering Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From AI development to data pipelines, we deliver production-ready solutions that drive real business value
          </p>
        </div>

        {/* Services Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform group-hover:scale-110">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Title & Description */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mb-6 text-base leading-7 text-gray-600">{service.description}</p>

              {/* Features List */}
              <ul className="space-y-3 text-sm text-gray-600">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
