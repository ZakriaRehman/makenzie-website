import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Makenzie - AI & Data Engineering Solutions',
  description: 'We build custom AI systems and data pipelines that scale - from concept to production. Specialized in AI/ML, healthcare tech, and data engineering.',
  keywords: ['AI development', 'data engineering', 'machine learning', 'healthcare AI', 'HIPAA compliant', 'LLM integration', 'RAG systems', 'data pipelines'],
  authors: [{ name: 'Makenzie' }],
  openGraph: {
    title: 'Makenzie - AI & Data Engineering Solutions',
    description: 'We build custom AI systems and data pipelines that scale - from concept to production.',
    url: 'https://makenzie.co',
    siteName: 'Makenzie',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makenzie - AI & Data Engineering Solutions',
    description: 'We build custom AI systems and data pipelines that scale - from concept to production.',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
