import { useState, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  GetLatestTaxReturnInfoDocument,
  GetLatestTaxReturnInfoQuery,
} from '@/lib/graphql'

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

const mapTaxData = (
  taxReturnInfo: NonNullable<
    GetLatestTaxReturnInfoQuery['getLatestTaxReturnInfo']
  >
) => {
  // Debts and incomes have no ids so we assign them their index id here
  return {
    ...taxReturnInfo,
    debts: (taxReturnInfo.debts ?? []).map((debt, index) => ({
      ...debt,
      id: index,
    })),
    incomes: (taxReturnInfo.incomes ?? []).map((income, index) => ({
      ...income,
      id: index,
    })),
  }
}

export const useTaxData = ({
  onChange,
}: UseTaxDataProps): UseTaxDataReturnType => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [executeQuery] = useLazyQuery<GetLatestTaxReturnInfoQuery>(
    GetLatestTaxReturnInfoDocument,
    {
      onCompleted: response => {
        setIsLoading(false)

        if (response && response.getLatestTaxReturnInfo) {
          const taxData = response.getLatestTaxReturnInfo

          localStorage.setItem('taxData', JSON.stringify(mapTaxData(taxData)))

          onChange({
            target: {
              name: 'taxData',
              value: taxData,
            },
          } as FormChangeEvent)

          setIsDataFetched(true)
          setFetchError(null)
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
    }).catch(() => {
      setIsLoading(false)
    })
  }, [executeQuery])

  return {
    fetchTaxData,
    isLoading,
    isDataFetched,
    fetchError,
  }
}
