'use client'

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URL ?? 'http://localhost:3002/graphql',
  }),
  cache: new InMemoryCache(),
})

export function ApolloWrapper({ children }: React.PropsWithChildren) {  
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}
