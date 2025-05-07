import React from 'react'
import {
  Box,
  Button,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Tag,
  Text,
  Tooltip,
} from '@island.is/island-ui/core'
import { formatIcelandicAmount } from '@/utils/numberUtils'
import { CurrencyInput } from '@/components/CurrencyInput'
import { PropertyItem } from '@/lib/types'

interface FormProps {
  data: {
    properties?: PropertyItem[]
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const Properties = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  // Use properties data if available, otherwise use empty array
  const propertiesData = data.properties || []

  const findPropertyIndex = (property: PropertyItem): number => {
    return propertiesData.findIndex(p => {
      if (property.type === 'DomesticProperty') {
        return (
          p.type === 'DomesticProperty' &&
          p.properties.fastanumer === property.properties.fastanumer
        )
      }
      if (property.type === 'Vehicle') {
        return (
          p.type === 'Vehicle' &&
          p.properties.registrationNumber ===
            property.properties.registrationNumber
        )
      }
      return false
    })
  }

  const handlePropertyChange = (
    property: PropertyItem,
    field: string,
    value: string | number
  ) => {
    const updatedPropertiesData = [...propertiesData]
    const propertyIndex = findPropertyIndex(property)

    if (propertyIndex >= 0) {
      if (field === 'value') {
        const numericValue =
          typeof value === 'string'
            ? parseFloat(value.replace(/\./g, '').replace(',', '.'))
            : value

        updatedPropertiesData[propertyIndex] = {
          ...updatedPropertiesData[propertyIndex],
          value: isNaN(numericValue) ? 0 : numericValue,
        }
      } else {
        updatedPropertiesData[propertyIndex] = {
          ...updatedPropertiesData[propertyIndex],
          [field]: value,
        }
      }

      onChange({
        target: {
          name: 'properties',
          value: updatedPropertiesData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  // Total combined value of all properties
  const totalPropertyValue = propertiesData.reduce(
    (total, property) => total + property.value,
    0
  )

  return (
    <Box>
      <Text variant="h2" as="h2" marginBottom={2}>
        Eignir ársins 2024
      </Text>
      <Text marginBottom={5}>Upplýsingar um eignir.</Text>

      {propertiesData.length === 0 ? (
        <Text>Engar eignir fundust.</Text>
      ) : (
        <Stack space={7}>
          {/* Domestic Properties Section */}
          {propertiesData.filter(p => p.type === 'DomesticProperty').length >
            0 && (
            <Box>
              <Box display="flex">
                <Box marginRight={1}>
                  <Text variant="h3" as="h3">
                    Innlendar fasteignir
                  </Text>
                </Box>
                <Tag>4.1</Tag>
              </Box>
              <Text marginBottom={3}>
                Upplýsingar um þær innlendu fasteignir sem þú átt í árslok
              </Text>

              {propertiesData
                .filter(property => property.type === 'DomesticProperty')
                .map((property, index) => (
                  <Box key={`domestic-${index}`}>
                    <GridRow>
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Fastanúmer"
                          name="fastanumer"
                          value={property.properties.fastanumer || ''}
                          backgroundColor="blue"
                          readOnly
                        />
                      </GridColumn>
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Heimilisfang"
                          name="address"
                          value={property.properties.address || ''}
                          backgroundColor="blue"
                          readOnly
                        />
                      </GridColumn>
                      <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
                        <CurrencyInput
                          label="Fasteignamat"
                          name="value"
                          value={formatIcelandicAmount(property.value)}
                          onChange={value =>
                            handlePropertyChange(property, 'value', value)
                          }
                          backgroundColor="blue"
                        />
                      </GridColumn>
                    </GridRow>
                  </Box>
                ))}
              <GridRow marginBottom={3}>
                <GridColumn span={['12/12', '12/12']}>
                  <Button variant="text" size="small">
                    Bæta við fasteign
                    <Box marginLeft={1} display="inlineBlock">
                      <Tooltip text="Bídd'aeins, við erum að vinna í 'essu." />
                    </Box>
                  </Button>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '12/12']}>
                  <Input
                    name="domestic-properties-total"
                    label="Samtals innlendar fasteignir"
                    value={formatIcelandicAmount(
                      propertiesData
                        .filter(
                          property => property.type === 'DomesticProperty'
                        )
                        .reduce((sum, property) => sum + property.value, 0)
                    )}
                    type="text"
                    readOnly
                    backgroundColor="blue"
                  />
                </GridColumn>
              </GridRow>
            </Box>
          )}

          {/* Vehicles Section */}
          {propertiesData.filter(p => p.type === 'Vehicle').length > 0 && (
            <Box>
              <Box display="flex">
                <Box marginRight={1}>
                  <Text variant="h3" as="h3">
                    Bifreiðir
                  </Text>
                </Box>
                <Tag>4.2</Tag>
              </Box>
              <Text marginBottom={3}>
                Upplýsingar um þá bíla sem þú átt í árslok koma hér fram.
                Bifreiðir sem keyptar voru á síðasta ári færast á kaupverði. Ef
                upplýsingar um kaupverð vantar ber þér að færa þær inn í
                framtalið.
              </Text>

              {propertiesData
                .filter(property => property.type === 'Vehicle')
                .map((property, index) => (
                  <Box key={`vehicle-${index}`}>
                    <GridRow>
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Skráningarnúmer"
                          name="registrationNumber"
                          value={property.properties.registrationNumber || ''}
                          backgroundColor="blue"
                          readOnly
                        />
                      </GridColumn>
                      <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                        <Input
                          label="Árgerð"
                          name="yearOfPurchase"
                          value={property.properties.yearOfPurchase || ''}
                          backgroundColor="blue"
                          readOnly
                        />
                      </GridColumn>
                      <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
                        <CurrencyInput
                          label="Kaupverð"
                          name="value"
                          value={formatIcelandicAmount(property.value)}
                          onChange={value =>
                            handlePropertyChange(property, 'value', value)
                          }
                          backgroundColor="blue"
                        />
                      </GridColumn>
                    </GridRow>
                  </Box>
                ))}

              <GridRow marginBottom={3}>
                <GridColumn span={['12/12', '12/12']}>
                  <Button variant="text" size="small">
                    Bæta við bifreið
                    <Box marginLeft={1} display="inlineBlock">
                      <Tooltip text="Bídd'aeins, við erum að vinna í 'essu." />
                    </Box>
                  </Button>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span={['12/12', '12/12']}>
                  <Input
                    name="vehicles-total"
                    label="Samtals verðmæti bifreiða"
                    value={formatIcelandicAmount(
                      propertiesData
                        .filter(property => property.type === 'Vehicle')
                        .reduce(
                          (sum, property) => sum + (property.value || 0),
                          0
                        )
                    )}
                    type="text"
                    readOnly
                    backgroundColor="blue"
                  />
                </GridColumn>
              </GridRow>
            </Box>
          )}

          {/* Grand Total Section */}
          <Box>
            <Text variant="h3" as="h3" marginBottom={2}>
              Heildareignir
            </Text>
            <GridRow>
              <GridColumn span={['12/12', '12/12']}>
                <Input
                  name="income-grand-total"
                  label="Samanlagðar heildartekjur"
                  value={formatIcelandicAmount(totalPropertyValue)}
                  type="text"
                  readOnly
                  backgroundColor="blue"
                />
              </GridColumn>
            </GridRow>
          </Box>
        </Stack>
      )}
    </Box>
  )
}
