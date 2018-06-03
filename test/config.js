export const TARGET_URL = 'http://preview.airwallex.com:30001'

export const PAYMENT_METHODS = ['SWIFT', 'LOCAL']

export const ACCOUNT_NAME = {min: 2, max: 10}
export const ACCOUNT_NUMBER_US = {min: 1, max: 17}
export const ACCOUNT_NUMBER_AU = {min: 6, max: 9}
export const ACCOUNT_NUMBER_CN = {min: 8, max: 20}

export const BSB_CODE = 6
export const ABA_CODE = 9

export const VALID_SWIFT_PAYLOAD = {
  payment_method: "SWIFT",
  bank_country_code: "US",
  account_name: "John Smith",
  account_number: "12345667711",
  swift_code: "ICBCUSBJ",
  aba: "11122233A"
}

export const VALID_SWIFT_PAYLOAD_AU = {
  payment_method: "SWIFT",
  bank_country_code: "AU",
  account_name: "John Smith",
  account_number: "12345661",
  swift_code: "ICBCAUBJ",
  bsb: "11122A"
}

export const VALID_SWIFT_PAYLOAD_CN = {
  payment_method: "SWIFT",
  bank_country_code: "CN",
  account_name: "John Smith",
  account_number: "12345667711",
  swift_code: "ICBCCNBJ"
}

export const VALID_LOCAL_PAYLOAD = {
  payment_method: "LOCAL",
  bank_country_code: "US",
  account_name: "John Smith",
  account_number: "12345667711",
  aba: "11122233A"
}

export const VALID_LOCAL_PAYLOAD_AU = {
  payment_method: "LOCAL",
  bank_country_code: "AU",
  account_name: "John Smith",
  account_number: "12345661",
  bsb: "11122A"
}

export const VALID_LOCAL_PAYLOAD_CN = {
  payment_method: "LOCAL",
  bank_country_code: "CN",
  account_name: "John Smith",
  account_number: "12345667711"
}


