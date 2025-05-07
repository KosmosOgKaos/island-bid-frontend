import React from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Text,
  Stack,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { CurrencyInput } from '@/components/CurrencyInput'
import { DebtItem } from '@/lib/types'

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

  // Use debts data if available, otherwise use empty array
  const debtsData = data.debts || []

  console.log(debtsData)

  const handleDebtValueChange = (
    debt: DebtItem,
    field: keyof DebtItem,
    value: string
  ) => {
    const index = debtsData.findIndex(d => d === debt)
    if (index === -1) return

    const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'))
    const updatedDebts = [...debtsData]

    updatedDebts[index] = {
      ...updatedDebts[index],
      [field]: isNaN(numericValue) ? 0 : numericValue,
    }

    onChange({
      target: {
        name: 'debts',
        value: updatedDebts,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  // Calculate totals for debts
  const ownDomicileDebts = debtsData.filter(debt => debt.type === 'OwnDomicile')
  const totalOwnDomicileRemaining = ownDomicileDebts.reduce(
    (total, debt) => total + debt.remaining,
    0
  )

  // Calculate the total remaining debt amount for all debts
  const totalRemainingDebt = debtsData.reduce(
    (total, debt) => total + debt.remaining,
    0
  )

  return (
    <Box>
      <Box marginRight={1} marginBottom={2}>
        <Text variant="h2">Skuldir og vaxtagjöld 2024</Text>
      </Box>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út skuldir og vaxtagjöld. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Cumque optio necessitatibus omnis.
      </Text>

      {debtsData.length === 0 ? (
        <Text>Engar skuldir fundust.</Text>
      ) : (
        <Stack space={7}>
          {debtsData.map((debt, index) => (
            <Box key={`${debt.type}-${index}`}>
              {debt.type === 'OwnDomicile' ? (
                // Layout for OwnDomicile type
                <>
                  <Text variant="h4" marginBottom={2}>
                    Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota
                  </Text>
                  <GridRow>
                    {debt.properties?.yearOfPurchase && (
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Kaupár"
                          name="yearOfPurchase"
                          value={debt.properties.yearOfPurchase}
                          readOnly
                        />
                      </GridColumn>
                    )}
                    {debt.properties?.domicileLocation && (
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Staðsetning íbúðarhúsnæðis"
                          name="domicileLocation"
                          value={debt.properties.domicileLocation}
                          readOnly
                        />
                      </GridColumn>
                    )}

                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <Input
                        label="Lánveitandi"
                        name="creditor"
                        value={debt.creditor || ''}
                        readOnly
                      />
                    </GridColumn>

                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <Input
                        label="Kennitala lánveitanda"
                        name="creditorSsn"
                        value={debt.creditorSsn || ''}
                        readOnly
                      />
                    </GridColumn>

                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <Input
                        label="Lánsnúmer"
                        name="loanNumber"
                        value={debt.loanNumber || ''}
                        readOnly
                      />
                    </GridColumn>

                    {debt.loanStartDate && (
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Lántökudagur"
                          name="loanStartDate"
                          value={new Date(
                            debt.loanStartDate!
                          ).toLocaleDateString('is-IS')}
                          readOnly
                        />
                      </GridColumn>
                    )}

                    {debt.loanDurationYears && (
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Lánstími í árum"
                          name="loanDurationYears"
                          value={debt.loanDurationYears}
                          readOnly
                        />
                      </GridColumn>
                    )}
                  </GridRow>
                  <GridRow>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <CurrencyInput
                        label="Heildargreiðslur ársins"
                        name="yearPaymentTotal"
                        value={formatIcelandicAmount(debt.yearPaymentTotal || 0)}
                        onChange={value =>
                          handleDebtValueChange(debt, 'yearPaymentTotal', value)
                        }
                        backgroundColor="blue"
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <CurrencyInput
                        label="Afborganir af nafnverði"
                        name="nominalPaymentTotal"
                        value={formatIcelandicAmount(debt.nominalPaymentTotal || 0)}
                        onChange={value =>
                          handleDebtValueChange(debt, 'nominalPaymentTotal', value)
                        }
                        backgroundColor="blue"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <CurrencyInput
                        label="Vaxtagjöld"
                        name="interestPaymentTotal"
                        value={formatIcelandicAmount(debt.interestPaymentTotal)}
                        onChange={value =>
                          handleDebtValueChange(debt, 'interestPaymentTotal', value)
                        }
                        backgroundColor="blue"
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <CurrencyInput
                        label="Eftirstöðvar skulda"
                        name="remaining"
                        value={formatIcelandicAmount(debt.remaining)}
                        onChange={value =>
                          handleDebtValueChange(debt, 'remaining', value)
                        }
                        backgroundColor="blue"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    {/* Own Domicile Totals Section */}
          {ownDomicileDebts.length > 0 && (
            <Box marginBottom={4}>
              <Text variant="h3" marginBottom={2}>
                Samtals vaxtagjöld vegna íbúðarhúsnæðis
              </Text>
              <GridRow>  
                <GridColumn span={['12/12', '12/12']}>
                  <Input
                    name="owndomicile-remaining-total"
                    label="Eftirstöðvar skulda vegna íbúðarhúsnæðis"
                    value={formatIcelandicAmount(totalOwnDomicileRemaining)}
                    type="text"
                    readOnly
                    backgroundColor="blue"
                  />
                </GridColumn>
              </GridRow>
            </Box>
          )}

                  </GridRow>
                  
                </>
              ) : (
                // Layout for other debt types
                <>
                  <Text variant="h4" marginBottom={2}>
                    Aðrar skuldir og vaxtagjöld
                  </Text>
                  <GridRow>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <Input
                        label="Lánveitandi"
                        name="creditor"
                        value={debt.creditor || ''}
                        readOnly
                      />
                    </GridColumn>

                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <Input
                        label="Lánsnúmer"
                        name="loanNumber"
                        value={debt.loanNumber || ''}
                        readOnly
                      />
                    </GridColumn>

                    <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                      <CurrencyInput
                        label="Eftirstöðvar"
                        name="remaining"
                        value={formatIcelandicAmount(debt.remaining)}
                        onChange={value =>
                          handleDebtValueChange(debt, 'remaining', value)
                        }
                        backgroundColor="blue"
                      />
                    </GridColumn>
                  </GridRow>
                </>
              )}
            </Box>
          {/* Grand Total Section */}
          <Box>
            <Text variant="h3" marginBottom={2}>
              Heildarskuldir og vaxtagjöld
            </Text>
            <GridRow>
              <GridColumn span={['12/12', '12/12']}>
                <Input
                  name="income-grand-total"
                  label="Samanlagðar heildarskuldir og vaxtagjöld"
                  value={formatIcelandicAmount(totalRemainingDebt)}
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
