
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  // Uncomment when queries are written
  // documents: "src/**/*.tsx",
  generates: {
    "src/graphql/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
