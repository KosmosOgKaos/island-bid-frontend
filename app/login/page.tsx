'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Page,
  Button,
  Text,
  Stack,
  Input,
  Divider,
  Logo,
} from '@island.is/island-ui/core'
import { useLoginMutation } from '@/lib/graphql'
import { useSsn } from '../context/SsnContext'

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loginMutation] = useLoginMutation()
  const { setSsn } = useSsn()

  const handleLogin = async () => {
    try {
      const result = await loginMutation({
        variables: {
          phoneNumber,
        },
      })
      if (result.data?.login.success) {
        setSsn(result.data.login.ssn)
        router.push('/application')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Page>
      <GridContainer>
        <Box paddingY={[3, 3, 6]}>
          <GridRow>
            <GridColumn
              offset={['0', '0', '0', '0', '2/12']}
              span={['12/12', '12/12', '10/12', '8/12', '8/12']}
            >
              <Box paddingTop={[0, 0, 4]}>
                <Stack space={4}>
                  <Box display="flex" justifyContent="center" position="relative">
                    <Box 
                      position="absolute" 
                      style={{ top: '-3px', zIndex: 10 }}
                      background="white" 
                      padding={2}
                      borderRadius="large"
                    >
                      <Logo width={48} iconOnly />
                    </Box>
                    <Box
                      borderRadius="large"
                      padding={6}
                      marginY={4}
                      paddingTop={8}
                      borderWidth="standard"
                      borderColor="blue200"
                      borderStyle="solid"
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
                          onClick={handleLogin}
                          fluid
                          disabled={!phoneNumber || phoneNumber.length < 7}
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
