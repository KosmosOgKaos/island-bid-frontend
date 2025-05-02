import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
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
