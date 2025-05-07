'use client'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ??
      'http://bidtaxapplicati-encmfsmv-751978075.eu-west-2.elb.amazonaws.com/graphql',
  }),
  cache: new InMemoryCache(),
})

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
