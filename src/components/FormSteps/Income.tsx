import React, { useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  GridColumn,
  GridRow,
  Icon,
  Input,
  Stack,
  Tag,
  Text,
  Tooltip,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { IncomeItem } from '@/lib/types'
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
      const storedTaxData = localStorage.getItem('taxData')

      if (storedTaxData) {
        const taxData = JSON.parse(storedTaxData)
        if (
          taxData.incomes &&
          Array.isArray(taxData.incomes) &&
          !data.incomes
        ) {
          const event = {
            target: {
              name: 'incomes',
              value: taxData.incomes,
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>
          onChange(event)
          return
        }
      }
    } catch (error) {
      console.error('Error loading income data:', error)
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

  const updateTaxData = (updatedIncome: IncomeItem[]) => {
    const storedTaxData = localStorage.getItem('taxData')
    const taxData = storedTaxData ? JSON.parse(storedTaxData) : {}
    taxData.incomes = updatedIncome
    localStorage.setItem('taxData', JSON.stringify(taxData))
  }

  const handleIncomeChange = (id: number, amount: string) => {
    const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10)
    const updatedIncome = incomeData.map(item =>
      item.id === id ? { ...item, amount: numericAmount } : item
    )

    const event = {
      target: {
        name: 'incomes',
        value: updatedIncome,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(event)

    updateTaxData(updatedIncome)
  }

  const handleWageChange = (id: number, payer: string) => {
    const updatedIncome = incomeData.map(item =>
      item.id === id ? { ...item, payer } : item
    )

    const event = {
      target: {
        name: 'incomes',
        value: updatedIncome,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(event)

    updateTaxData(updatedIncome)
  }

  const addWageItem = () => {
    const maxId = incomeData.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    )
    const newId = maxId + 1

    const newWageItem: IncomeItem = {
      id: newId,
      type: 'Wages',
      payer: '',
      amount: 0,
      explanation: 'Manually added',
      currency: 'ISK',
      submissionId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedIncome = [...incomeData, newWageItem]

    const event = {
      target: {
        name: 'incomes',
        value: updatedIncome,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(event)

    updateTaxData(updatedIncome)
  }

  const deleteIncomeItem = (id: number) => {
    const updatedIncome = incomeData.filter(item => item.id !== id)

    const event = {
      target: {
        name: 'incomes',
        value: updatedIncome,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(event)

    updateTaxData(updatedIncome)
  }

  return (
    <Box>
      <Box marginRight={1} marginBottom={2}>
        <Text variant="h2" as="h2">
          Tekjur ársins 2024
        </Text>
      </Box>
      <Text marginBottom={5}>
        Heildartekjur þínar hjá vinnuveitendum áður en tekið er tillit til
        greiddra skatta í staðgreiðslu og iðngjalds í lífeyrissjóð.
      </Text>

      <Stack space={7}>
        {/* Wages Section */}
        <Box>
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3" as="h3">
                Launatengdargreiðslur
              </Text>
            </Box>
            <Tag>3.1</Tag>
          </Box>
          <Text marginBottom={3}>
            Heildartekjur þínar hjá vinnuveitendum áður en tekið er tillit til
            greiddra skatta í staðgreiðslu og iðngjalds í lífeyrissjóð.
          </Text>
          {groupedIncome.Wages.map((item, index) => {
            const isManuallyAdded = item.explanation === 'Manually added'

            return (
              <Box key={`wages-${item.id || index}`}>
                {isManuallyAdded && (
                  <GridRow marginBottom={1}>
                    <GridColumn span="12/12">
                      <Box
                        display="flex"
                        justifyContent="flexEnd"
                        marginBottom={2}
                      >
                        <Button
                          variant="text"
                          onClick={() => deleteIncomeItem(item.id)}
                          title="Eyða tekjulið"
                          colorScheme="destructive"
                          size="small"
                        >
                          Eyða tekjulið
                          <Box marginLeft={1} display="inlineBlock">
                            <Icon icon="trash" size="small" />
                          </Box>
                        </Button>
                      </Box>
                    </GridColumn>
                  </GridRow>
                )}
                <GridRow>
                  <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                    <Input
                      name={`wages-${item.id || index}-payer`}
                      label="Heiti fyrirtækis"
                      value={item.payer || ''}
                      onChange={
                        isManuallyAdded
                          ? e => handleWageChange(item.id, e.target.value)
                          : () => {}
                      }
                      type="text"
                      backgroundColor={isManuallyAdded ? 'blue' : undefined}
                      readOnly={!isManuallyAdded}
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
              </Box>
            )
          })}
          <GridRow marginBottom={3}>
            <GridColumn span={['12/12', '12/12']}>
              <Button variant="text" size="small" onClick={addWageItem}>
                Bæta við tekjulið
                <Box marginLeft={1} display="inlineBlock">
                  <Icon icon="add" size="small" />
                </Box>
              </Button>
            </GridColumn>
          </GridRow>
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
              <Text variant="h3" as="h3">
                Starfstengd hlunnindi
              </Text>
            </Box>
            <Tag>3.2</Tag>
          </Box>
          <Text marginBottom={3}>
            Hér er t.d. átt við um fatnað, fæði, húsnæði, hvers konar fríðindi,
            greiðslur í vörum eða afurðum, svo og framlög og gjafir sé verðmætið
            hærra en almennt gerist um tækifærisgjafir.
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
          <GridRow marginBottom={3}>
            <GridColumn span={['12/12', '12/12']}>
              <Button variant="text" size="small">
                Bæta við tekjulið
                <Box marginLeft={1} display="inlineBlock">
                  <Tooltip text="Bídd'aeins, við erum að vinna í 'essu." />
                </Box>
              </Button>
            </GridColumn>
          </GridRow>
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
              <Text variant="h3" as="h3">
                Aðrar tekjur
              </Text>
            </Box>
            <Tag>3.3</Tag>
          </Box>
          <Text marginBottom={3}>
            Lífeyrisgreiðslur, greiðslur frá Tryggingastofnun ríkisins, aðrar
            bótagreiðslur og styrkir teljast til skattskyldra tekna.
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
          <GridRow marginBottom={3}>
            <GridColumn span={['12/12', '12/12']}>
              <Button variant="text" size="small">
                Bæta við tekjulið
                <Box marginLeft={1} display="inlineBlock">
                  <Tooltip text="Bídd'aeins, við erum að vinna í 'essu." />
                </Box>
              </Button>
            </GridColumn>
          </GridRow>
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
          <Text variant="h3" as="h3" marginBottom={2}>
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
