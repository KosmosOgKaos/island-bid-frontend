import { graphql } from '@/graphql/gql'

export const getRandomString = graphql(`
  query GetRandomString {
    getRandomString
  }
`)
