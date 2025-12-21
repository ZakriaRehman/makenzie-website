const techCategories = [
  {
    category: 'Languages',
    technologies: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'AI & ML',
    technologies: ['OpenAI', 'Anthropic Claude', 'LangChain', 'LlamaIndex', 'Hugging Face'],
  },
  {
    category: 'Databases & Vector Stores',
    technologies: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Qdrant', 'Pinecone', 'Elasticsearch'],
  },
  {
    category: 'Frameworks',
    technologies: ['FastAPI', 'Flask', 'Django', 'Next.js', 'React', 'Node.js'],
  },
  {
    category: 'Cloud & Infrastructure',
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Vercel'],
  },
  {
    category: 'Healthcare Standards',
    technologies: ['HL7', 'FHIR', 'HIPAA Compliance'],
  },
]

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Tech Stack</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Modern Technologies We Work With
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We leverage the latest and most reliable technologies to build robust, scalable solutions
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category) => (
            <div key={category.category} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
          <p className="text-base text-gray-600">
            Don't see a technology you need?{' '}
            <a href="#contact" className="font-semibold text-slate-900 hover:text-slate-800">
              Let's discuss your requirements →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
