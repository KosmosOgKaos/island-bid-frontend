import React from 'react'
import { Box, Text, Checkbox, Icon } from '@island.is/island-ui/core'
import { useTaxData } from '@/hooks/useTaxData'

interface FormProps {
  data: {
    consent?: boolean
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const DataCollection = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form
  const { fetchTaxData, fetchError } = useTaxData({
    onChange,
  })
  
  // Update form data with fetch error if tax data fetching fails
  React.useEffect(() => {
    if (fetchError) {
      onChange({
        target: {
          name: 'fetchError',
          value: fetchError
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }, [fetchError, onChange])
  
  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    // Update consent state
    onChange({
      target: {
        name: 'consent',
        value: checked,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)

    // Fetch tax data if consent is given
    if (checked) {
      fetchTaxData()
    }
  }

  return (
    <Box>
      <Text variant="h2" as="h2" marginBottom={3}>
        Gagnaöflun
      </Text>

      <Box display="flex">
        <Box marginRight={2}>
          <Icon color="blue400" type="outline" size="large" icon="download" />
        </Box>
        <Text variant="h4" as="h4" marginBottom={6}>
          Eftirfarandi gögn verða sótt rafrænt
        </Text>
      </Box>
      <Text variant="h5" as="h5" color="blue400">
        Persónuupplýsingar úr Þjóðskrá
      </Text>
      <Text marginBottom={4}>
        Upplýsingar frá Þjóðskrá um kennitölu og lögheimili.
      </Text>
      <Text variant="h5" as="h5" color="blue400">
        Fjárhagsupplýsingar
      </Text>
      <Text marginBottom={4}>
        Upplýsingar um tekjur, eignir og skuldir frá Skattinum.
      </Text>
      <Text variant="h5" as="h5" color="blue400">
        Upplýsingar frá Ísland.is
      </Text>
      <Text marginBottom={4}>Netfang og símanúmer úr þínum stillingum.</Text>

      <Box marginBottom={7} marginTop={4}>
        <Checkbox
          name="consent"
          id="consent"
          label="Ég samþykki að gögn verði sótt rafrænt"
          checked={data.consent || false}
          backgroundColor="blue"
          onChange={handleConsentChange}
          large
        />
      </Box>
    </Box>
  )
}
