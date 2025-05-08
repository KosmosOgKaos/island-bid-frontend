import { graphql } from '@/graphql/gql'

export const getLatestTaxReturnInfo = graphql(`
  query GetLatestTaxReturnInfo($input: TaxReturnInfoInput!) {
    getLatestTaxReturnInfo(input: $input) {
      debts {
        id
        creditor
        creditorSsn
        currency
        description
        interestPaymentTotal
        loanDurationYears
        loanNumber
        loanStartDate
        nominalPaymentTotal
        properties
        remaining
        type
        yearPaymentTotal
      }

      incomes {
        id
        amount
        currency
        explanation
        payer
        type
      }

      person {
        address
        email
        name
        ssn
        telephone
      }

      properties {
        id
        currency
        properties
        type
        value
        valueName
      }
      error
    }
  }
`)
