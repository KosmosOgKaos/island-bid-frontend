import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import {
  Box,
  FormStepper,
  GridContainer,
  GridRow,
  GridColumn,
  Button,
  Header,
} from '@island.is/island-ui/core'
import { formSteps } from '../FormSteps/formSteps'

interface FormData {
  consent?: boolean
  name?: string
  nationalId?: string
  email?: string
  phone?: string
  [key: string]: unknown
}

export const ApplicationForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepId = searchParams.get('step') || formSteps[0].id
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
      paddingBottom={20}
    >
      <Box background="white" marginBottom={5}>
        <GridContainer>
          <Header
            authenticated
            userName="Guðrún Jónsdóttir"
            language="EN"
            info={{
              title: 'Umsóknareyðublað',
              description: 'Island.is',
            }}
            userAsDropdown={true}
          />
        </GridContainer>
      </Box>

      <Head>
        <title>Island.is Umsókn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '9/12']}>
            <Box
              background="white"
              borderRadius="large"
              paddingY={8}
              paddingX={12}
            >
              {renderStep()}
            </Box>
          </GridColumn>

          <GridColumn span={['12/12', '12/12', '3/12']}>
            <Box paddingTop={[0, 0, 10]} position="sticky" top={0}>
              <FormStepper
                sections={formStepperSections}
                activeSection={activeStepIndex}
              />
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}
