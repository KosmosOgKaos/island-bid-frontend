import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box paddingY={4} background="blue100">
      <Box paddingX={3} marginX="auto">
        <Text variant="h1">{title}</Text>
      </Box>
    </Box>
  )
}
