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
    income?: string
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Income = ({ form }: {
  form: FormProps
}) => {
  const { data, onChange } = form

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Tekjur ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út tekjurnar þínar.
      </Text>

      <GridRow>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="income" 
            label="Tekjur" 
            value={data.income || ''}
            onChange={onChange}
            type="number"
          />
        </GridColumn>
        <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
          <Input 
            name="income" 
            label="Tekjur" 
            value={data.income || ''}
            onChange={onChange}
            type="number"
          />
        </GridColumn>
      </GridRow>
    </Box>
  )
}
