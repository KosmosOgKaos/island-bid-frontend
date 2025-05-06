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
import { CurrencyInput } from '@/components/CurrencyInput'
import { DebtItem, defaultDebtsData } from '@/constants/debtsData'

interface FormProps {
  data: {
    debts?: DebtItem[]
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const Debts = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  useEffect(() => {
    if (!data.debts) {
      onChange({
        target: {
          name: 'debts',
          value: defaultDebtsData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }, [data.debts, onChange])

  const debtsData = useMemo(() => data.debts || [], [data.debts])

  const handleDebtValueChange = (
    debt: DebtItem,
    field: keyof DebtItem,
    value: string
  ) => {
    const index = debtsData.findIndex(d => d === debt)
    if (index === -1) return

    const numericValue = parseFloat(value.replace(/\./g, '').replace('kr.', ''))

    const updatedDebts = debtsData.map((d, i) => {
      if (i === index) {
        return {
          ...d,
          [field]: isNaN(numericValue) ? 0 : numericValue,
        }
      }
      return d
    })

    onChange({
      target: {
        name: 'debts',
        value: updatedDebts,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  const groupedDebts = useMemo(() => {
    const grouped = {
      OwnDomicile: [] as DebtItem[],
      Other: [] as DebtItem[],
    }

    debtsData.forEach(debt => {
      if (debt.type === 'OwnDomicile') {
        grouped.OwnDomicile.push(debt)
      } else if (debt.type === 'Other') {
        grouped.Other.push(debt)
      }
    })

    return grouped
  }, [debtsData])

  const totals = useMemo(() => {
    const ownDomicileRemainingTotal = groupedDebts.OwnDomicile.reduce(
      (sum, debt) => sum + debt.remaining,
      0
    )

    const otherRemainingTotal = groupedDebts.Other.reduce(
      (sum, debt) => sum + debt.remaining,
      0
    )

    const interestTotal = debtsData.reduce(
      (sum, debt) => sum + debt.interestPaymentTotal,
      0
    )

    const remainingTotal = ownDomicileRemainingTotal + otherRemainingTotal

    return {
      ownDomicileRemainingTotal,
      otherRemainingTotal,
      interestTotal,
      remainingTotal,
    }
  }, [groupedDebts, debtsData])

  // Helper component for section headers
  const SectionHeader = ({
    title,
    tagNumber,
  }: {
    title: string
    tagNumber: string
  }) => (
    <>
      <Box display="flex">
        <Box marginRight={1}>
          <Text variant="h3">{title}</Text>
        </Box>
        <Tag>{tagNumber}</Tag>
      </Box>
      <Text marginBottom={3}>
        {tagNumber === '5.1'
          ? 'Lán sem tengjast eigin íbúð.'
          : 'Yfirlit yfir aðrar skuldir.'}
      </Text>
    </>
  )

  const ReadOnlyField = ({
    name,
    label,
    value,
  }: {
    name: string
    label: string
    value: string
  }) => <Input name={name} label={label} value={value} type="text" readOnly />

  const EditableCurrencyField = ({
    name,
    label,
    value,
    onChange,
  }: {
    name: string
    label: string
    value: number
    onChange: (value: string) => void
  }) => (
    <CurrencyInput
      name={name}
      label={label}
      value={formatIcelandicAmount(value)}
      onChange={onChange}
      backgroundColor="blue"
    />
  )

  const TotalSection = ({
    name,
    label,
    value,
  }: {
    name: string
    label: string
    value: number
  }) => (
    <Box>
      <GridRow>
        <GridColumn span="12/12">
          <ReadOnlyField
            name={name}
            label={label}
            value={formatIcelandicAmount(value)}
          />
        </GridColumn>
      </GridRow>
    </Box>
  )

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Skuldir og vaxtagjöld 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út skuldir þínar. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Cumque optio necessitatibus omnis.
      </Text>
      <Stack space={7}>
        <Box>
          <SectionHeader title="Íbúðalán" tagNumber="5.1" />

          {groupedDebts.OwnDomicile.map((debt, index) => (
            <Box key={`own-domicile-${index}`}>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-creditor`}
                    label="Nafn lánastofnunar"
                    value={debt.creditor || ''}
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-creditor-kennitala`}
                    label="Kennitala lánastofnunar"
                    value={debt.creditorKennitala || ''}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-loan-number`}
                    label="Lánsnúmer"
                    value={debt.loanNumber || ''}
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-loan-duration`}
                    label="Lánstími í árum"
                    value={debt.loanDurationYears?.toString() || ''}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-loan-start-date`}
                    label="Lántökudagur"
                    value={
                      debt.loanStartDate
                        ? new Date(debt.loanStartDate).toLocaleDateString()
                        : ''
                    }
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <ReadOnlyField
                    name={`own-domicile-${index}-domicile-location`}
                    label="Staðsetning íbúðar"
                    value={debt.properties?.domicileLocation || ''}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`own-domicile-${index}-year-payment`}
                    label="Heildargreiðslur ársins"
                    value={debt.yearPaymentTotal || 0}
                    onChange={value =>
                      handleDebtValueChange(debt, 'yearPaymentTotal', value)
                    }
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`own-domicile-${index}-nominal-payment`}
                    label="Afborganir af nafnverði"
                    value={debt.nominalPaymentTotal || 0}
                    onChange={value =>
                      handleDebtValueChange(debt, 'nominalPaymentTotal', value)
                    }
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`own-domicile-${index}-interest`}
                    label="Vaxtagjöld"
                    value={debt.interestPaymentTotal}
                    onChange={value =>
                      handleDebtValueChange(debt, 'interestPaymentTotal', value)
                    }
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`own-domicile-${index}-remaining`}
                    label="Eftirstöðvar skulda"
                    value={debt.remaining}
                    onChange={value =>
                      handleDebtValueChange(debt, 'remaining', value)
                    }
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <TotalSection
            name="own-domicile-total"
            label="Samtals eftirstöðvar skulda"
            value={totals.ownDomicileRemainingTotal}
          />
        </Box>

        <Box>
          <SectionHeader title="Aðrar skuldir og vaxtagjöld" tagNumber="5.2" />

          {groupedDebts.Other.map((debt, index) => (
            <Box key={`other-debt-${index}`}>
              <GridRow>
                <GridColumn span="12/12" paddingBottom={3}>
                  <ReadOnlyField
                    name={`other-debt-${index}-description`}
                    label="Lýsing"
                    value={debt.description || ''}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`other-debt-${index}-interest`}
                    label="Vaxtagjöld"
                    value={debt.interestPaymentTotal}
                    onChange={value =>
                      handleDebtValueChange(debt, 'interestPaymentTotal', value)
                    }
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <EditableCurrencyField
                    name={`other-debt-${index}-remaining`}
                    label="Eftirstöðvar"
                    value={debt.remaining}
                    onChange={value =>
                      handleDebtValueChange(debt, 'remaining', value)
                    }
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <TotalSection
            name="other-total"
            label="Samtals eftirstöðvar annarra skulda"
            value={totals.otherRemainingTotal}
          />
        </Box>

        <Box>
          <Text variant="h3" marginBottom={2}>
            Heildarskuldir og vaxtagjöld
          </Text>
          <GridRow>
            <GridColumn span="12/12">
              <ReadOnlyField
                name="debt-remaining-total"
                label="Samanlagðar heildarskuldir og vaxtagjöld"
                value={formatIcelandicAmount(totals.remainingTotal)}
              />
            </GridColumn>
          </GridRow>
        </Box>
      </Stack>
    </Box>
  )
}
