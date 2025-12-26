'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import Process from '@/components/Process'
import EngagementModels from '@/components/EngagementModels'
import Industries from '@/components/Industries'
import ContactFormSection from '@/components/ContactFormSection'
import ContactModal from '@/components/ContactModal'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <EngagementModels />
        <Industries />
        <ContactFormSection onOpenModal={() => setIsModalOpen(true)} />
        <CTA />
        <Footer />
      </main>

      {/* Contact Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
