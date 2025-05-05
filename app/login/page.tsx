'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Page,
  Header,
  Button,
  Text,
  Stack,
  Input,
  Divider,
} from '@island.is/island-ui/core'

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <Page>
      <GridContainer>
        <GridRow>
          <GridColumn span="12/12">
            <Header />
          </GridColumn>
        </GridRow>
      </GridContainer>
      <GridContainer>
        <Box paddingY={[3, 3, 6]}>
          <GridRow>
            <GridColumn
              offset={['0', '0', '0', '0', '2/12']}
              span={['12/12', '12/12', '10/12', '8/12', '8/12']}
            >
              <Box paddingTop={[0, 0, 4]}>
                <Stack space={4}>
                  <Box display="flex" justifyContent="center">
                    <Box
                      borderRadius="large"
                      padding={6}
                      marginY={4}
                      borderWidth="standard"
                      borderColor="blue200"
                      borderStyle="solid"
                      width="half"
                      textAlign="center"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Text variant="eyebrow" color="blue400" marginBottom={2}>
                        Rafræn skilríki í síma
                      </Text>
                      <Text variant="h2" marginBottom={2}>
                        Skráðu þig inn
                      </Text>
                      <Text marginBottom={3}>Ísland.is - Mínar síður</Text>
                      <Box width="full" marginBottom={3} textAlign="left">
                        <Input
                          name="phoneNumber"
                          label="Símanúmer"
                          placeholder="000-0000"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                          type="tel"
                          backgroundColor="blue"
                        />
                      </Box>
                      <Box width="full">
                        <Button
                          onClick={() => router.push('/application')}
                          fluid
                          disabled={!phoneNumber}
                        >
                          Auðkenna
                        </Button>
                      </Box>

                      <Box
                        width="full"
                        marginTop={7}
                        marginBottom={5}
                        position="relative"
                        display="flex"
                        alignItems="center"
                      >
                        <Box width="full">
                          <Divider />
                        </Box>
                        <Box
                          position="absolute"
                          width="full"
                          display="flex"
                          justifyContent="center"
                        >
                          <Box background="white" paddingX={2}>
                            <Text variant="small" color="dark400">
                              Eða skráðu þig inn með
                            </Text>
                          </Box>
                        </Box>
                      </Box>

                      <Box width="full" display="flex" flexDirection="column">
                        <Box marginBottom={2}>
                          <Button
                            size="small"
                            onClick={() => router.push('/application')}
                            variant="ghost"
                            fluid
                          >
                            Auðkennisappinu
                          </Button>
                        </Box>
                        <Button
                          size="small"
                          onClick={() => router.push('/application')}
                          variant="ghost"
                          fluid
                        >
                          Skilríki á korti
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </GridColumn>
          </GridRow>
        </Box>
      </GridContainer>
    </Page>
  )
}
