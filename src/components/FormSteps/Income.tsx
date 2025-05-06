import React, { useEffect, useMemo } from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Tag,
  Text,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { IncomeItem } from '@/constants/incomeData'
import { CurrencyInput } from '../CurrencyInput'

interface FormProps {
  data: {
    incomes?: IncomeItem[]
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const Income = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  useEffect(() => {
    // Check if we already have data in props
    if (data.incomes && data.incomes.length > 0) {
      return
    }

    try {
      const storedIncomeData = localStorage.getItem('incomeData')
      
      if (storedIncomeData) {
        const incomeData = JSON.parse(storedIncomeData)
        
        if (Array.isArray(incomeData) && !data.incomes) {
          const event = {
            target: {
              name: 'incomes',
              value: incomeData,
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>
          onChange(event)
        }
      }
    } catch {
      // Handle silently
    }
  }, [data.incomes, onChange])

  const incomeData = useMemo(() => data.incomes || [], [data.incomes])

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

      <Stack space={7}>
        {/* Wages Section */}
        <Box>
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3">Launatekjur og starfstengdar greiðslur</Text>
            </Box>
            <Tag>3.1</Tag>
          </Box>
          <Text marginBottom={3}>
            T.d. ákvæðislaun, biðlaun, nefndarlaun, stjórnarlaun, launabætur,
            staðaruppbót, o.fl.
          </Text>
          {groupedIncome.Wages.map((item, index) => (
            <GridRow key={`wages-${item.id || index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`wages-${item.id || index}-payer`}
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
            <GridColumn span={['12/12', '12/12']}>
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
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3">Starfstengd hlunnindi</Text>
            </Box>
            <Tag>3.2</Tag>
          </Box>
          <Text marginBottom={3}>
            T.d. ökutækjastyrkur, dagpeningar og/eða önnur hlunnindi{' '}
          </Text>

          {groupedIncome.Benefits.map((item, index) => (
            <GridRow key={`benefits-${item.id || index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`benefits-${item.id || index}-explanation`}
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
            <GridColumn span={['12/12', '12/12']}>
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
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3">Aðrar tekjur</Text>
            </Box>
            <Tag>3.3</Tag>
          </Box>
          <Text marginBottom={3}>
            T.d. lífeyrisgreiðslur, greiðslur frá Tryggingastofnun, aðrar
            bótagreiðslur, styrkir o.fl.
          </Text>
          {groupedIncome.Other.map((item, index) => (
            <GridRow key={`other-${item.id || index}`}>
              <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                <Input
                  name={`other-${item.id || index}-payer`}
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
            <GridColumn span={['12/12', '12/12']}>
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
          <Text variant="h3" marginBottom={2}>
            Heildartekjur
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '12/12']}>
              <Input
                name="income-grand-total"
                label="Samanlagðar heildartekjur"
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
