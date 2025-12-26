'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full border-b border-primary-100/20 glass"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <Image
              src="/Makenzie_Wordmark_no_bg.svg"
              alt="Makenzie"
              width={240}
              height={60}
              priority
              className="h-10 w-auto transition-opacity hover:opacity-80 lg:h-14"
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-accent-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          <a href="#services" className="relative text-sm font-medium text-gray-700 transition-colors hover:text-accent-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-400 after:transition-all after:duration-300 hover:after:w-full">
            Services
          </a>
          <a href="#process" className="relative text-sm font-medium text-gray-700 transition-colors hover:text-accent-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-400 after:transition-all after:duration-300 hover:after:w-full">
            Process
          </a>
          <a href="#industries" className="relative text-sm font-medium text-gray-700 transition-colors hover:text-accent-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-400 after:transition-all after:duration-300 hover:after:w-full">
            Industries
          </a>
          <a href="#contact" className="relative text-sm font-medium text-gray-700 transition-colors hover:text-accent-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-400 after:transition-all after:duration-300 hover:after:w-full">
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#contact"
            className="rounded-lg bg-accent-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden"
        >
          <div className="space-y-2 px-6 pb-6 pt-2">
            <a
              href="#services"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:bg-accent-50 hover:text-accent-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#process"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:bg-accent-50 hover:text-accent-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#industries"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:bg-accent-50 hover:text-accent-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Industries
            </a>
            <a
              href="#contact"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:bg-accent-50 hover:text-accent-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="-mx-3 block rounded-lg bg-accent-400 px-3 py-2.5 text-base font-semibold text-white shadow-lg shadow-accent-400/30 transition-all duration-300 hover:scale-105 hover:bg-accent-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
