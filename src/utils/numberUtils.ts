export const parseIcelandicAmount = (
  amountStr: string | number | undefined
): number => {
  if (typeof amountStr === 'number') {
    return amountStr
  }

  if (typeof amountStr !== 'string') {
    return 0
  }

  const cleanedStr = amountStr.replace(/[^0-9,.]/g, '')

  let normalizedStr = cleanedStr.replace(/\./g, '')
  normalizedStr = normalizedStr.replace(/,/g, '.')

  return parseFloat(normalizedStr) || 0
}

export const formatIcelandicAmount = (
  amount: number,
  includeCurrency = true
): string => {
  let formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  formatted = formatted.replace(/,/g, '.')
  return includeCurrency ? `${formatted} kr.` : formatted
}

export const calculateTotal = <
  T extends Record<string, string | number | undefined>
>(
  items: T[],
  key = 'amount'
): number => {
  return items.reduce((sum, item) => {
    const amount = parseIcelandicAmount(item[key])
    return sum + amount
  }, 0)
}
