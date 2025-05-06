import React, { ChangeEvent, FocusEvent } from 'react'
import { Input, InputProps } from '@island.is/island-ui/core'
import { parseIcelandicAmount, formatIcelandicAmount } from '@/utils/numberUtils'

interface CurrencyInputProps extends Omit<InputProps, 'onChange'> {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
}

/**
 * Currency input component for Icelandic currency format
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    const cleanValue = inputValue.replace(/[^0-9,]/g, '')
    const amount = parseIcelandicAmount(cleanValue)
    const formattedValue = formatIcelandicAmount(amount)
    onChange(formattedValue)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const numericValue = parseIcelandicAmount(value)
      e.target.value = numericValue > 0 ? numericValue.toString() : ''
    }
  }

  const handleBlur = () => {
    const amount = parseIcelandicAmount(value)
    onChange(formatIcelandicAmount(amount))
  }

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type="text"
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}
