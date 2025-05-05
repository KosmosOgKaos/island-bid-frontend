import React from 'react'
import {
  Box,
  GridColumn,
  GridRow,
  Input,
  Stack,
  Text,
} from '@island.is/island-ui/core'

interface FormProps {
  data: {
    companyName?: string
    income?: string
    totalIncome?: string
    [key: string]: unknown
  }
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const Income = ({ form }: { form: FormProps }) => {
  const { data, onChange } = form

  return (
    <Box>
      <Text variant="h2" marginBottom={2}>
        Tekjur ársins 2024
      </Text>
      <Text marginBottom={5}>
        Vinsamlegast fylltu út tekjurnar þínar. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Cumque optio necessitatibus omnis.
      </Text>

      <Stack space={5}>
        <Box>
          <Text variant="h3" marginBottom={3}>
            Launtekjur og starfstengdar greiðslur
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="companyName"
                label="Heiti fyrirtækis"
                value={data.companyName || 'Norðurljós Software'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="income"
                label="Launafjárhæð"
                value={data.income || '9.360.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="companyName"
                label="Heiti fyrirtækis"
                value={data.companyName || 'Mús & merki ehf.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="income"
                label="Launafjárhæð"
                value={data.income || '900.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="totalIncome"
                label="Samtals"
                value={data.totalIncome || '10.260.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>
        <Box>
          <Text variant="h3" marginBottom={3}>
            Ökutækjastyrkur, dagpeningar og hlunnindi
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="companyName"
                label="Heiti tekjuliðs"
                value={data.companyName || 'Dagpeningar'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="income"
                label="Launafjárhæð"
                value={data.income || '120.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="totalIncome"
                label="Dagpeningafjárhæð"
                value={data.totalIncome || '120.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>
        <Box>
          <Text variant="h3" marginBottom={3}>
            Lífeyrisgreiðslur, greiðslur frá Tryggingastofnun, aðrar
            bótagreiðslur, styrkir o.fl.
          </Text>
          <GridRow>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="companyName"
                label="Styrk veitandi"
                value={data.companyName || 'Norðurljós Software ehf.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="income"
                label="íþróttastyrkur"
                value={data.income || '75.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="companyName"
                label="Styrk veitandi"
                value={data.companyName || 'VR'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
            <GridColumn span={['12/12', '6/12']} paddingBottom={3}>
              <Input
                name="income"
                label="Starfsmenntastyrkur"
                value={data.income || '130.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={['12/12', '12/12']} paddingBottom={3}>
              <Input
                name="totalIncome"
                label="Samtals"
                value={data.totalIncome || '205.000 kr.'}
                onChange={onChange}
                type="text"
                readOnly
              />
            </GridColumn>
          </GridRow>
        </Box>
      </Stack>
    </Box>
  )
}
