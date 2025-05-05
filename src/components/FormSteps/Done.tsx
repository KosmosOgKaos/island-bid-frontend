import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface FormProps {
  data: {
    name?: string
    nationalId?: string
    [key: string]: unknown
  }
}

export const Done = ({ form }: {
  form: FormProps
}) => {
  console.log(form)

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Umsókn móttekin
      </Text>
      <Text marginBottom={5}>
        Til hamingju!
      </Text>
    </Box>
  )
}
