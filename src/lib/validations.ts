import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z.string()
    .email("Please enter a valid email address"),

  phone: z.string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),

  city: z.string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),

  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),

  message: z.string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
