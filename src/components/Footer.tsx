'use client'

import { MapPin, Mail, Phone, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950">
      {/* Gradient Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-400" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold transition-colors hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-400 hover:to-accent-cyan-400">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                Makenzie
              </span>
            </h3>
            <p className="mt-4 max-w-md text-base text-gray-400">
              Healthcare AI & Data Engineering Solutions. We build HIPAA-compliant systems that improve clinical workflows and patient outcomes.
            </p>
            <div className="mt-6 flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/mcanzie/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-400/10 text-gray-400 transition-all hover:bg-accent-400 hover:text-white hover:shadow-glow-sm"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://x.com/Makenzie33638"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-400/10 text-gray-400 transition-all hover:bg-accent-400 hover:text-white hover:shadow-glow-sm"
              >
                <span className="sr-only">X</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-primary-400">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400" />
                <span>NASTP Delta, Lahore Cantt, Pakistan</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400" />
                <a href="tel:+923160557117" className="transition-colors hover:text-primary-400">
                  +92 316 0557117
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400" />
                <a href="mailto:info@makenzie.co" className="transition-colors hover:text-primary-400">
                  info@makenzie.co
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 transition-colors hover:text-primary-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-primary-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-400 transition-colors hover:text-primary-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Makenzie. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400">
              <a href="/privacy" className="transition-colors hover:text-primary-400">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="/terms" className="transition-colors hover:text-primary-400">
                Terms of Use
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
