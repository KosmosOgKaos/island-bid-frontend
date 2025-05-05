import React from 'react'
import {
  Box,
  Checkbox,
  Icon,
  Text,
} from '@island.is/island-ui/core'

interface FormProps {
  data: {
    consent?: boolean
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DataCollection = ({ form }: {
  form: FormProps
}) => {
  const { data, onChange } = form
  
  return (
    <Box>
      <Text variant="h2" marginBottom={3}>
        Skref 1
      </Text>

      <Box display="flex">
        <Box marginRight={2}>
          <Icon color="blue400" type="outline" size="large" icon="download" />
        </Box>
        <Text variant="h4" marginBottom={6}>
          Eftirfarandi gögn verða sótt rafrænt
        </Text>
      </Box>

      <Text variant="h5" color="blue400">
        Persónuupplýsingar úr Þjóðskrá
      </Text>
      <Text marginBottom={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      <Text variant="h5" color="blue400">
        Netfang og símanúmer úr þínum stillingum
      </Text>
      <Text marginBottom={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      <Box marginBottom={7} marginTop={10}>
        <Checkbox
          label="Ég samþykki að gögn verði sótt rafrænt"
          name="consent"
          value="consent"
          large
          checked={data.consent || false}
          onChange={onChange}
        />
      </Box>
    </Box>
  )
}
