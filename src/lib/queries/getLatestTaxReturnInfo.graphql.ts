import { graphql } from '@/graphql/gql'

export const getLatestTaxReturnInfo = graphql(`
  query GetLatestTaxReturnInfo($input: TaxReturnInfoInput!) {
    getLatestTaxReturnInfo(input: $input) {
      debts {
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
        currency
        properties
        type
        value
        valueName
      }
    }
  }
`)
