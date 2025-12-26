'use client'

import { useEffect, useState } from 'react'
import { PopupModal } from 'react-calendly'
import { CALENDLY_URL } from '@/config/calendly'

interface CalendlyWidgetProps {
  isOpen: boolean
  onClose: () => void
  url?: string
}

export default function CalendlyWidget({
  isOpen,
  onClose,
  url = CALENDLY_URL
}: CalendlyWidgetProps) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Set root element only on client-side
    setRootElement(document.body)
  }, [])

  if (!isOpen || !rootElement) return null

  return (
    <PopupModal
      url={url}
      onModalClose={onClose}
      open={isOpen}
      rootElement={rootElement}
    />
  )
}
