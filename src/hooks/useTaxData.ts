import { useState, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GetLatestTaxReturnInfoDocument } from '@/lib/graphql'

type FormChangeEvent = React.ChangeEvent<HTMLInputElement>

interface UseTaxDataProps {
  onChange: (e: FormChangeEvent) => void
}

interface UseTaxDataReturnType {
  fetchTaxData: () => void
  isLoading: boolean
  isDataFetched: boolean
  fetchError: string | null
}

export const useTaxData = ({
  onChange,
}: UseTaxDataProps): UseTaxDataReturnType => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [executeQuery] = useLazyQuery(GetLatestTaxReturnInfoDocument, {
    onCompleted: response => {
      setIsLoading(false)

      if (response.getLatestTaxReturnInfo) {
        const taxData = response.getLatestTaxReturnInfo
        console.log('✅ Tax data successfully fetched')

        // Focus only on income data
        if (taxData.incomes && Array.isArray(taxData.incomes)) {
          // Store just the income data for simplicity
          localStorage.setItem('incomeData', JSON.stringify(taxData.incomes))

          // Update the form
          onChange({
            target: {
              name: 'incomes',
              value: taxData.incomes,
            },
          } as FormChangeEvent)
          setIsDataFetched(true)
          setFetchError(null)
        } else {
          setFetchError('Engin gögn um tekjur fundust')
        }
      } else {
        setFetchError('Engin gögn komu frá þjónustu')
      }
    },
    onError: () => {
      setFetchError('Villa kom upp við að sækja gögn')
      setIsLoading(false)
    },
  })

  const fetchTaxData = useCallback(() => {
    setIsLoading(true)
    setIsDataFetched(false)
    setFetchError(null)

    executeQuery({
      variables: {
        input: {
          // TODO: hook up to login when available
          ssn: '1203894569',
        },
      },
    })
  }, [executeQuery])

  return {
    fetchTaxData,
    isLoading,
    isDataFetched,
    fetchError,
  }
}
