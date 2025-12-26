export interface ContactFormData {
  name: string
  email: string
  phone: string
  city: string
  company: string
  title: string
  message?: string
}

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
}

export interface ContactModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
