import { graphql } from '@/graphql/gql'

export const getLatestTaxReturnInfo = graphql(`
  mutation CreateSubmission($ssn: String!, $input: CreateSubmissionInput!) {
    createSubmission(ssn: $ssn, input: $input) {
            incomes {
                id
                type
                payer
                amount
                currency
                explanation
            }
            properties {
                id
                type
                valueName
                value
                currency
                properties
            }
            debts {
                id
                description
                type
                currency
                creditor
                creditorSsn
                loanNumber
                loanStartDate
                loanDurationYears
                yearPaymentTotal
                nominalPaymentTotal
                interestPaymentTotal
                remaining
                properties
            }
        }
    }
`)
