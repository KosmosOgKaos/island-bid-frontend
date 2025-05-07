import { graphql } from '@/graphql/gql'

export const login = graphql(`
  mutation Login($phoneNumber: String!) {
    login(input: {phoneNumber: $phoneNumber}) {
      success
      ssn
      error
    }
  }
`)
