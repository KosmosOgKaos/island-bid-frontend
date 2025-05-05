import React from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Text,
} from '@island.is/island-ui/core'

interface FormProps {
  data: {
    name?: string
    nationalId?: string
    email?: string
    phone?: string
    address?: string
    postalCode?: string
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Information = ({ form }: {
  form: FormProps
}) => {
  const { data, onChange } = form

  const defaultData = {
    name: data.name || 'Jökull Þórðarson',
    nationalId: data.nationalId || '120389-4569',
    email: data.email || 'jokull.thorarinson@email.com',
    phone: data.phone || '555-1234',
    address: data.address || 'Bláfjallagata 12',
    postalCode: data.postalCode || '105, Reykjavík',
  }

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Upplýsingar
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast staðfestu persónuupplýsingarnar þínar.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="name" 
            label="Nafn" 
            value={defaultData.name}
            onChange={onChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="nationalId" 
            label="Kennitala" 
            value={defaultData.nationalId}
            onChange={onChange}
            readOnly
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="address" 
            label="Heimilisfang" 
            value={defaultData.address}
            onChange={onChange}
            readOnly
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="postalCode" 
            label="Póstnúmer" 
            value={defaultData.postalCode}
            onChange={onChange}
            readOnly
          />
        </GridColumn>
      </GridRow>

      <GridRow marginBottom={10}>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="email" 
            label="Netfang" 
            value={defaultData.email}
            onChange={onChange}
            type="email"
            backgroundColor="blue"
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="phone" 
            label="Símanúmer" 
            value={defaultData.phone}
            onChange={onChange}
            type="tel"
            backgroundColor="blue"
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
