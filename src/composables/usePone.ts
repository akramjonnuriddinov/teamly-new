export const updateNumber = (phone: any) => {
  if (!phone) return ''

  const digits = phone.replace(/\D/g, '')

  let maskedNumber = digits
    .slice(0, 9)
    .replace(/^(\d{2})/, '($1) ')
    .replace(/(\d{3})(\d{2})/, '$1 $2 ')

  switch (true) {
    case phone.endsWith(') ') && digits.length <= 2:
      maskedNumber = maskedNumber.slice(0, -2)
      break
    case phone.endsWith(') ') && digits.length <= 5:
      maskedNumber = maskedNumber.slice(0, -1)
      break
    case phone.endsWith(') ') && digits.length <= 8 && maskedNumber.endsWith(' '):
      maskedNumber = maskedNumber.slice(0, -1)
      break
    case phone.endsWith(' '):
      maskedNumber = maskedNumber.slice(0, -1)
      break
    default:
      break
  }

  return maskedNumber
}