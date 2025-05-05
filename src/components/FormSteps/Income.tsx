import React, { useEffect, useMemo } from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput'
interface FormProps {
  data: {
    incomes?: IncomeItem[]
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}
interface IncomeItem {
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

const defaultIncomeData: IncomeItem[] = [
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
    payer: null,
    amount: 120000,
    currency: 'ISK',
    explanation: 'Dagpeningar',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 4,
    type: 'Other',
    payer: 'Norðurljós Software ehf',
    amount: 75000,
    currency: 'ISK',
    explanation: 'Íþróttastyrkur',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
  {
    id: 5,
    type: 'Other',
    payer: 'VR',
    amount: 130000,
    currency: 'ISK',
    explanation: 'Starfsmenntastyrkur',
    submissionId: 3,
    createdAt: '2025-05-05T18:22:03.514Z',
    updatedAt: '2025-05-05T18:22:03.514Z',
  },
]

export const Income = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  useEffect(() => {
    if (!data.incomes) {
      const event = {
        target: {
          name: 'incomes',
          value: defaultIncomeData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }, [data.incomes, onChange])

  const incomeData = data.incomes || defaultIncomeData

  const groupedIncome = useMemo(() => {
    const grouped = {
      Wages: [] as IncomeItem[],
      Benefits: [] as IncomeItem[],
      Other: [] as IncomeItem[],
    }

    incomeData.forEach(income => {
      if (income.type in grouped) {
        grouped[income.type as keyof typeof grouped].push(income)
      } else {
        grouped.Other.push(income)
      }
    })

    return grouped
  }, [incomeData])

  const totals = useMemo(() => {
    const calcTotal = (items: IncomeItem[]) =>
      items.reduce((sum, item) => sum + item.amount, 0)

    return {
      Wages: calcTotal(groupedIncome.Wages),
      Benefits: calcTotal(groupedIncome.Benefits),
      Other: calcTotal(groupedIncome.Other),
      grandTotal: calcTotal(incomeData),
    }
  }, [groupedIncome, incomeData])

  const handleIncomeChange = (id: number, amount: string) => {
    // Convert formatted amount to number
    const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10)

    // Create a deep copy of the current income data
    const updatedIncome = incomeData.map(item =>
      item.id === id ? { ...item, amount: numericAmount } : item
    )

    // Update the form data
    const event = {
      target: {
        name: 'incomes',
        value: updatedIncome,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(event)
  }

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Tekjur ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út tekjurnar þínar. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Cumque optio necessitatibus omnis.
      </Text>

      <Stack space={5}>
        {/* Wages Section */}
        <Box>
          <Text variant="h3">3.1 - Tekjur</Text>
          <Text marginBottom={3}>Launtekjur og starfstengdar greiðslur</Text>
          {groupedIncome.Wages.map(item => (
            <GridRow key={`wages-${item.id}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`wages-${item.id}-payer`}
                  label="Heiti fyrirtækis"
                  value={item.payer || ''}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`wages-${item.id}-amount`}
                  label="Launafjárhæð"
                  value={formatIcelandicAmount(item.amount)}
                  onChange={value => handleIncomeChange(item.id, value)}
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          ))}
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="wages-total"
                label="Samtals"
                value={formatIcelandicAmount(totals.Wages)}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        {/* Benefits Section */}
        <Box>
          <Text variant="h3">3.2 - Tekjur</Text>
          <Text marginBottom={3}>
            Ökutækjastyrkur, dagpeningar og hlunnindi
          </Text>
          {groupedIncome.Benefits.map(item => (
            <GridRow key={`benefits-${item.id}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`benefits-${item.id}-explanation`}
                  label="Heiti tekjuliðs"
                  value={item.explanation || ''}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`benefits-${item.id}-amount`}
                  label="Launafjárhæð"
                  value={formatIcelandicAmount(item.amount)}
                  onChange={value => handleIncomeChange(item.id, value)}
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          ))}
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="benefits-total"
                label="Samtals"
                value={formatIcelandicAmount(totals.Benefits)}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        {/* Other Income Section */}
        <Box>
          <Text variant="h3">3.3 - Tekjur</Text>
          <Text marginBottom={3}>
            Lífeyrisgreiðslur, greiðslur frá Tryggingastofnun, aðrar
            bótagreiðslur, styrkir o.fl.
          </Text>
          {groupedIncome.Other.map(item => (
            <GridRow key={`other-${item.id}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`other-${item.id}-payer`}
                  label="Styrk veitandi"
                  value={item.payer || ''}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`other-${item.id}-amount`}
                  label={item.explanation || ''}
                  value={formatIcelandicAmount(item.amount)}
                  onChange={value => handleIncomeChange(item.id, value)}
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          ))}
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="other-total"
                label="Samtals"
                value={formatIcelandicAmount(totals.Other)}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        {/* Grand Total Section */}
        <Box>
          <Text variant="h3" marginBottom={3}>
            Heildartekjur ársins
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '12/12']}>
              <Input
                name="income-grand-total"
                label="Samtals"
                value={formatIcelandicAmount(totals.grandTotal)}
                type="text"
                readOnly
                backgroundColor="blue"
              />
            </GridColumn>
          </GridRow>
        </Box>
      </Stack>
    </Box>
  )
}
