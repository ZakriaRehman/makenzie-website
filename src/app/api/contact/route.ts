import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/email'
import type { ContactFormResponse } from '@/types/contact'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate form data
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: 'Invalid form data. Please check your inputs.'
        },
        { status: 400 }
      )
    }

    const formData = validationResult.data

    // Check if Resend API key is configured
    const hasValidApiKey = process.env.RESEND_API_KEY &&
                           process.env.RESEND_API_KEY !== 'your_resend_api_key_here'

    if (hasValidApiKey) {
      // Send email using Resend
      await sendContactEmail(formData)
    } else {
      // TESTING MODE: Log form data instead of sending email
      console.log('=== CONTACT FORM SUBMISSION (Testing Mode) ===')
      console.log('Name:', formData.name)
      console.log('Email:', formData.email)
      console.log('Phone:', formData.phone)
      console.log('City:', formData.city)
      console.log('Company:', formData.company)
      console.log('Title:', formData.title)
      console.log('Message:', formData.message || 'No message provided')
      console.log('===========================================')
      console.log('NOTE: To send real emails, configure RESEND_API_KEY in .env.local')
    }

    // Return success response
    return NextResponse.json<ContactFormResponse>(
      {
        success: true,
        message: 'Thank you! We have received your message and will be in touch soon.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form API error:', error)

    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        error: 'An error occurred while processing your request. Please try again later.'
      },
      { status: 500 }
    )
  }
}
