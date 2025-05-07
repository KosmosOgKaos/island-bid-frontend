import { Person } from '@/lib/types'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phone: string): boolean => {
  return isValidPhoneNumber(phone, 'IS') || isValidPhoneNumber(phone)
}
interface FormData {
  consent?: boolean
  person?: Person
  [key: string]: unknown
}

export function validateDataCollectionStep(formData: FormData): {
  isValid: boolean
  errorMessage?: string
} {
  if (!formData.consent) {
    return {
      isValid: false,
      errorMessage: 'Vinsamlegast samþykktu að gögn verði sótt rafrænt.',
    }
  }

  return { isValid: true }
}

export function validateInformationStep(formData: FormData): {
  isValid: boolean
  errorMessage?: string
} {
  const person = (formData.person as Person) || {}
  const email = person.email || ''
  const telephone = person.telephone || ''

  // Validate email
  if (!email || !validateEmail(email)) {
    return {
      isValid: false,
      errorMessage: 'Vinsamlegast sláðu inn gilt netfang.',
    }
  }

  // Validate phone number
  if (!telephone || !validatePhoneNumber(telephone)) {
    return {
      isValid: false,
      errorMessage: 'Vinsamlegast sláðu inn gilt símanúmer.',
    }
  }

  return { isValid: true }
}

export function validateStep(
  stepId: string,
  formData: FormData
): {
  isValid: boolean
  errorMessage?: string
} {
  switch (stepId) {
    case 'dataCollection':
      return validateDataCollectionStep(formData)
    case 'information':
      return validateInformationStep(formData)
    default:
      return { isValid: true }
  }
}
