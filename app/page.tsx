'use client'

import {
  Box,
  Button,
  Text,
  GridContainer,
  GridRow,
  GridColumn,
  Page,
  Stack,
  Breadcrumbs,
  Link,
} from '@island.is/island-ui/core'
import { ApolloWrapper } from '@/components/ApolloWrapper'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

import taxLogo from '../assets/taxLogo.png'

export default function Home() {
  return (
    <ApolloWrapper>
      <Page>
        <Header />
        <GridContainer>
          <Box
            display="flex"
            flexDirection="row"
            paddingY={[3, 3, 6]}
            height="full"
            position="relative"
          >
            <Box display={['none', 'none', 'block']}>
              <Link href="https://www.skatturinn.is/">
                <Box
                  background="purple100"
                  borderRadius="large"
                  padding={4}
                  display="flex"
                  alignItems="center"
                >
                  <Box style={{ flex: '0 0 50px' }} marginRight={3}>
                    <Box
                      component="img"
                      alt="Tax logo"
                      src={taxLogo.src}
                      width="full"
                    />
                  </Box>
                  <Box>
                    <Text variant="eyebrow" color="purple600">
                      Þjónustuaðili
                    </Text>
                    <Text variant="h3" color="purple600">
                      Skatturinn
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
            <GridContainer>
              <GridRow>
                <GridColumn
                  offset={['0', '0', '0', '0', '1/9']}
                  span={['9/9', '9/9', '9/9', '9/9', '7/9']}
                >
                  <Box paddingLeft={[0, 0, 6, 6, 0]}>
                    <Box
                      paddingBottom={[2, 2, 4]}
                      display={['none', 'none', 'block']}
                      printHidden
                    >
                      <Breadcrumbs
                        items={[
                          {
                            title: 'Ísland.is',
                            href: 'https://island.is',
                          },
                          {
                            isTag: true,
                            title: 'Skattframtal',
                          },
                        ]}
                      />
                    </Box>
                    <Stack space={3}>
                      <Text variant="h1" as="h1">
                        Sækja um skattframtal
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Text>
                      <Box marginBottom={3}>
                        <Box
                          width="full"
                          background="blue100"
                          display="flex"
                          justifyContent="spaceBetween"
                          borderRadius="large"
                          paddingY={4}
                          paddingX={4}
                          alignItems={['flexStart', 'center']}
                          flexDirection={['column', 'row']}
                        >
                          <Box marginRight={[0, 2]} marginBottom={[3, 0]}>
                            <Text variant="h3" color="blue600">
                              Umsókn um skattframtal
                            </Text>
                          </Box>
                          <Link href="/login" skipTab>
                            <Button
                              icon="open"
                              iconType="outline"
                              data-testid="application-apply-button"
                              nowrap
                            >
                              Sækja um
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                      <Text variant="h3">Hvernig sæki ég um?</Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Text>
                      <Text variant="h3">Hvernig sæki ég um?</Text>
                      <Text marginBottom={30}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Text>
                    </Stack>
                  </Box>
                </GridColumn>
              </GridRow>
            </GridContainer>
          </Box>
        </GridContainer>
        <Footer />
      </Page>
    </ApolloWrapper>
  )
}
