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
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Step2 = ({ form }: {
  form: FormProps
}) => {
  const { data, onChange } = form

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Skref 2
      </Text>
      <Text marginBottom={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="name" 
            label="Name" 
            value={data.name || ''}
            onChange={onChange}
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="nationalId" 
            label="Kennitala" 
            value={data.nationalId || ''}
            onChange={onChange}
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
