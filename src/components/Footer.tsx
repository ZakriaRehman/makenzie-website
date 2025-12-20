import { MapPin, Mail, Phone, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white">Makenzie</h3>
            <p className="mt-4 max-w-md text-base text-gray-400">
              AI & Data Engineering Solutions for Modern Businesses. We build production-ready AI systems and data pipelines that scale.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.linkedin.com/in/maria-makenzie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">LinkedIn - Maria</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/zakria-makenzie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">LinkedIn - Zakria</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <span>NASTP Delta, Lahore Cantt, Pakistan</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <a href="tel:+923160557117" className="hover:text-white">
                  +92 316 0557117
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:hello@makenzie.co" className="hover:text-white">
                    hello@makenzie.co
                  </a>
                  <a href="mailto:maria@makenzie.co" className="hover:text-white">
                    maria@makenzie.co
                  </a>
                  <a href="mailto:zakria@makenzie.co" className="hover:text-white">
                    zakria@makenzie.co
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#services" className="text-sm text-gray-400 hover:text-white">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} Makenzie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
