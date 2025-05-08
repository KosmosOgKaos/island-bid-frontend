import React, { ChangeEvent, FocusEvent, useRef } from 'react'
import { Input, InputProps } from '@island.is/island-ui/core'
import {
  parseIcelandicAmount,
  formatIcelandicAmount,
} from '@/utils/numberUtils'

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
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const cursorPos = e.target.selectionStart || 0
    const separatorsBefore = (
      e.target.value.substring(0, cursorPos).match(/\./g) || []
    ).length

    const cleanValue = e.target.value.replace(/[^0-9,]/g, '')
    const amount = parseIcelandicAmount(cleanValue)
    const formatted = formatIcelandicAmount(amount)

    onChange(formatted)

    setTimeout(() => {
      if (inputRef.current) {
        const newSeparators = (
          formatted.substring(0, cursorPos + 1).match(/\./g) || []
        ).length
        const newPos = cursorPos + (newSeparators - separatorsBefore)
        inputRef.current.setSelectionRange(newPos, newPos)
      }
    }, 0)
  }

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const numericValue = parseIcelandicAmount(value)
      e.target.value = numericValue > 0 ? numericValue.toString() : ''
    }
  }

  const handleBlur = () => {
    onChange(formatIcelandicAmount(parseIcelandicAmount(value)))
  }

  return (
    <Input
      {...props}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type="text"
      inputMode="numeric"
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}
