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

export const defaultIncomeData: IncomeItem[] = [
  {
    id: 1,
    type: 'Wages',
    payer: 'Norðurljós Software ehf',
    amount: 9360000,
    currency: 'ISK',
    explanation: null,
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 2,
    type: 'Wages',
    payer: 'Mús & Merki ehf.',
    amount: 900000,
    currency: 'ISK',
    explanation: null,
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 3,
    type: 'Benefits',
    payer: 'Norðurljós Software ehf',
    amount: 240000,
    currency: 'ISK',
    explanation: 'Dagpeningar',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 4,
    type: 'Benefits',
    payer: 'Norðurljós Software ehf',
    amount: 600000,
    currency: 'ISK',
    explanation: 'Ökutækjastyrkur',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 5,
    type: 'Other',
    payer: 'Lífeyrissjóður verslunarfólks',
    amount: 120000,
    currency: 'ISK',
    explanation: 'Séreignarsparnaður',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 6,
    type: 'Other',
    payer: 'Tryggingastofnun ríkisins',
    amount: 80000,
    currency: 'ISK',
    explanation: 'Fæðingarstyrkur',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
]
