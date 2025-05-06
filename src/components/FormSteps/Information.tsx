import React, { useEffect } from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Tag,
  Text,
} from '@island.is/island-ui/core'
import { Person, defaultPersonData } from '@/constants/personData'

interface FormProps {
  data: {
    person?: Person
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const Information = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  // Use person data if available, otherwise use defaults
  const person = data.person || defaultPersonData

  // Initialize person data if it doesn't exist in the form
  useEffect(() => {
    if (!data.person) {
      console.log('Initializing person data in form')
      onChange({
        target: {
          name: 'person',
          value: defaultPersonData,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    }
  }, [data.person, onChange])

  // Split the address for display
  const addressParts = person.address?.split(',').map(part => part.trim()) || [
    '',
    '',
  ]
  const streetAddress = addressParts[0]
  const location = addressParts.length > 1 ? addressParts[1] : ''

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    // Handle address fields specially
    if (name === 'streetAddress') {
      const newAddress = location ? `${value}, ${location}` : value
      onChange({
        target: {
          name: 'person',
          value: {
            ...person,
            address: newAddress,
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    } else if (name === 'location') {
      const newAddress = `${streetAddress}, ${value}`
      onChange({
        target: {
          name: 'person',
          value: {
            ...person,
            address: newAddress,
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    } else {
      // Regular field handling
      onChange({
        target: {
          name: 'person',
          value: {
            ...person,
            [name]: value,
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    }
  }

  return (
    <Box>
      <Box display="flex">
        <Box marginRight={1}>
          <Text variant="h3">Persónuupplýsingar</Text>
        </Box>
        <Tag>2.1</Tag>
      </Box>
      <Text marginBottom={5}>
        Vinsamlegast staðfestu persónuupplýsingarnar þínar.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="name"
            label="Nafn"
            value={person.name}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="kennitala"
            label="Kennitala"
            value={person.kennitala}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="streetAddress"
            label="Heimilisfang"
            value={streetAddress}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="location"
            label="Staðsetning"
            value={location}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="email"
            label="Netfang"
            value={person.email}
            onChange={handleChange}
            type="email"
            backgroundColor="blue"
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            name="telephone"
            label="Símanúmer"
            value={person.telephone}
            onChange={handleChange}
            type="tel"
            backgroundColor="blue"
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
