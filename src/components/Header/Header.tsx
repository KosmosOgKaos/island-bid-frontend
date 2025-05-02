import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'
import { useGetRandomStringSuspenseQuery } from '@/lib/graphql'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { data } = useGetRandomStringSuspenseQuery()

  return (
    <Box paddingY={4} background="">
      <Box paddingX={3} marginX="auto">
        <Text variant="h1">{`${title} - ${data?.getRandomString}`}</Text>
      </Box>
    </Box>
  )
}
