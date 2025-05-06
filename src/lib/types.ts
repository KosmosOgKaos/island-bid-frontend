export interface Person {
  name: string
  kennitala: string
  address: string
  email: string
  telephone: string
  createdAt: string
  updatedAt: string
}

export interface IncomeItem {
  id: number
  type: string
  payer: string | null
  amount: number
  currency: string
  explanation: string | null
  submissionId: number
  createdAt: string
  updatedAt: string
}

export interface PropertyItem {
  id?: number
  type: string
  valueName: string
  value: number
  currency: string
  properties: {
    address?: string
    fastanumer?: string
    yearOfPurchase?: number
    registrationNumber?: string
  }
  submissionId?: number
  createdAt: string
  updatedAt: string
}

export interface DebtItem {
  id?: number
  type: string
  description?: string
  currency: string
  creditor?: string
  creditorKennitala?: string
  loanNumber?: string
  loanStartDate?: string
  loanDurationYears?: number
  yearPaymentTotal?: number
  nominalPaymentTotal?: number
  interestPaymentTotal: number
  remaining: number
  properties?: {
    yearOfPurchase?: number
    domicileLocation?: string
  }
  submissionId?: number
  createdAt: string
  updatedAt: string
}


