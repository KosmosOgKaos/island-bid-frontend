'use client'

import React from 'react'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Text,
  Link,
  Stack,
  Divider,
} from '@island.is/island-ui/core'
import taxLogo from '../../../assets/taxLogo.png'

export const Footer = () => {
  return (
    <Box background="blue100" paddingY={6} as="footer">
      <GridContainer>
        <GridRow>
          <GridColumn span="12/12">
            <Link href="https://www.skatturinn.is/" underline="normal">
              <Box paddingBottom={5} display="flex" alignItems="center">
                <Box style={{ flex: '0 0 50px' }} marginRight={3}>
                  <Box
                    component="img"
                    alt="Tax logo"
                    src={taxLogo.src}
                    width="full"
                  />
                </Box>
                <Text variant="h2" as="h2" color="purple600">
                  Skatturinn
                </Text>
              </Box>
            </Link>
            <Divider weight="regular" thickness="standard" />
            <Box paddingY={3}></Box>
          </GridColumn>
          <GridColumn span={['12/12', '12/12', '6/12']}>
            <Stack space={2}>
              <Link
                href="https://www.skatturinn.is/um-skatturinn/almennar-upplysingar/"
                underline="normal"
              >
                <Text variant="h5" color="purple600">
                  Um Skatturinn
                </Text>
              </Link>
              <Link
                href="https://www.skatturinn.is/einstaklingar/"
                underline="normal"
              >
                <Text variant="h5" color="purple600">
                  Einstaklingar
                </Text>
              </Link>
              <Link
                href="https://www.skatturinn.is/atvinnurekstur/"
                underline="normal"
              >
                <Text variant="h5" color="purple600">
                  Atvinnurekstur
                </Text>
              </Link>
            </Stack>
          </GridColumn>
          <GridColumn
            span={['12/12', '12/12', '6/12']}
            paddingTop={[4, 4, 0]}
          >
            <Stack space={2}>
              <Text variant="h5" color="purple600">
                Hafðu samband
              </Text>
              <Link href="tel:4421000" underline="normal">
                <Text variant="default" color="purple600">
                  Sími: 442-1000
                </Text>
              </Link>
              <Link
                href="mailto:skatturinn@skatturinn.is"
                underline="normal"
              >
                <Text variant="default" color="purple600">
                  skatturinn@skatturinn.is
                </Text>
              </Link>
              <Text variant="default" color="purple600">
                Opið: Mán-fim 9:00-15:30, fös 9:00-14:00
              </Text>
            </Stack>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default Footer
