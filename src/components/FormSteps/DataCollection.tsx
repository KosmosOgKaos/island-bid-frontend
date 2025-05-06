import React, { useEffect } from 'react'
import { Box, Checkbox, Icon, Text } from '@island.is/island-ui/core'
import { useTaxData } from '@/hooks/useTaxData'

interface FormProps {
  data: {
    consent?: boolean
    consentChanged?: boolean
    [key: string]: unknown
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DataCollection = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form
  const { fetchTaxData, isLoading, isDataFetched } = useTaxData({
    onChange,
  })

  // Called when the Continue button is clicked from the parent
  useEffect(() => {
    if (
      data.consentChanged === true &&
      data.consent === true &&
      !isLoading &&
      !isDataFetched
    ) {
      fetchTaxData()
    }
  }, [
    data.consentChanged,
    data.consent,
    isLoading,
    isDataFetched,
    fetchTaxData,
  ])

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: {
        name: 'consent',
        value: event.target.checked,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <Box>
      <Text variant="h2" marginBottom={3}>
        Gagnaöflun
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

      <Box marginBottom={7} marginTop={4}>
        <Checkbox
          name="consent"
          label="Ég samþykki að gögn verði sótt rafrænt"
          checked={!!data.consent}
          backgroundColor="blue"
          onChange={handleConsentChange}
          hasError={false}
          errorMessage=""
          large
        />
      </Box>
    </Box>
  )
}
