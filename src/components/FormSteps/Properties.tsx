import React from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Text,
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
      <Text variant="h2" marginBottom={2}>
        Eignir ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast staðfestu eignirnar þínar og uppfærðu matsverð ef þörf er
        á.
      </Text>

      {propertiesData.length === 0 ? (
        <Text>Engar eignir fundust.</Text>
      ) : (
        <Stack space={7}>
          {propertiesData.map((property, index) => (
            <Box key={`${property.type}-${index}`}>
              <GridRow>
                <GridColumn span="12/12">
                  <Text variant="h4" marginBottom={2}>
                    {property.type === 'DomesticProperty'
                      ? 'Fasteignir'
                      : property.type === 'Vehicle'
                      ? 'Bifreiðir'
                      : 'Eign'}
                  </Text>
                </GridColumn>

                {property.type === 'DomesticProperty' && (
                  <>
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
                  </>
                )}

                {property.type === 'Vehicle' && (
                  <>
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
                  </>
                )}

                <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
                  <CurrencyInput
                    label={property.valueName}
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

          {/* Grand Total Section */}
          <Box>
            <Text variant="h3" marginBottom={2}>
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
