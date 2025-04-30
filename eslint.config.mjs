import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["**/src/lib/island-ui/**/*"],
    rules: {
      // Enforce no semicolons
      "semi": ["error", "never"],
      // Avoid issues with ASI (Automatic Semicolon Insertion)
      "no-unexpected-multiline": "error"
    }
  }
]

export default eslintConfig
