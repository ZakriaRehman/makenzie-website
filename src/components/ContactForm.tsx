'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { contactFormSchema, type ContactFormInput } from '@/lib/validations'
import type { ContactFormResponse } from '@/types/contact'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema)
  })

  const messageValue = watch('message') || ''
  const messageLength = messageValue.length

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result: ContactFormResponse = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()

        // Call onSuccess callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 2000)
        }
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Unable to connect. Please check your internet connection.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="rounded-lg bg-emerald-50 p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-emerald-900">Thank you for reaching out!</h3>
            <p className="text-sm text-emerald-700 mt-1">
              We have received your message and will be in touch soon.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-red-900">Submission failed</h3>
            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="John Doe"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register('city')}
            type="text"
            id="city"
            placeholder="Lahore"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="john@company.com"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+92 300 1234567"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">e.g. +92 300 1234567</p>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            placeholder="Your Company Inc."
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        {/* Title/Role */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Your title/role <span className="text-red-500">*</span>
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="CEO, Product Manager, etc."
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
          Please tell us a bit about what you're looking for
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          placeholder="Tell us about your project, goals, or any questions you have..."
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
        />
        <div className="mt-1 flex justify-between">
          <div>
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>
          <p className="text-xs text-gray-500">{messageLength}/1000 characters</p>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle className="h-5 w-5" />
              Message Sent!
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  )
}
