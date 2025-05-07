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
import { Person } from '@/lib/types'

interface FormProps {
  data: {
    person?: Person
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
            <Text variant="h3" as="h3">
              {title}
            </Text>
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
      <Text variant="h2" as="h2" marginBottom={2}>
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
          <SectionTitle title="Upplýsingar" number="2" stepId="information" />
          <GridRow>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Nafn" value={data?.person?.name} />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']}>
              <FieldItem label="Kennitala" value={data?.person?.ssn} />
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
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Launatekjur og starfstengdar greiðslur
                      </Text>
                    </Box>
                    <Tag variant="blue">3.1</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Wages')
                    .map((item, index) => (
                      <Box key={`wages-${index}`}>
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

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Wages')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Add divider between Wages and Benefits */}
              {incomeData.filter(item => item.type === 'Wages').length > 0 &&
                incomeData.filter(item => item.type === 'Benefits').length >
                  0 && (
                  <Box marginTop={5} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Benefits */}
              {incomeData.filter(item => item.type === 'Benefits').length >
                0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Dagpeningar og hlunnindi
                      </Text>
                    </Box>
                    <Tag variant="blue">3.2</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Benefits')
                    .map((item, index) => (
                      <Box key={`benefits-${index}`}>
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

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Benefits')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Add divider between Benefits and Other */}
              {incomeData.filter(item => item.type === 'Benefits').length > 0 &&
                incomeData.filter(item => item.type === 'Other').length > 0 && (
                  <Box marginTop={5} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Other Income */}
              {incomeData.filter(item => item.type === 'Other').length > 0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Aðrar tekjur
                      </Text>
                    </Box>
                    <Tag variant="blue">3.3</Tag>
                  </Box>

                  {incomeData
                    .filter(item => item.type === 'Other')
                    .map((item, index) => (
                      <Box key={`other-income-${index}`}>
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

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          incomeData
                            .filter(item => item.type === 'Other')
                            .reduce((sum, item) => sum + item.amount, 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Total Income */}
              <Box marginTop={5} marginBottom={8}>
                <Divider />
              </Box>
              <GridRow>
                <GridColumn span="6/12">
                  <Text variant="h3" as="h3">
                    Tekjur samtals
                  </Text>
                </GridColumn>
                <GridColumn span={['12/12', '6/12']}>
                  <Text fontWeight="semiBold" color="blue400" variant="h3">
                    {formatIcelandicAmount(
                      incomeData.reduce((sum, item) => sum + item.amount, 0)
                    )}
                  </Text>
                </GridColumn>
              </GridRow>
            </>
          ) : (
            <Text>Engar tekjur skráðar</Text>
          )}
        </Box>

        {/* Properties */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle title="Eignir" number="4" stepId="properties" />

          {data?.properties && data.properties.length > 0 ? (
            <>
              {/* Domestic Properties */}
              {data.properties.filter(p => p.type === 'DomesticProperty')
                .length > 0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Innlendar fasteignir
                      </Text>
                    </Box>
                    <Tag>4.1</Tag>
                  </Box>

                  {data.properties
                    .filter(property => property.type === 'DomesticProperty')
                    .map((property, index) => (
                      <Box key={`domestic-${index}`}>
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Fastanúmer"
                              value={property.properties.fastanumer}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Fasteignamat"
                              value={formatIcelandicAmount(property.value)}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Heimilisfang"
                              value={property.properties.address}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          data.properties
                            .filter(
                              property => property.type === 'DomesticProperty'
                            )
                            .reduce((sum, prop) => sum + (prop.value || 0), 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Add divider between Domestic Properties and Vehicles */}
              {data.properties.filter(p => p.type === 'DomesticProperty')
                .length > 0 &&
                data.properties.filter(p => p.type === 'Vehicle').length >
                  0 && (
                  <Box marginTop={5} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Vehicles */}
              {data.properties.filter(p => p.type === 'Vehicle').length > 0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Bifreiðir
                      </Text>
                    </Box>
                    <Tag>4.2</Tag>
                  </Box>

                  {data.properties
                    .filter(property => property.type === 'Vehicle')
                    .map((property, index) => (
                      <Box key={`vehicle-${index}`}>
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Skráningarnúmer"
                              value={property.properties.registrationNumber}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Kaupverð"
                              value={formatIcelandicAmount(property.value)}
                            />
                          </GridColumn>
                        </GridRow>
                        <GridRow>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Kaupár"
                              value={property.properties.yearOfPurchase}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          data.properties
                            .filter(property => property.type === 'Vehicle')
                            .reduce((sum, prop) => sum + (prop.value || 0), 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}
            </>
          ) : (
            <Text>Engar eignir skráðar</Text>
          )}

          {/* Properties Summary */}
          {data?.properties && data.properties.length > 0 && (
            <>
              <Box marginTop={5} marginBottom={8}>
                <Divider />
              </Box>
              <GridRow>
                <GridColumn span="6/12">
                  <Text variant="h3" as="h3">
                    Eignir samtals
                  </Text>
                </GridColumn>
                <GridColumn span={['12/12', '6/12']}>
                  <Text fontWeight="semiBold" color="blue400" variant="h3">
                    {formatIcelandicAmount(
                      data.properties.reduce(
                        (sum, prop) => sum + (prop.value || 0),
                        0
                      )
                    )}
                  </Text>
                </GridColumn>
              </GridRow>
            </>
          )}
        </Box>

        {/* Debts */}
        <Box border="standard" padding={4} borderRadius="large">
          <SectionTitle
            title="Skuldir og vaxtagjöld"
            number="5"
            stepId="debts"
          />

          {data?.debts && data.debts.length > 0 ? (
            <>
              {/* Housing Loans */}
              {data?.debts?.filter(debt => debt.type === 'OwnDomicile').length >
                0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={3}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota
                      </Text>
                    </Box>
                    <Tag variant="blue">5.1</Tag>
                  </Box>

                  {data.debts
                    .filter(debt => debt.type === 'OwnDomicile')
                    .map((debt, index) => (
                      <Box key={`own-domicile-${index}`}>
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Kaupár"
                              value={debt.properties?.yearOfPurchase}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Staðsetning"
                              value={debt.properties?.domicileLocation}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Lánveitandi"
                              value={debt.creditor}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Kennitala lánveitanda"
                              value={debt.creditorSsn}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Lánsnúmer"
                              value={debt.loanNumber}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Lántökudagur"
                              value={debt.loanStartDate}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Lánstími í árum"
                              value={debt.loanDurationYears}
                            />
                          </GridColumn>
                        </GridRow>
                        <GridRow>
                          <GridColumn span="6/12" paddingBottom={2}>
                            <FieldItem
                              label="Heildargreiðslur ársins"
                              value={formatIcelandicAmount(
                                debt.yearPaymentTotal || 0
                              )}
                            />
                          </GridColumn>
                          <GridColumn
                            span={['12/12', '6/12']}
                            paddingBottom={2}
                          >
                            <FieldItem
                              label="Afborganir af nafnverði"
                              value={formatIcelandicAmount(
                                debt.nominalPaymentTotal || 0
                              )}
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
                              label="Eftirstöðvar skulda"
                              value={formatIcelandicAmount(debt.remaining)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          data.debts
                            .filter(debt => debt.type === 'OwnDomicile')
                            .reduce((sum, debt) => sum + debt.remaining, 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Add divider between Housing Loans and Other Debts */}
              {data?.debts?.filter(debt => debt.type === 'OwnDomicile').length >
                0 &&
                data?.debts?.filter(debt => debt.type === 'Other').length >
                  0 && (
                  <Box marginTop={5} marginBottom={8}>
                    <Divider />
                  </Box>
                )}

              {/* Other Debts */}
              {data?.debts?.filter(debt => debt.type === 'Other').length >
                0 && (
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Box marginRight={1}>
                      <Text variant="h4" as="h4">
                        Aðrar skuldir
                      </Text>
                    </Box>
                    <Tag variant="blue">5.2</Tag>
                  </Box>

                  {data.debts
                    .filter(debt => debt.type === 'Other')
                    .map((debt, index) => (
                      <Box key={`other-debt-${index}`}>
                        <GridRow>
                          <GridColumn span="12/12">
                            <FieldItem label="" value={debt.description} />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn span="6/12">
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
                              label="Eftirstöðvar skulda"
                              value={formatIcelandicAmount(debt.remaining)}
                            />
                          </GridColumn>
                        </GridRow>
                      </Box>
                    ))}

                  <GridRow>
                    <GridColumn span="6/12">
                      <Text variant="h4" as="h4">
                        Samtals
                      </Text>
                    </GridColumn>
                    <GridColumn span={['12/12', '6/12']}>
                      <Text fontWeight="semiBold" color="blue400">
                        {formatIcelandicAmount(
                          data?.debts
                            ?.filter(debt => debt.type === 'Other')
                            .reduce((sum, debt) => sum + debt.remaining, 0)
                        )}
                      </Text>
                    </GridColumn>
                  </GridRow>
                </Box>
              )}

              {/* Grand Total Debts */}
              <Box marginTop={5} marginBottom={8}>
                <Divider />
              </Box>
              <GridRow>
                <GridColumn span="6/12">
                  <Text variant="h3" as="h3">
                    Skuldir samtals
                  </Text>
                </GridColumn>
                <GridColumn span={['12/12', '6/12']}>
                  <Text fontWeight="semiBold" color="blue400" variant="h3">
                    {formatIcelandicAmount(
                      data?.debts?.reduce(
                        (sum, debt) => sum + debt.remaining,
                        0
                      )
                    )}
                  </Text>
                </GridColumn>
              </GridRow>
            </>
          ) : (
            <Text>Engar skuldir skráðar</Text>
          )}
        </Box>
      </Stack>
    </Box>
  )
}
