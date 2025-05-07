'use client'

import React from 'react'
import {
  Box,
  Button,
  Columns,
  Column,
  FocusableBox,
  GridContainer,
  GridRow,
  GridColumn,
  Hidden,
  Logo,
  Header as IslandHeader,
} from '@island.is/island-ui/core'
import NextLink from 'next/link'

interface HeaderProps {
  authenticated?: boolean
  userName?: string
  info?: {
    title: string
    description: string
  }
  userAsDropdown?: boolean
  onLogout?: () => void
}

export const Header = ({
  authenticated,
  userName,
  info,
  userAsDropdown,
  onLogout,
}: HeaderProps) => {
  if (authenticated || userName || info) {
    return (
      <IslandHeader
        authenticated={authenticated}
        userName={userName}
        info={info}
        userAsDropdown={userAsDropdown}
        onLogout={onLogout}
        logoRender={(defaultLogo: React.ReactNode) => (
          <NextLink href="/" style={{ cursor: 'pointer' }}>
            {defaultLogo}
          </NextLink>
        )}
      />
    )
  }

  return (
    <header>
      <GridContainer>
        <GridRow>
          <GridColumn span="12/12" paddingTop={4} paddingBottom={4}>
            <Columns alignY="center" space={2}>
              <Column width="content">
                <FocusableBox href="/">
                  <Hidden above="md">
                    <Logo id="logo" width={40} iconOnly />
                  </Hidden>
                  <Hidden below="lg">
                    <Logo id="logo-mobile" width={160} />
                  </Hidden>
                </FocusableBox>
              </Column>
              <Column>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flexEnd"
                  width="full"
                >
                  <Hidden below="lg">
                    <Box marginLeft={2}>
                      <Button variant="utility" icon="person" as="span">
                        Mínar síður
                      </Button>
                    </Box>
                  </Hidden>
                  <Box
                    marginLeft={2}
                    display={['none', 'none', 'none', 'block']}
                  >
                    <Button variant="utility" as="span">
                      EN
                    </Button>
                  </Box>
                  <Box marginLeft={2}>
                    <Button variant="utility" icon="menu" as="span">
                      Valmynd
                    </Button>
                  </Box>
                </Box>
              </Column>
            </Columns>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </header>
  )
}

export default Header
