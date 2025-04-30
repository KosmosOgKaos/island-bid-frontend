import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  // Basic configuration
  distDir: '.next',
  experimental: {
    typedRoutes: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  // Custom handling for asset conflicts
  webpack: config => {
    config.module = config.module || {}
    config.module.rules = config.module.rules || []

    // Modify handling of .d.ts files to avoid conflicts
    config.module.rules.push({
      test: /link\.d\.ts$/,
      use: 'ignore-loader',
    })

    return config
  },
}

// Apply the vanilla-extract plugin
export default withVanillaExtract(nextConfig)
