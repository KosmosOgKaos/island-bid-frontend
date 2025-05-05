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
    email?: string
    phone?: string
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Step3 = ({ form }: {
  form: FormProps
}) => {
  const { data, onChange } = form

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Skref 3
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út samskiptaupplýsingar þínar.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="email" 
            label="Netfang" 
            value={data.email || ''}
            onChange={onChange}
            type="email"
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="phone" 
            label="Símanúmer" 
            value={data.phone || ''}
            onChange={onChange}
            type="tel"
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
