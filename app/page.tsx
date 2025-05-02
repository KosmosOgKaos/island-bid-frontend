'use client'

import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  Input,
  Text,
  Tooltip,
  Tag,
  RadioButton,
  AlertMessage,
  ActionCard,
  GridContainer,
  GridRow,
  GridColumn,
  BulletList,
  Bullet,
  Page,
  Stack,
} from '@island.is/island-ui/core'
import { Header } from '@/components/Header/Header'
import { ApolloWrapper } from '@/components/ApolloWrapper/ApolloWrapper'

export default function Home() {
  return (
    <ApolloWrapper>
      <Page>
        <Header title="Island Components" />
        <GridContainer>
          <GridRow>
            <GridColumn span="12/12" paddingTop={5} paddingBottom={5}>
              <Stack space={3}>
                <Box background="blue200" padding={2}>
                  <Text color="blue600">Just a box</Text>
                </Box>
                <Text variant="h1" color="blue400">
                  Text h1: Hello
                </Text>
                <Accordion>
                  <AccordionItem label="Accordion Item" id="id_1">
                    <Text>Accordion Item Content</Text>
                  </AccordionItem>
                </Accordion>
                <Button variant="primary">Primary button</Button>
                <Box display="flex" alignItems="center">
                  <Text>With tooltip</Text>
                  <Tooltip text="This is a helpful tooltip" />
                </Box>
                <Input
                  label="Input field"
                  name="name"
                  size="sm"
                  onChange={e => console.log(e.target.value)}
                />
                <Tag>Tag</Tag>
                <RadioButton
                  label="Radio button"
                  name="radio"
                  value="radio"
                  onChange={() => console.log('radio')}
                />
                <Box width="half">
                  <AlertMessage
                    title="Alert message"
                    type="warning"
                    message="This is a warning message"
                  />
                </Box>
                <Box width="half">
                  <ActionCard
                    eyebrow="Action card"
                    heading="Action card"
                    text="This is a description"
                    cta={{
                      label: 'Button',
                      variant: 'primary',
                    }}
                  />
                </Box>
                <BulletList>
                  <Bullet>Bullet 1</Bullet>
                  <Bullet>Bullet 2</Bullet>
                  <Bullet>Bullet 3</Bullet>
                </BulletList>
              </Stack>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Page>
    </ApolloWrapper>
  )
}
