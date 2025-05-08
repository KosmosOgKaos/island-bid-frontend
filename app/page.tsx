'use client'

import {
  Box,
  Button,
  GridContainer,
  GridRow,
  GridColumn,
  Text,
  Page,
  Link,
  Stack,
  Breadcrumbs,
  BulletList,
  Bullet,
  Navigation,
} from '@island.is/island-ui/core'
import { ApolloWrapper } from '@/components/ApolloWrapper'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { useRouter } from 'next/navigation'
import { useSsn } from './context/SsnContext'

import taxLogo from '../assets/taxLogo.png'

export default function Home() {
  const router = useRouter()
  const { ssn } = useSsn()

  const handleStartApplication = () => {
    if (ssn) {
      router.push('/application')
    } else {
      router.push('/login')
    }
  }

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
                    <Text variant="eyebrow" as="span" color="purple600">
                      Þjónustuaðili
                    </Text>
                    <Text variant="h3" as="h3" color="purple600">
                      Skatturinn
                    </Text>
                  </Box>
                </Box>
              </Link>
              <Box marginTop={3}>
                <Navigation
                  baseId="page-navigation"
                  title="Efnisyfirlit"
                  colorScheme="blue"
                  items={[
                    {
                      title: 'Skattframtal 2024',
                      active: true,
                      items: [
                        { title: 'Almennt um skattframtali', active: true },
                        { title: 'Auðkenning: Rafræn skilríki og veflyklar' },
                        { title: 'Skattframtal fyrra árs og staðfest afrit' },
                        { title: 'Bráðabirgðaútreikningur á gjöldum' },
                        { title: 'Takmarkanir á útreikningi' },
                      ],
                    },
                  ]}
                />
              </Box>
            </Box>
            <GridContainer>
              <GridRow>
                <GridColumn
                  offset={['0', '0', '0', '0', '1/9']}
                  span={['9/9', '9/9', '9/9', '9/9', '7/9']}
                >
                  <Box paddingLeft={[0, 0, 6, 6, 0]} marginBottom={20}>
                    <Box
                      paddingBottom={[2, 2, 4]}
                      display={['none', 'none', 'block']}
                      printHidden
                    >
                      <Breadcrumbs
                        items={[
                          {
                            title: 'Skatturinn',
                            href: 'https://www.skatturinn.is/',
                          },
                          {
                            isTag: true,
                            title: 'Skattframtal 2024',
                          },
                        ]}
                      />
                    </Box>
                    <Stack space={7}>
                      <Box>
                        <Text variant="h1" as="h1" marginBottom={2}>
                          Skattframtal 2024
                        </Text>
                        <Text>
                          Ár hvert þurfum við öll að skila inn skattframtali.
                          Þar gefum við upp hvað við höfum haft í tekjur, hvaða
                          eignir við eigum og hvaða skuldir.
                        </Text>
                      </Box>
                      <Box
                        width="full"
                        background="blue100"
                        display="flex"
                        justifyContent="spaceBetween"
                        borderRadius="large"
                        padding={4}
                        alignItems={['flexStart', 'center']}
                        flexDirection={['column', 'row']}
                      >
                        <Box marginRight={[0, 2]} marginBottom={[3, 0]}>
                          <Text variant="h3" as="h3" color="blue600">
                            Skila skattframtali fyrir 2024
                          </Text>
                        </Box>
                        <Button
                          icon="open"
                          iconType="outline"
                          nowrap
                          onClick={handleStartApplication}
                          dataTestId="application-apply-button"
                        >
                          Hefja skattframtal
                        </Button>
                      </Box>

                      <Box>
                        <Text variant="h2" as="h2" marginBottom={2} id="tekjur">
                          Tekjur
                        </Text>
                        <Text>
                          Gefðu upp allar tekjur sem þú hafðir á síðasta ári,
                          þar með talið:
                        </Text>

                        <Text
                          variant="h3"
                          as="h3"
                          marginTop={5}
                          marginBottom={2}
                        >
                          Vinnulaun
                        </Text>
                        <BulletList>
                          <Bullet>
                            Launatekjur – t.d. laun frá vinnuveitanda (þetta
                            kemur oft sjálfkrafa frá launagreiðanda)
                          </Bullet>
                          <Bullet>
                            Atvinnurekstur – ef þú ert sjálfstætt starfandi
                          </Bullet>
                          <Bullet>
                            Fjármagnstekjur – t.d. vextir, arður, söluhagnaður
                            af eignum
                          </Bullet>
                          <Bullet>Ógreidd laun</Bullet>
                          <Bullet>Launatekjur erlendis</Bullet>
                          <Bullet>Laun frá alþjóðastofnunum</Bullet>
                          <Bullet>Staðaruppbót</Bullet>
                          <Bullet>Laun í námsleyfi</Bullet>
                        </BulletList>

                        <Text
                          variant="h3"
                          as="h3"
                          marginTop={5}
                          marginBottom={2}
                        >
                          Hlunnindi
                        </Text>
                        <BulletList>
                          <Bullet>Bifreiðahlunnindi</Bullet>
                          <Bullet>Önnur vélknúin ökutæki - flugvélar</Bullet>
                          <Bullet>Fatahlunnindi</Bullet>
                          <Bullet>Fæðishlunnindi</Bullet>
                          <Bullet>Húsnæðishlunnindi</Bullet>
                        </BulletList>
                        <Box marginTop={2}>
                          <Link href="https://www.skatturinn.is/einstaklingar/tekjur-og-fradraettir/launatekjur-og-hlunnindi/nr/32">
                            <Text color="blue400" fontWeight="semiBold">
                              Kynntu þér launatekjur og hlunnindi inni á
                              Skatturinn.is
                            </Text>
                          </Link>
                        </Box>

                        <Text
                          variant="h3"
                          as="h3"
                          marginTop={5}
                          marginBottom={2}
                        >
                          Skattfrjálsar tekjur
                        </Text>
                        <Text marginBottom={2}>
                          Nokkrar undantekningar eru frá skattskyldum tekjum.
                        </Text>
                        <Text marginBottom={2}>
                          Barnabætur, vaxtabætur, sérstök vaxtaniðurgreiðsla og
                          húsaleigubætur teljast ekki til skattskyldra tekna.
                        </Text>
                        <Text marginBottom={2}>
                          Þá telst ákvarðaður persónuafsláttur og
                          sjómannaafsláttur ekki til skattskyldra tekna.
                        </Text>
                        <Box marginTop={2}>
                          <Link href="https://www.skatturinn.is/einstaklingar/tekjur-og-fradraettir/skattfrjalsar-tekjur/">
                            <Text color="blue400" fontWeight="semiBold">
                              Kynntu þér skattfrjálsar tekjur á Skatturinn.is.
                            </Text>
                          </Link>
                        </Box>
                      </Box>
                      <Box>
                        <Text variant="h2" as="h2" marginBottom={2}>
                          Eignir
                        </Text>
                        <Text marginBottom={2}>
                          Gefðu upp eignir sem þú átt í lok árs, t.d.:
                        </Text>
                        <BulletList>
                          <Bullet>
                            Fasteignir – húsnæði, sumarhús, íbúðir
                          </Bullet>
                          <Bullet>
                            Fjármunir – bifreiðar, bankainnistæður, hlutabréf,
                            inneign í lífeyrissjóðum
                          </Bullet>
                          <Bullet>Hvers konar eignaréttindi</Bullet>
                        </BulletList>
                        <Box marginTop={2}>
                          <Link href="https://www.skatturinn.is/einstaklingar/framtal-og-alagning/eignir-og-skuldir/">
                            <Text color="blue400" fontWeight="semiBold">
                              Kynntu þér eignir og skuldir á Skatturinn.is.
                            </Text>
                          </Link>
                        </Box>
                      </Box>
                      <Box>
                        <Text variant="h2" as="h2" marginBottom={2}>
                          Skuldir
                        </Text>
                        <Text marginBottom={2}>
                          Gefðu upp allar tekjur sem þú hafðir á síðasta ári,
                          þar með talið:
                        </Text>
                        <BulletList>
                          <Bullet>Húsnæðislán</Bullet>
                          <Bullet>Bílalán og önnur neyslulán</Bullet>
                          <Bullet>Yfirdráttur og kreditkortaskuldir</Bullet>
                          <Bullet>
                            Skattar og opinber gjöld sem ekki hafa verið greidd
                          </Bullet>
                        </BulletList>
                        <Text marginTop={2}>
                          Framteljandi ber ábyrgð á að færa réttar upplýsingar
                          um skuldir. Upplýsingar um skuldir má finna í netbanka
                          eða ársyfirlitum lánastofnana.
                        </Text>
                        <Box marginTop={2}>
                          <Link href="https://www.skatturinn.is/einstaklingar/framtal-og-alagning/eignir-og-skuldir/">
                            <Text color="blue400" fontWeight="semiBold">
                              Kynntu þér eignir og skuldir á Skatturinn.is.
                            </Text>
                          </Link>
                        </Box>

                        <Text marginTop={2}>
                          Farðu vel yfir allar upplýsingar áður en þú sendir
                          framtalið inn. Mikilvægt er að allar upplýsingar séu
                          réttar og uppfærðar. Ef upplýsingar vantar eða eru
                          rangar getur það haft áhrif á álagningu.
                        </Text>
                      </Box>
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
