import React from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Text,
} from '@island.is/island-ui/core'
import { Person } from '@/lib/types'

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

  const person = data.person || {
    name: '',
    ssn: '',
    address: '',
    email: '',
    telephone: '',
  }

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
      <Box marginRight={1} marginBottom={2}>
        <Text variant="h2" as="h2">
          Upplýsingar
        </Text>
      </Box>
      <Text marginBottom={5}>
        Mikilvægt er að skrá réttar upplýsingar svo hægt sé að hafa samband og
        senda þér tilkynningar um mikilvæg skattaleg málefni.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Nafn"
            name="name"
            value={person.name}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Kennitala"
            name="kennitala"
            value={person.ssn}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Heimilisfang"
            name="streetAddress"
            value={streetAddress}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Póstnúmer og staður"
            name="location"
            value={location}
            onChange={handleChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Netfang"
            name="email"
            value={person.email}
            onChange={handleChange}
            backgroundColor="blue"
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input
            label="Símanúmer"
            name="telephone"
            value={person.telephone}
            onChange={handleChange}
            backgroundColor="blue"
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
