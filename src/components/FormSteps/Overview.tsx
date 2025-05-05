import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface FormProps {
  data: {
    name?: string
    nationalId?: string
    [key: string]: unknown
  }
}

export const Overview = ({ form }: {
  form: FormProps
}) => {
  console.log(form)

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Yfirlit
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út eignir þínar.
      </Text>
    </Box>
  )
}
