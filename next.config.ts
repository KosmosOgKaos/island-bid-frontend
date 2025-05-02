import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Only lint these specific directories
    dirs: ['app', 'src/components', 'src/utils', 'src/styles', 'src/lib/(?!island-ui)'],
    // Don't skip ESLint during builds - we'll just be selective about what gets linted
    ignoreDuringBuilds: false,
  },
}

// Apply the vanilla-extract plugin
export default withVanillaExtract(nextConfig)
