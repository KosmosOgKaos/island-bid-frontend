'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Box,
  FormStepper,
  GridContainer,
  GridRow,
  GridColumn,
  Button,
  Text,
} from '@island.is/island-ui/core'
import { formSteps } from '@/components/FormSteps/formSteps'
import Header from '../../src/components/Header'
import taxLogo from '../../assets/taxLogo.png'

interface FormData {
  consent?: boolean
  name?: string
  nationalId?: string
  email?: string
  phone?: string
  [key: string]: unknown
}

export default function ApplicationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepId = searchParams?.get('step') || formSteps[0].id
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({})

  useEffect(() => {
    const index = formSteps.findIndex(step => step.id === stepId)
    if (index !== -1) {
      setActiveStepIndex(index)
    }
  }, [stepId])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if ('type' in e.target && e.target.type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const goToNextStep = () => {
    const currentStep = formSteps[activeStepIndex]
    if (currentStep && currentStep.next) {
      router.push(`?step=${currentStep.next}`)
    }
  }

  const goToPrevStep = () => {
    const currentStep = formSteps[activeStepIndex]
    if (currentStep && currentStep.prev) {
      router.push(`?step=${currentStep.prev}`)
    }
  }

  const renderStep = () => {
    const currentStep = formSteps[activeStepIndex]
    if (!currentStep) return <div>Step not found</div>

    const StepComponent = currentStep.component

    return (
      <Box>
        <StepComponent
          form={{
            data: formData,
            onChange: handleInputChange,
          }}
        />

        <Box
          paddingY={5}
          borderTopWidth="standard"
          borderStyle="solid"
          borderColor="purple100"
          display="flex"
          flexDirection="row"
          justifyContent={currentStep.prev ? 'spaceBetween' : 'flexEnd'}
          marginTop={4}
        >
          {currentStep.prev && (
            <Button onClick={goToPrevStep} variant="ghost">
              Til baka
            </Button>
          )}
          {currentStep.next && (
            <Button onClick={goToNextStep}>Halda áfram</Button>
          )}
        </Box>
      </Box>
    )
  }

  const formStepperSections = formSteps.map(step => ({
    name: step.title,
    children: [],
  }))

  return (
    <Box
      background="purple100"
      display="flex"
      flexDirection="column"
      style={{ minHeight: '100vh' }}
      width="full"
    >
      <Box background="white" marginBottom={5}>
        <GridContainer>
          <Header
            authenticated={true}
            userName="Jökull Þórðarson"
            info={{
              title: 'Skatturinn',
              description: 'Sækja um skattframtal',
            }}
            userAsDropdown={true}
          />
        </GridContainer>
      </Box>
      <GridContainer>
        <GridRow direction={['columnReverse', 'row']}>
          <GridColumn span={['12/12', '12/12', '9/12']}>
            <Box
              background="white"
              borderRadius="large"
              paddingTop={[5, 8, 8]}
              paddingX={[3, 12, 12]}
              display="flex"
              flexDirection="column"
            >
              {renderStep()}
            </Box>
          </GridColumn>

          <GridColumn span={['12/12', '12/12', '3/12']}>
            <Box
              display="flex"
              flexDirection="column"
              height="full"
              justifyContent="spaceBetween"
              paddingBottom={2}
              marginTop={[0, 0, 3]}
            >
              <Box
                paddingTop={[0, 0, 10]}
                position="sticky"
                top={0}
                style={{ marginTop: '-20px' }}
              >
                <FormStepper
                  sections={formStepperSections}
                  activeSection={activeStepIndex}
                />
              </Box>

              <Box display={['none', 'none', 'block']} marginTop={8}>
                <Box
                  background="purple100"
                  borderRadius="large"
                  padding={4}
                  paddingLeft={0}
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
              </Box>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}
