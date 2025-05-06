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

export const defaultDebtsData: DebtItem[] = [
  {
    type: "OwnDomicile",
    currency: "ISK",
    creditor: "Íslandsbanki hf.",
    creditorKennitala: "491008-0160",
    loanNumber: "56783900123",
    loanStartDate: "2021-06-15T00:00:00.000Z",
    loanDurationYears: 30,
    yearPaymentTotal: 2280000,
    nominalPaymentTotal: 1360000,
    interestPaymentTotal: 920000,
    remaining: 28540000,
    properties: {
      yearOfPurchase: 2021,
      domicileLocation: "Bláfjallagata 12"
    },
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  },
  {
    description: "Eftirstöðvar á korti númer: 4469 88XX XXXX 4567",
    type: "Other",
    currency: "ISK",
    interestPaymentTotal: 39200,
    remaining: 217000,
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  },
  {
    description: "Aukalán",
    type: "Other",
    currency: "ISK",
    interestPaymentTotal: 86000,
    remaining: 980000,
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  },
  {
    description: "0142-26-732645 Varðan",
    type: "Other",
    currency: "ISK",
    interestPaymentTotal: 14500,
    remaining: 62000,
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  },
  {
    description: "Kílómetragjald, Skatturinn",
    type: "Other",
    currency: "ISK",
    interestPaymentTotal: 0,
    remaining: 2370,
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  },
  {
    description: "Þing- og sveitarsjóðsgjöld, Skatturinn",
    type: "Other",
    currency: "ISK",
    interestPaymentTotal: 224,
    remaining: 0,
    createdAt: "2025-05-06T13:29:13.051Z",
    updatedAt: "2025-05-06T13:29:13.051Z"
  }
]
