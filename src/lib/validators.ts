import { z } from 'zod'

/**
 * Booking Form Validation Schema
 * Uses Zod for type-safe form validation (compatible with Zod v4)
 */
export const bookingFormSchema = z.object({
  service: z.enum(['safari', 'academy', 'private', 'event']),
  name: z
    .string()
    .min(2, { message: 'validation.name.tooShort' })
    .max(50, { message: 'validation.name.tooLong' })
    .trim(),
  email: z
    .string()
    .min(1, { message: 'validation.email.required' })
    .email({ message: 'validation.email.invalid' })
    .trim()
    .toLowerCase()
    .refine((email) => {
      // Additional validation: check for common typos in domain
      const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
      const domain = email.split('@')[1]
      return domain ? commonDomains.includes(domain) || domain.length > 3 : true
    }, { message: 'validation.email.invalid' }),
  phone: z
    .string()
    .min(10, { message: 'validation.phone.tooShort' })
    .max(20, { message: 'validation.phone.tooLong' })
    .regex(/^\+?[\d\s\-()]+$/, { message: 'validation.phone.invalid' })
    .trim(),
  experienceLevel: z.enum(['beginner', 'novice', 'intermediate', 'advanced']),
  groupSize: z
    .string()
    .regex(/^\d+$/, { message: 'validation.groupSize.invalid' })
    .refine((val) => {
      const num = parseInt(val, 10)
      return num >= 1 && num <= 50
    }, { message: 'validation.groupSize.range' }),
  specialRequests: z
    .string()
    .max(500, { message: 'validation.specialRequests.tooLong' })
    .optional(),
  date: z
    .date()
    .optional(),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'validation.time.invalid',
    })
    .optional(),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'validation.name.tooShort' })
    .max(50, { message: 'validation.name.tooLong' })
    .trim(),
  email: z
    .string()
    .email({ message: 'validation.email.invalid' })
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, { message: 'validation.phone.tooShort' })
    .regex(/^\+?[\d\s\-()]+$/, { message: 'validation.phone.invalid' })
    .trim()
    .optional(),
  subject: z
    .string()
    .min(3, { message: 'validation.subject.tooShort' })
    .max(100, { message: 'validation.subject.tooLong' })
    .trim(),
  message: z
    .string()
    .min(10, { message: 'validation.message.tooShort' })
    .max(2000, { message: 'validation.message.tooLong' })
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Newsletter Subscription Schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: 'validation.email.invalid' })
    .trim()
    .toLowerCase(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

/**
 * Step-by-step validation for multi-step booking form
 */
export const validateBookingStep = (
  step: number,
  data: Partial<BookingFormData>
): { valid: boolean; errors: Partial<Record<keyof BookingFormData, string>> } => {
  const errors: Partial<Record<keyof BookingFormData, string>> = {}

  if (step === 1) {
    // Validate service selection
    const serviceResult = bookingFormSchema.shape.service.safeParse(data.service)
    if (!serviceResult.success) {
      errors.service = serviceResult.error.issues[0]?.message || 'validation.service.required'
    }
  }

  if (step === 2) {
    // Validate personal details
    const nameResult = bookingFormSchema.shape.name.safeParse(data.name)
    if (!nameResult.success) {
      const issue = nameResult.error.issues[0]
      if (issue?.code === 'too_small') {
        errors.name = 'validation.name.required'
      } else {
        errors.name = issue?.message || 'validation.name.invalid'
      }
    }

    const emailResult = bookingFormSchema.shape.email.safeParse(data.email)
    if (!emailResult.success) {
      const issue = emailResult.error.issues[0]
      if (issue?.code === 'too_small') {
        errors.email = 'validation.email.required'
      } else {
        errors.email = issue?.message || 'validation.email.invalid'
      }
    }

    const phoneResult = bookingFormSchema.shape.phone.safeParse(data.phone)
    if (!phoneResult.success) {
      const issue = phoneResult.error.issues[0]
      if (issue?.code === 'too_small') {
        errors.phone = 'validation.phone.required'
      } else {
        errors.phone = issue?.message || 'validation.phone.invalid'
      }
    }

    // Experience level and group size
    const experienceResult = bookingFormSchema.shape.experienceLevel.safeParse(data.experienceLevel)
    if (!experienceResult.success) {
      errors.experienceLevel = 'validation.experienceLevel.required'
    }

    const groupSizeResult = bookingFormSchema.shape.groupSize.safeParse(data.groupSize)
    if (!groupSizeResult.success) {
      errors.groupSize = 'validation.groupSize.required'
    }
  }

  if (step === 3) {
    // Validate date and time
    if (!data.date) {
      errors.date = 'validation.date.required'
    }

    if (!data.time) {
      errors.time = 'validation.time.required'
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitize email input (allow only valid email characters)
 */
export const sanitizeEmail = (email: string): string => {
  return email.replace(/[^\w@.-]/gi, '')
}

/**
 * Sanitize phone input (allow only digits, plus, spaces, dashes, parentheses)
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d\s()+.-]/gi, '')
}
