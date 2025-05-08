const monthNames = [
  'janúar',
  'febrúar',
  'mars',
  'apríl',
  'maí',
  'júní',
  'júlí',
  'ágúst',
  'september',
  'október',
  'nóvember',
  'desember',
]

export const formatIcelandicDate = (dateString?: string): string => {
  if (!dateString) return 'Ekki skráð'

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${day}. ${month} ${year}`
  } catch {
    return dateString
  }
}
