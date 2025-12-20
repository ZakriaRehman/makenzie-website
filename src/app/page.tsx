import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import TechStack from '@/components/TechStack'
import Process from '@/components/Process'
import Industries from '@/components/Industries'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <WhyChooseUs />
        <TechStack />
        <Process />
        <Industries />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
