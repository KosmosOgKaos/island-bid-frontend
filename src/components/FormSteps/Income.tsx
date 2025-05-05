import React, { useEffect } from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount, calculateTotal } from '@/utils/numberUtils'
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput'

// Define specific types for each income category
type EmploymentItem = {
  companyName: string
  amount: string
}

type BenefitItem = {
  name: string
  amount: string
}

type OtherIncomeItem = {
  provider: string
  description: string
  amount: string
}

interface IncomeData {
  employment: {
    items: EmploymentItem[]
    total: string
  }
  benefits: {
    items: BenefitItem[]
    total: string
  }
  other: {
    items: OtherIncomeItem[]
    total: string
  }
  grandTotal?: string
}

interface FormProps {
  data: {
    income?: IncomeData
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

// Default income data with Icelandic number formatting
const defaultIncomeData: IncomeData = {
  employment: {
    items: [
      { companyName: 'Norðurljós Software', amount: '9.360.000 kr.' },
      { companyName: 'Mús & merki ehf.', amount: '900.000 kr.' },
    ],
    total: '10.260.000 kr.',
  },
  benefits: {
    items: [{ name: 'Dagpeningar', amount: '120.000 kr.' }],
    total: '120.000 kr.',
  },
  other: {
    items: [
      {
        provider: 'Norðurljós Software ehf.',
        description: 'íþróttastyrkur',
        amount: '75.000 kr.',
      },
      {
        provider: 'VR',
        description: 'Starfsmenntastyrkur',
        amount: '130.000 kr.',
      },
    ],
    total: '205.000 kr.',
  },
}

export const Income = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  useEffect(() => {
    if (!data.income) {
      const event = {
        target: {
          name: 'income',
          value: defaultIncomeData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }, [data.income, onChange])

  const incomeData = data.income || defaultIncomeData

  const handleIncomeChange = (
    category: keyof IncomeData,
    index: number,
    field: string,
    value: string
  ) => {
    const updatedIncome = JSON.parse(JSON.stringify(incomeData)) as IncomeData

    // Update the specified field based on category type
    if (category === 'employment') {
      updatedIncome.employment.items[index].amount = value
      updatedIncome.employment.total = formatIcelandicAmount(
        calculateTotal(updatedIncome.employment.items)
      )
    } else if (category === 'benefits') {
      updatedIncome.benefits.items[index].amount = value
      updatedIncome.benefits.total = formatIcelandicAmount(
        calculateTotal(updatedIncome.benefits.items)
      )
    } else if (category === 'other') {
      updatedIncome.other.items[index][field as keyof OtherIncomeItem] = value
      updatedIncome.other.total = formatIcelandicAmount(
        calculateTotal(updatedIncome.other.items)
      )
    }

    const employmentTotal = calculateTotal(updatedIncome.employment.items)
    const benefitsTotal = calculateTotal(updatedIncome.benefits.items)
    const otherTotal = calculateTotal(updatedIncome.other.items)
    const grandTotal = employmentTotal + benefitsTotal + otherTotal
    updatedIncome.grandTotal = formatIcelandicAmount(grandTotal)

    const event = {
      target: {
        name: 'income',
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
        <Box>
          <Text variant="h3">
            3.1 - Tekjur
          </Text>
          <Text marginBottom={3}>
            Launtekjur og starfstengdar greiðslur
          </Text>
          {incomeData.employment.items.map((item, index) => (
            <GridRow key={`employment-${index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`employment-${index}-companyName`}
                  label="Heiti fyrirtækis"
                  value={item.companyName}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`employment-${index}-amount`}
                  label="Launafjárhæð"
                  value={item.amount}
                  onChange={value =>
                    handleIncomeChange('employment', index, 'amount', value)
                  }
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          ))}
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="employment-total"
                label="Samtals"
                value={incomeData.employment.total}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        <Box>
          <Text variant="h3">
            3.2 - Tekjur
          </Text>
          <Text marginBottom={3}>
            Ökutækjastyrkur, dagpeningar og hlunnindi
          </Text>
          {incomeData.benefits.items.map((item, index) => (
            <GridRow key={`benefits-${index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`benefits-${index}-name`}
                  label="Heiti tekjuliðs"
                  value={item.name}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`benefits-${index}-amount`}
                  label="Launafjárhæð"
                  value={item.amount}
                  onChange={value =>
                    handleIncomeChange('benefits', index, 'amount', value)
                  }
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          ))}
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="benefits-total"
                label="Dagpeningafjárhæð"
                value={incomeData.benefits.total}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        <Box>
          <Text variant="h3">
            3.3 - Tekjur
          </Text>
          <Text marginBottom={3}>
            Lífeyrisgreiðslur, greiðslur frá Tryggingastofnun, aðrar
            bótagreiðslur, styrkir o.fl.
          </Text>
          {incomeData.other.items.map((item, index) => (
            <GridRow key={`other-${index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`other-${index}-provider`}
                  label="Styrk veitandi"
                  value={item.provider}
                  onChange={() => {}}
                  type="text"
                  readOnly
                />
              </GridColumn>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <CurrencyInput
                  name={`other-${index}-amount`}
                  label={item.description}
                  value={item.amount}
                  onChange={value =>
                    handleIncomeChange('other', index, 'amount', value)
                  }
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
                value={incomeData.other.total}
                onChange={() => {}}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>
        <Box>
          <Text variant="h3" marginBottom={3}>
            Heildartekjur ársins
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '12/12']}>
              <Input
                name="income-grand-total"
                label="Samtals"
                value={
                  incomeData.grandTotal ||
                  formatIcelandicAmount(
                    calculateTotal(incomeData.employment.items) +
                      calculateTotal(incomeData.benefits.items) +
                      calculateTotal(incomeData.other.items)
                  )
                }
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
