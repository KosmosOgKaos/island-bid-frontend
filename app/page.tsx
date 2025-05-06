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
  Divider,
  Header
} from '@island.is/island-ui/core'
import { ApolloWrapper } from '@/components/ApolloWrapper/ApolloWrapper'

import taxLogo from '../assets/taxLogo.png'

export default function Home() {
  return (
    <ApolloWrapper>
      <Page>
        <GridContainer>
          <GridRow>
            <GridColumn span="12/12">
              <Header />
            </GridColumn>
          </GridRow>
        </GridContainer>
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
                            <Button icon="open" iconType="outline" nowrap>
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
      </Page>
    </ApolloWrapper>
  )
}
