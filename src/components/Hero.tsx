import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-slate-200 opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-slate-300 opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">AI & Data Engineering Experts</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Build AI Solutions That <span className="text-slate-900">Actually Work</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            Production-ready AI systems and data pipelines for modern businesses. From concept to deployment, we deliver solutions that scale.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              View Services
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <div className="mt-1 text-sm text-slate-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="mt-1 text-sm text-slate-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">50%</div>
              <div className="mt-1 text-sm text-slate-600">Cost Savings</div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-slate-900" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-slate-900" />
              <span className="font-medium">Production-Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-slate-900" />
              <span className="font-medium">Fast Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
