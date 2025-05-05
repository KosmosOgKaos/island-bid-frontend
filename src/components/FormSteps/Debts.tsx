import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface FormProps {
  data: {
    [key: string]: unknown
  }
}

export const Debts = ({ form }: {
  form: FormProps
}) => {
  console.log(form)

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Skuldir ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út skuldir þínar.
      </Text>
    </Box>
  )
}
