import React from 'react'
import {
  AlertMessage,
  Box,
  BulletList,
  Bullet,
  Text,
} from '@island.is/island-ui/core'
import companySvg from '../../../assets/company.svg'

export const Done = () => {
  return (
    <Box>
      <Text variant="h2">Staðfesting</Text>
      <Box marginY={5}>
        <AlertMessage
          title="Skattframtal þitt hefur verið sent til Skattsins"
          type="success"
        />
      </Box>
      <Text variant="h3" marginBottom={2}>
        Hvað gerist næst?
      </Text>
      <BulletList>
        <Bullet>
          Unnt er að fá bráðabirgðaútreikning gjalda á vefnum. Með niðurstöðunni
          fylgir uppgjör sem sýnir áætlaða greiðslustöðu framteljanda 1. júní. Í
          texta sem fylgir niðurstöðum eru tiltekin þau atriði sem valdið geta
          skekkjum, s.s. fyrirframgreiðsla vaxtabóta og tekjur erlendis.
        </Bullet>
        <Bullet>
          Ekki geta allir framteljendur fengið útreikning gjalda á vefnum. Það á
          fyrst og fremst við um þá sem ekki áttu lögheimili á Íslandi allt árið
          2023. Í sumum tilfellum, þegar sótt er um samsköttun á vefnum, verður
          ekki hægt að fá útreikning og heldur ekki fyrir sambúðarfólk í óvígðri
          sambúð sem telur fram hvort í sínu lagi (fjölskyldumerking 7). Þeir
          semhafa tekjur erlendis, en áttu lögheimili á Íslandi allt árið, fá
          niðurstöðu þar sem ekki hefur verið tekið tillit til lækkunar vegna
          skattgreiðslna erlendis. Þetta er skýrt nánar í vefframtalinu.{' '}
        </Bullet>
        <Bullet>
          Leiðréttingar á framtali: Þurfi að leiðrétta áritaðar fjárhæðir á
          vefframtali er skrifað ofan í tölurnar sem fyrir eru. Ef leiðrétta
          þarf framtal sem búið er að skila er hægt að senda inn beiðni um
          leiðréttingu á þjónustusíðu. Ekki þarf að fylla út nýtt framtal heldur
          er beiðnin sett fram í textaformi.{' '}
        </Bullet>
      </BulletList>

      <Box marginTop={10} display="flex" justifyContent="center">
        <Box component="img" src={companySvg.src} alt="Company" />
      </Box>
    </Box>
  )
}
