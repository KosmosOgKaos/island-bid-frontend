import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface FormProps {
  data: {
    name?: string
    nationalId?: string
    [key: string]: unknown
  }
}

export const Step4 = ({ form }: {
  form: FormProps
}) => {
  console.log(form)

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Skref 4
      </Text>
      <Text marginBottom={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>

      <Text variant="h2" marginBottom={2}>
        Final step - Overview
      </Text>
    </Box>
  )
}
