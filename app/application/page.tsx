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
  toast,
  ToastContainer,
  Hidden,
  AlertMessage,
} from '@island.is/island-ui/core'
import { formSteps } from '@/components/FormSteps/formSteps'
import { IncomeItem, PropertyItem, DebtItem, Person } from '@/lib/types'
import { validateStep } from '@/utils/formValidation'
import Header from '../../src/components/Header'
import taxLogo from '../../assets/taxLogo.png'
import { useSsn } from '../context/SsnContext'
import { useName } from '../context/NameContext'
import { useCreateSubmissionMutation } from '@/lib/graphql'

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
  const { ssn, setSsn } = useSsn()
  const { name, setName } = useName()
  const [isClient, setIsClient] = useState(false)
  
  // To help with hydration error for header
  useEffect(() => {
    setIsClient(true)
  }, [])
  const searchParams = useSearchParams()
  const stepId = searchParams?.get('step') || formSteps[0].id
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [validationError, setValidationError] = useState<string | null>(null)
  const [createSubmission] = useCreateSubmissionMutation()

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

    // Validate the current step
    const validationResult = validateStep(currentStep.id, formData)

    if (!validationResult.isValid) {
      setValidationError(validationResult.errorMessage || '')
      return
    }

    setValidationError(null)

    if (currentStep.id === 'overview') {
      submitData()
    }
    router.push(`/application?step=${nextStepId}`)
  }

  const submitData = async () => {
    try {
      if (!ssn) {
        return
      }

      // Transform the data to match CreateSubmissionInput type
      const transformedData = {
        incomes: (formData.incomes || []).map((income: IncomeItem) => ({
          type: income.type,
          payer: income.payer,
          amount: income.amount,
          currency: income.currency,
          explanation: income.explanation,
        })),
        properties: (formData.properties || []).map(
          (property: PropertyItem) => ({
            type: property.type,
            valueName: property.valueName,
            value: property.value,
            currency: property.currency,
            properties: property.properties,
          })
        ),
        debts: (formData.debts || []).map((debt: DebtItem) => ({
          type: debt.type,
          description: debt.description,
          currency: debt.currency,
          creditor: debt.creditor,
          creditorSsn: debt.creditorSsn,
          loanNumber: debt.loanNumber,
          loanStartDate: debt.loanStartDate,
          loanDurationYears: debt.loanDurationYears,
          yearPaymentTotal: debt.yearPaymentTotal,
          nominalPaymentTotal: debt.nominalPaymentTotal,
          interestPaymentTotal: debt.interestPaymentTotal,
          remaining: debt.remaining,
          properties: debt.properties,
        })),
      }

      await createSubmission({
        variables: {
          ssn,
          input: transformedData,
        },
      })
    } catch (error) {
      console.error('Error submitting tax data:', error)
    }
  }

  const goToPrevStep = () => {
    setValidationError(null)
    if (currentStep && currentStep.prev) {
      router.push(`?step=${currentStep.prev}`)
    }
  }

  const saveApplication = () => {
    try {
      // Save current form data to localStorage
      localStorage.setItem('taxData', JSON.stringify(formData))
      toast.success('Upplýsingar þínar hafa verið vistaðar')
    } catch (error) {
      console.error('Error saving application:', error)
      toast.error('Villa kom upp við vistun', { autoClose: 3000 })
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
          <AlertMessage
            type="error"
            title=""
            testid="validationErrorMessage"
            message={validationError}
          />
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
            <Button
              onClick={goToPrevStep}
              variant="ghost"
              preTextIcon="arrowBack"
            >
              Til baka
            </Button>
          )}
          <Box display="flex">
            {currentStep.next && (
              <Box display="flex">
                {currentStep.prev && (
                  <Hidden below="sm">
                    <Box marginRight={2}>
                      <Button
                        onClick={saveApplication}
                        variant="ghost"
                        icon="save"
                        iconType="outline"
                      >
                        Vista
                      </Button>
                    </Box>
                  </Hidden>
                )}
                <Button
                  onClick={goToNextStep}
                  icon={
                    currentStep.id === 'overview' ? 'checkmark' : 'arrowForward'
                  }
                >
                  {currentStep.id === 'overview'
                    ? 'Skila skattframtali'
                    : 'Halda áfram'}
                </Button>
              </Box>
            )}
          </Box>
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
            onLogout={() => {
              setSsn('')
              setName('')
              router.push('/')
            }}
            userName={isClient && name || ''}
            info={{
              title: 'Skatturinn',
              description: 'Sækja um skattframtal',
            }}
            userAsDropdown={true}
          />
          <ToastContainer />
        </GridContainer>
      </Box>
      <GridContainer>
        <GridRow direction={['columnReverse', 'columnReverse', 'row']}>
          <GridColumn span={['12/12', '12/12', '9/12']}>
            <Box
              background="white"
              borderRadius="large"
              paddingTop={[5, 8]}
              paddingX={[3, 6, 6, 6, 12]}
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
