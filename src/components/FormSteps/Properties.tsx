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
import { PropertyItem, defaultPropertiesData } from '@/constants/propertiesData'

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

  useEffect(() => {
    if (!data.properties) {
      onChange({
        target: {
          name: 'properties',
          value: defaultPropertiesData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }, [data.properties, onChange])

  const propertiesData = data.properties || defaultPropertiesData

  const findPropertyIndex = (property: PropertyItem): number => {
    return propertiesData.findIndex(p => {
      if (property.type === 'DomesticProperty') {
        return (
          p.type === 'DomesticProperty' &&
          p.properties.fastanumer === property.properties.fastanumer
        )
      } else if (property.type === 'Vehicle') {
        return (
          p.type === 'Vehicle' &&
          p.properties.registrationNumber ===
            property.properties.registrationNumber
        )
      }
      return p.createdAt === property.createdAt
    })
  }

  const handlePropertyValueChange = (property: PropertyItem, value: string) => {
    const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'))
    const index = findPropertyIndex(property)

    if (index === -1) return

    const updatedProperties = propertiesData.map((p, i) =>
      i === index ? { ...p, value: isNaN(numericValue) ? 0 : numericValue } : p
    )

    onChange({
      target: {
        name: 'properties',
        value: updatedProperties,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  const groupedProperties = useMemo(() => {
    const grouped = {
      DomesticProperty: [] as PropertyItem[],
      Vehicle: [] as PropertyItem[],
    }

    propertiesData.forEach(property => {
      if (property.type === 'DomesticProperty') {
        grouped.DomesticProperty.push(property)
      } else if (property.type === 'Vehicle') {
        grouped.Vehicle.push(property)
      }
    })

    return grouped
  }, [propertiesData])

  const totals = useMemo(() => {
    const domesticTotal = groupedProperties.DomesticProperty.reduce(
      (sum, property) => sum + property.value,
      0
    )

    const vehicleTotal = groupedProperties.Vehicle.reduce(
      (sum, property) => sum + property.value,
      0
    )

    return {
      domesticTotal,
      vehicleTotal,
      grandTotal: domesticTotal + vehicleTotal,
    }
  }, [groupedProperties])

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Eignir ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út eignir þínar. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Cumque optio necessitatibus omnis.
      </Text>

      <Stack space={7}>
        <Box>
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3">Fasteignir á Íslandi</Text>
            </Box>
            <Tag>4.1</Tag>
          </Box>
          <Text marginBottom={3}>Fasteignir sem eru skráðar á þitt nafn.</Text>

          {groupedProperties.DomesticProperty.map((property, index) => (
            <Box key={`property-${index}`}>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <Input
                    name={`property-${index}-fastanumer`}
                    label="Fastanúmer"
                    value={property.properties.fastanumer}
                    type="text"
                    readOnly
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <Input
                    name={`property-${index}-address`}
                    label="Heimilisfang"
                    value={property.properties.address}
                    type="text"
                    readOnly
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="12/12">
                  <CurrencyInput
                    name={`property-${index}-value`}
                    label={property.valueName}
                    value={formatIcelandicAmount(property.value)}
                    onChange={value =>
                      handlePropertyValueChange(property, value)
                    }
                    backgroundColor="blue"
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <Box marginTop={3}>
            <GridRow>
              <GridColumn span="12/12">
                <Input
                  name="domestic-property-total"
                  label="Samtals"
                  value={formatIcelandicAmount(totals.domesticTotal)}
                  type="text"
                  readOnly
                />
              </GridColumn>
            </GridRow>
          </Box>
        </Box>

        <Box>
          <Box display="flex">
            <Box marginRight={1}>
              <Text variant="h3">Bifreiðir</Text>
            </Box>
            <Tag>4.2</Tag>
          </Box>
          <Text marginBottom={3}>
            Bifreiðar, bifhjól og önnur skráningarskyld ökutæki.
          </Text>

          {groupedProperties.Vehicle.map((property, index) => (
            <Box key={`vehicle-${index}`}>
              <GridRow>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <Input
                    name={`vehicle-${index}-registration`}
                    label="Skráningarnúmer"
                    value={property.properties.registrationNumber}
                    type="text"
                    readOnly
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
                  <Input
                    name={`vehicle-${index}-year`}
                    label="Kaupdagur"
                    value={property.properties.yearOfPurchase?.toString()}
                    type="text"
                    readOnly
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="12/12" paddingBottom={3}>
                  <CurrencyInput
                    name={`vehicle-${index}-value`}
                    label={property.valueName}
                    value={formatIcelandicAmount(property.value)}
                    onChange={value =>
                      handlePropertyValueChange(property, value)
                    }
                    backgroundColor="blue"
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <GridRow>
            <GridColumn span="12/12">
              <Input
                name="vehicle-total"
                label="Samtals"
                value={formatIcelandicAmount(totals.vehicleTotal)}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>

        <Box>
          <Text variant="h3" marginBottom={2}>
            Heildareignir
          </Text>
          <GridRow>
            <GridColumn span="12/12">
              <Input
                name="property-grand-total"
                label="Samanlagðir heildareignir"
                value={formatIcelandicAmount(totals.grandTotal)}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>
      </Stack>
    </Box>
  )
}
