import React from 'react'
import {
  Box,
  Text,
  GridColumn,
  GridRow,
  Stack,
  Tag,
  Divider,
  Button,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { DebtItem } from '@/lib/types'
import { PropertyItem } from '@/lib/types'
import { IncomeItem } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface FormProps {
  data: {
    person?: {
      name: string
      kennitala: string
      email: string
      telephone: string
      address: string
    }
    properties?: PropertyItem[]
    debts?: DebtItem[]
    incomes?: IncomeItem[]
    income?: IncomeItem[]
    [key: string]: unknown
  }
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

// Component wrapper to handle different prop structures
export const Overview = ({ form }: { form: FormProps }) => {
  const { data } = form
  const router = useRouter()

  // Get the income data with fallback to either property name
  const incomeData = (data?.incomes || data?.income || []) as IncomeItem[]

  // Helper function to create section titles
  const SectionTitle = ({
    title,
    number,
    stepId,
  }: {
    title: string
    number: string
    stepId: string
  }) => (
    <Box marginBottom={2}>
      <Box display="flex" justifyContent="spaceBetween" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box marginRight={1}>
            <Text variant="h3">{title}</Text>
          </Box>
          <Tag variant="blue">{number}</Tag>
        </Box>
        <Box>
          <Button 
            variant="text" 
            size="small"
            onClick={() => router.push(`/application?step=${stepId}`)}
          >
            Breyta
          </Button>
        </Box>
      </Box>
    </Box>
  )

  // Helper component for displaying field data
  const FieldItem = ({
    label,
    value,
  }: {
    label: string
    value: string | number | undefined
  }) => (
    <Box marginBottom={2}>
      <Text fontWeight="semiBold">{label}</Text>
      <Text>{value || 'Ekki skráð'}</Text>
    </Box>
  )

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Yfirlit
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast farðu yfir upplýsingarnar hér að neðan áður en þú skilar
        inn framtalið.
      </Text>

      <Stack space={3}>
        {/* Data Collection */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Gagnaöflun" number="1" stepId="dataCollection" />
          <Text>Sjálfvirk gagnaöflun var samþykkt.</Text>
        </Box>

        {/* Personal Information */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Persónuupplýsingar" number="2" stepId="information" />
          <GridRow>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Nafn" value={data?.person?.name} />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Kennitala" value={data?.person?.kennitala} />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Netfang" value={data?.person?.email} />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Símanúmer" value={data?.person?.telephone} />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span="12/12">
              <FieldItem label="Heimilisfang" value={data?.person?.address} />
            </GridColumn>
          </GridRow>
        </Box>

        {/* Income */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Tekjur" number="3" stepId="income" />

          {incomeData.length > 0 ? (
            <>
              {/* Wages */}
              {incomeData.filter(item => item.type === 'Wages').length > 0 && (
                <Box marginBottom={4}>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4">
                        Launatekjur og starfstengdar greiðslur
                      </Text>
                    </Box>
                    <Tag variant="blue">3.1</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Wages')
                    .map((item, index) => (
                      <Box
                        key={`wages-${index}`}
                        background="white"
                        paddingLeft={3}
                        borderRadius="standard"
                      >
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Fyrirtæki"
                              value={item.payer || ''}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Upphæð"
                              value={formatIcelandicAmount(item.amount)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <Box background="white" borderRadius="standard" marginTop={2}>
                    <Box
                      display="flex"
                      justifyContent="spaceBetween"
                      alignItems="center"
                    >
                      <Text fontWeight="semiBold">
                        Samtals launatekjur og starfstengdar greiðslur
                      </Text>
                      <Text
                        fontWeight="semiBold"
                        color="blue600"
                        textAlign="right"
                      >
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Wages')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Add divider between Wages and Benefits */}
              {incomeData.filter(item => item.type === 'Wages').length > 0 &&
                incomeData.filter(item => item.type === 'Benefits').length >
                  0 && (
                  <Box marginTop={3} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Benefits */}
              {incomeData.filter(item => item.type === 'Benefits').length >
                0 && (
                <Box marginBottom={4}>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4">Dagpeningar og hlunnindi</Text>
                    </Box>
                    <Tag variant="blue">3.2</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Benefits')
                    .map((item, index) => (
                      <Box
                        key={`benefits-${index}`}
                        background="white"
                        paddingLeft={3}
                        borderRadius="standard"
                      >
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Fyrirtæki"
                              value={item.payer || ''}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Lýsing"
                              value={item.explanation || ''}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Upphæð"
                              value={formatIcelandicAmount(item.amount)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <Box background="white" borderRadius="standard" marginTop={2}>
                    <Box
                      display="flex"
                      justifyContent="spaceBetween"
                      alignItems="center"
                    >
                      <Text fontWeight="semiBold">
                        Samtals dagpeningar og hlunnindi
                      </Text>
                      <Text
                        fontWeight="semiBold"
                        color="blue600"
                        textAlign="right"
                      >
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Benefits')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Add divider between Benefits and Other Income */}
              {incomeData.filter(item => item.type === 'Benefits').length > 0 &&
                incomeData.filter(item => item.type === 'Other').length > 0 && (
                  <Box marginTop={3} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Other Income */}
              {incomeData.filter(item => item.type === 'Other').length > 0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4">Aðrar tekjur</Text>
                    </Box>
                    <Tag variant="blue">3.3</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Other')
                    .map((item, index) => (
                      <Box
                        key={`other-income-${index}`}
                        background="white"
                        paddingLeft={3}
                        borderRadius="standard"
                      >
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem label="Tegund" value={item.type} />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Greiðandi"
                              value={item.payer || ''}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Upphæð"
                              value={formatIcelandicAmount(item.amount)}
                            />
                          </GridColumn>
                        </GridRow>

                        {item.explanation && (
                          <GridRow>
                            <GridColumn span="6/12" paddingBottom={2}>
                              <FieldItem
                                label="Skýring"
                                value={item.explanation}
                              />
                            </GridColumn>
                          </GridRow>
                        )}
                      </Box>
                    ))}

                  <Box background="white" borderRadius="standard" marginTop={2}>
                    <Box
                      display="flex"
                      justifyContent="spaceBetween"
                      alignItems="center"
                    >
                      <Text fontWeight="semiBold">Samtals aðrar tekjur</Text>
                      <Text
                        fontWeight="semiBold"
                        color="blue600"
                        textAlign="right"
                      >
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Other')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Total Income */}
              <Box background="white" borderRadius="standard" marginTop={4}>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  alignItems="center"
                >
                  <Text fontWeight="semiBold">Heildartekjur</Text>
                  <Text fontWeight="semiBold" color="blue600" textAlign="right">
                    {formatIcelandicAmount(
                      incomeData.reduce((sum, item) => sum + item.amount, 0)
                    )}
                  </Text>
                </Box>
              </Box>
            </>
          ) : (
            <Text>Engar tekjur skráðar</Text>
          )}
        </Box>

        {/* Properties */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Eignir" number="4" stepId="properties" />

          {data?.properties && data.properties.length > 0 ? (
            data.properties.map((property, index) => (
              <Box key={`property-${index}`} marginBottom={3}>
                <Box
                  background="white"
                  paddingLeft={3}
                  borderRadius="standard"
                  marginBottom={2}
                >
                  <Text variant="h4" marginBottom={2}>
                    {property.type === 'DomesticProperty'
                      ? 'Íbúðarhúsnæði'
                      : property.type === 'Vehicle'
                      ? 'Ökutæki'
                      : 'Önnur fasteign'}{' '}
                    -{' '}
                    {property.properties.address ||
                      property.properties.registrationNumber ||
                      `Eign ${index + 1}`}
                  </Text>

                  <GridRow>
                    <GridColumn span="6/12" paddingBottom={2}>
                      <FieldItem
                        label="Tegund"
                        value={
                          property.type === 'DomesticProperty'
                            ? 'Íbúðarhúsnæði'
                            : property.type === 'Vehicle'
                            ? 'Ökutæki'
                            : 'Önnur fasteign'
                        }
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={2}>
                      <FieldItem
                        label={
                          property.type === 'DomesticProperty'
                            ? 'Kaupár'
                            : 'Árgerð'
                        }
                        value={property.properties.yearOfPurchase}
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow>
                    <GridColumn span="6/12" paddingBottom={2}>
                      <FieldItem
                        label={
                          property.type === 'DomesticProperty'
                            ? 'Fasteignamat'
                            : 'Kaupverð'
                        }
                        value={formatIcelandicAmount(property.value)}
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']} paddingBottom={2}>
                      {property.type === 'DomesticProperty' ? (
                        <FieldItem
                          label="Fastanúmer"
                          value={property.properties.fastanumer}
                        />
                      ) : (
                        <FieldItem
                          label="Skráningarnúmer"
                          value={property.properties.registrationNumber}
                        />
                      )}
                    </GridColumn>
                  </GridRow>
                </Box>
              </Box>
            ))
          ) : (
            <Text>Engar eignir skráðar</Text>
          )}

          {/* Properties Summary */}
          {data?.properties && data.properties.length > 0 && (
            <Box background="white" borderRadius="standard" marginTop={3}>
              <Box
                display="flex"
                justifyContent="spaceBetween"
                alignItems="center"
              >
                <Text fontWeight="semiBold">Heildarfasteignamat</Text>
                <Text fontWeight="semiBold" color="blue600" textAlign="right">
                  {formatIcelandicAmount(
                    data.properties.reduce(
                      (sum, prop) => sum + (prop.value || 0),
                      0
                    )
                  )}
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        {/* Debts */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Skuldir og vaxtagjöld" number="5" stepId="debts" />

          {data?.debts && data.debts.length > 0 ? (
            <>
              {/* Housing Loans */}
              {data?.debts?.filter(debt => debt.type === 'OwnDomicile').length >
                0 && (
                <Box marginBottom={4}>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4">Íbúðalán</Text>
                    </Box>
                    <Tag variant="blue">5.1</Tag>
                  </Box>

                  {data.debts
                    .filter(debt => debt.type === 'OwnDomicile')
                    .map((debt, index) => (
                      <Box
                        key={`own-domicile-${index}`}
                        background="white"
                        paddingLeft={3}
                        borderRadius="standard"
                      >
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Lánastofnun"
                              value={debt.creditor}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Lánsnúmer"
                              value={debt.loanNumber}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Vaxtagjöld"
                              value={formatIcelandicAmount(
                                debt.interestPaymentTotal
                              )}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Eftirstöðvar"
                              value={formatIcelandicAmount(debt.remaining)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <Box background="white" borderRadius="standard" marginTop={2}>
                    <Box
                      display="flex"
                      justifyContent="spaceBetween"
                      alignItems="center"
                    >
                      <Text fontWeight="semiBold">
                        Samtals eftirstöðvar íbúðarlána
                      </Text>
                      <Text
                        fontWeight="semiBold"
                        color="blue600"
                        textAlign="right"
                      >
                        {formatIcelandicAmount(
                          data.debts
                            .filter(debt => debt.type === 'OwnDomicile')
                            .reduce((sum, debt) => sum + debt.remaining, 0)
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Add divider between Housing Loans and Other Debts */}
              {data?.debts?.filter(debt => debt.type === 'OwnDomicile').length >
                0 &&
                data?.debts?.filter(debt => debt.type === 'Other').length >
                  0 && (
                  <Box marginTop={3} marginBottom={6}>
                    <Divider />
                  </Box>
                )}

              {/* Other Debts */}
              {data?.debts?.filter(debt => debt.type === 'Other').length >
                0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4">Aðrar skuldir</Text>
                    </Box>
                    <Tag variant="blue">5.2</Tag>
                  </Box>

                  {data.debts
                    .filter(debt => debt.type === 'Other')
                    .map((debt, index) => (
                      <Box
                        key={`other-debt-${index}`}
                        background="white"
                        paddingLeft={3}
                        borderRadius="standard"
                      >
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Lýsing"
                              value={debt.description}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Vaxtagjöld"
                              value={formatIcelandicAmount(
                                debt.interestPaymentTotal
                              )}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Eftirstöðvar"
                              value={formatIcelandicAmount(debt.remaining)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <Box background="white" borderRadius="standard" marginTop={2}>
                    <Box
                      display="flex"
                      justifyContent="spaceBetween"
                      alignItems="center"
                    >
                      <Text fontWeight="semiBold">
                        Samtals eftirstöðvar annarra skulda
                      </Text>
                      <Text
                        fontWeight="semiBold"
                        color="blue600"
                        textAlign="right"
                      >
                        {formatIcelandicAmount(
                          data?.debts
                            ?.filter(debt => debt.type === 'Other')
                            .reduce((sum, debt) => sum + debt.remaining, 0)
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Grand Total Debts */}
              <Box background="white" borderRadius="standard" marginTop={4}>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  alignItems="center"
                >
                  <Text fontWeight="semiBold">Samanlagðar heildarskuldir</Text>
                  <Text fontWeight="semiBold" color="blue600" textAlign="right">
                    {formatIcelandicAmount(
                      data?.debts?.reduce(
                        (sum, debt) => sum + debt.remaining,
                        0
                      )
                    )}
                  </Text>
                </Box>
              </Box>
            </>
          ) : (
            <Text>Engar skuldir skráðar</Text>
          )}
        </Box>
      </Stack>
    </Box>
  )
}
