import { Calendar, Mail, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's Build Something Great Together
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Schedule a free consultation to discuss your project. No obligation, no sales pressure — just a genuine conversation about how we can help you succeed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://calendly.com/makenzie"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Calendar className="h-5 w-5" />
              Schedule Free Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@makenzie.co"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>

          {/* Contact Details */}
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-700 pt-8 text-sm text-gray-400 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@makenzie.co" className="hover:text-white">
                hello@makenzie.co
              </a>
            </div>
            <div className="hidden h-4 w-px bg-gray-700 sm:block" />
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+923160557117" className="hover:text-white">
                +92 316 0557117
              </a>
            </div>
          </div>

          {/* Reassurance */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
            <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free consultation • No obligation • Fast response time</span>
          </div>
        </div>
      </div>
    </section>
  )
}
