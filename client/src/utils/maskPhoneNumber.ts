export function maskInputPhoneNumber(phone: string) {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

export function unmaskPhoneNumber(phone: string) {
  return phone.replace(/\D/g, '');
}
