import { Resend } from 'resend'
import type { ContactFormData } from '@/types/contact'

// Lazy initialization to avoid build-time errors when env var is missing
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0f172a; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-family: 'Times New Roman', Georgia, serif;">Makenzie</h1>
          <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>

        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #475569; margin-bottom: 25px;">You have received a new message from your website contact form:</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b; width: 140px;">Name:</td>
              <td style="padding: 12px 0; color: #475569;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b;">Email:</td>
              <td style="padding: 12px 0; color: #475569;"><a href="mailto:${data.email}" style="color: #0f172a; text-decoration: underline;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b;">Phone:</td>
              <td style="padding: 12px 0; color: #475569;"><a href="tel:${data.phone}" style="color: #0f172a; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b;">City:</td>
              <td style="padding: 12px 0; color: #475569;">${data.city}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b;">Company:</td>
              <td style="padding: 12px 0; color: #475569;">${data.company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #1e293b;">Title/Role:</td>
              <td style="padding: 12px 0; color: #475569;">${data.title}</td>
            </tr>
            ${data.message ? `
            <tr>
              <td colspan="2" style="padding: 20px 0 10px 0; font-weight: 600; color: #1e293b;">Message:</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 0 0 12px 0;">
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; color: #475569; white-space: pre-wrap;">${data.message}</div>
              </td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 14px; color: #64748b; margin: 0;">
              This email was sent from the contact form on <a href="https://makenzie.co" style="color: #0f172a;">makenzie.co</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  try {
    const resend = getResendClient()
    const response = await resend.emails.send({
      from: 'Makenzie Website <noreply@makenzie.co>',
      to: process.env.CONTACT_EMAIL || 'info@makenzie.co',
      replyTo: data.email,
      subject: `New Contact: ${data.name} from ${data.company}`,
      html: generateEmailHTML(data)
    })

    if (response.error) {
      throw new Error(response.error.message)
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}
