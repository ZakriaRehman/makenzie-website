import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import FloatingChatButton from '@/components/FloatingChatButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Makenzie - Healthcare AI & Data Engineering Solutions',
  description: 'HIPAA-compliant AI systems and data pipelines built specifically for healthcare. Clinical documentation automation, EHR integration, and healthcare data solutions for hospitals, clinics, and health tech companies.',
  keywords: ['healthcare AI', 'HIPAA compliant software', 'EHR integration', 'clinical documentation automation', 'HL7 FHIR', 'healthcare data engineering', 'medical practice automation', 'healthcare IT solutions', 'Epic integration', 'Cerner integration', 'telehealth platforms', 'patient portal development'],
  authors: [{ name: 'Makenzie' }],
  icons: {
    icon: '/favicon_no_bg.svg',
    shortcut: '/favicon_no_bg.svg',
    apple: '/favicon_no_bg.svg',
  },
  openGraph: {
    title: 'Makenzie - Healthcare AI & Data Engineering Solutions',
    description: 'HIPAA-compliant AI systems and data pipelines built specifically for healthcare organizations. Transform clinical workflows and improve patient outcomes.',
    url: 'https://makenzie.co',
    siteName: 'Makenzie',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makenzie - Healthcare AI & Data Engineering Solutions',
    description: 'HIPAA-compliant AI systems and data pipelines built specifically for healthcare organizations. Transform clinical workflows and improve patient outcomes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        {children}
        <FloatingChatButton />
      </body>
    </html>
  )
}
