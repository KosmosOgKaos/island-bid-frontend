import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    'http://bidtaxapplicati-encmfsmv-751978075.eu-west-2.elb.amazonaws.com/graphql',
  documents: 'src/lib/queries/*.ts',
  ignoreNoDocuments: true,
  generates: {
    'src/lib/graphql.ts': {
      config: {},
      plugins: ['@graphql-codegen/typescript-react-apollo'],
    },
  },
}

export default config
