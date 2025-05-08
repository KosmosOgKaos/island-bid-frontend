import { useState, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  GetLatestTaxReturnInfoDocument,
  GetLatestTaxReturnInfoQuery,
} from '@/lib/graphql'
import { useSsn } from '../../app/context/SsnContext'

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
  const { ssn } = useSsn()

  const [executeQuery] = useLazyQuery<GetLatestTaxReturnInfoQuery>(
    GetLatestTaxReturnInfoDocument,
    {
      onCompleted: response => {
        setIsLoading(false)

        if (response && response.getLatestTaxReturnInfo) {
          let taxData = response.getLatestTaxReturnInfo

          const storedTaxData = localStorage.getItem('taxData')
          const parsedStoredTaxData = storedTaxData
            ? JSON.parse(storedTaxData)
            : null

          // Check if stored data exists and SSN matches
          if (parsedStoredTaxData && parsedStoredTaxData.person?.ssn === ssn) {
            // Merge person data if it exists in stored data
            if (parsedStoredTaxData.person) {
              taxData = {
                ...taxData,
                person: parsedStoredTaxData.person,
              }
            }

            // Simply use stored incomes if they exist
            if (parsedStoredTaxData.incomes) {
              taxData.incomes = parsedStoredTaxData.incomes
            }

            // Merge properties
            taxData.properties = taxData.properties?.map(property => {
              const storedProperty = parsedStoredTaxData.properties?.find(
                (stored: typeof property) => stored.id === property.id
              )
              return storedProperty || property
            })

            // Merge debts
            taxData.debts = taxData.debts?.map(debt => {
              const storedDebt = parsedStoredTaxData.debts?.find(
                (stored: typeof debt) => stored.id === debt.id
              )
              return storedDebt || debt
            })
          }

          localStorage.setItem('taxData', JSON.stringify(taxData))

          onChange({
            target: {
              name: 'taxData',
              value: taxData,
            },
          } as FormChangeEvent)

          setIsDataFetched(true)
          setFetchError(taxData.error ? taxData.error : null)
        } else {
          setFetchError('Engin gögn fundust')
        }
      },
      onError: error => {
        setFetchError(`Villa kom upp við að sækja gögn: ${error.message}`)
        setIsLoading(false)
      },
      fetchPolicy: 'network-only',
    }
  )

  const fetchTaxData = useCallback(() => {
    if (!ssn) {
      setFetchError('Kennitala vantar')
      return
    }

    setIsLoading(true)
    setIsDataFetched(false)
    setFetchError(null)

    executeQuery({
      variables: {
        input: {
          ssn,
        },
      },
    }).catch(() => {
      setIsLoading(false)
    })
  }, [executeQuery, ssn])

  return {
    fetchTaxData,
    isLoading,
    isDataFetched,
    fetchError,
  }
}
