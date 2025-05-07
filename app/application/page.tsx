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
import { IncomeItem, PropertyItem, DebtItem, Person } from '@/lib/types'
import Header from '../../src/components/Header'
import taxLogo from '../../assets/taxLogo.png'
import { useSsn } from '../context/SsnContext'

interface TaxData {
  person?: Person
  incomes?: IncomeItem[]
  properties?: PropertyItem[]
  debts?: DebtItem[]
  [key: string]: unknown
}

interface FormData {
  consent?: boolean
  consentChanged?: boolean
  person?: Person
  incomes?: IncomeItem[]
  properties?: PropertyItem[]
  debts?: DebtItem[]
  [key: string]: unknown
}

export default function ApplicationPage() {
  const router = useRouter()
  const { ssn } = useSsn()
  const searchParams = useSearchParams()
  const stepId = searchParams?.get('step') || formSteps[0].id
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (!ssn) {
      router.push('/login')
      return
    }
  }, [ssn, router])

  useEffect(() => {
    const index = formSteps.findIndex(step => step.id === stepId)
    if (index !== -1) {
      setActiveStepIndex(index)
    }
  }, [stepId])

  useEffect(() => {
    try {
      const savedTaxData = localStorage.getItem('taxData')

      if (savedTaxData) {
        const parsedTaxData = JSON.parse(savedTaxData)

        // Extract individual data sections and update form state
        if (parsedTaxData.person) {
          setFormData(prevData => ({
            ...prevData,
            person: parsedTaxData.person,
          }))
        }

        if (parsedTaxData.incomes) {
          setFormData(prevData => ({
            ...prevData,
            incomes: parsedTaxData.incomes,
          }))
        }

        if (parsedTaxData.properties) {
          setFormData(prevData => ({
            ...prevData,
            properties: parsedTaxData.properties,
          }))
        }

        if (parsedTaxData.debts) {
          setFormData(prevData => ({
            ...prevData,
            debts: parsedTaxData.debts,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading saved form data from localStorage:', error)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // On data change, this function updates the form data state
    
    if ('type' in e.target && e.target.type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: target.checked,
      }))
      return
    }

    if (name === 'taxData' && typeof value === 'object') {
      const taxData = value as TaxData

      setFormData(prev => {
        const newData = { ...prev }

        if (taxData.person) newData.person = taxData.person
        if (taxData.incomes) newData.incomes = taxData.incomes
        if (taxData.properties) newData.properties = taxData.properties
        if (taxData.debts) newData.debts = taxData.debts

        return newData
      })
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const currentStep = formSteps[activeStepIndex]

  const goToNextStep = () => {
    const nextStepId = currentStep.next
    if (!nextStepId) {
      return
    }

    // Handle data collection step special validation
    if (currentStep.id === 'dataCollection') {
      if (!formData.consent) {
        setValidationError('Vinsamlegast samþykktu að gögn verði sótt rafrænt.')
        return
      }

      setValidationError(null)
      router.push(`/application?step=${nextStepId}`)
    } else {
      // For other steps, navigate immediately
      setValidationError(null)
      router.push(`/application?step=${nextStepId}`)
    }
  }

  const goToPrevStep = () => {
    if (currentStep && currentStep.prev) {
      router.push(`?step=${currentStep.prev}`)
    }
  }

  const renderStep = () => {
    const StepComponent = currentStep.component

    return (
      <Box>
        <StepComponent
          form={{
            data: formData,
            onChange: handleInputChange,
          }}
        />

        {validationError && (
          <Text variant="eyebrow" color="red600">
            {validationError}
          </Text>
        )}

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
            <Button onClick={goToNextStep} icon="arrowForward">
              Halda áfram
            </Button>
          )}
        </Box>
      </Box>
    )
  }

  const formStepperSections = formSteps
    .filter(step => step.title)
    .map(step => ({
      name: step.title || '',
      children: [],
    }))

  return (
    <Box
      background="purple100"
      display="flex"
      flexDirection="column"
      style={{ minHeight: '100vh' }}
      width="full"
      paddingBottom={30}
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

          {activeStepIndex !== formSteps.length - 1 && (
            <GridColumn span={['12/12', '12/12', '3/12']}>
              <Box
                display="flex"
                flexDirection="column"
                height="full"
                justifyContent="spaceBetween"
                paddingBottom={2}
                marginTop={[0, 0, 3]}
              >
                <Box top={0} position="sticky" style={{ marginTop: '-20px' }}>
                  <FormStepper
                    sections={formStepperSections}
                    activeSection={activeStepIndex}
                  />
                </Box>

                <Box display={['none', 'none', 'block']}>
                  <Box
                    background="purple100"
                    borderRadius="large"
                    paddingBottom={6}
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
          )}
        </GridRow>
      </GridContainer>
    </Box>
  )
}
