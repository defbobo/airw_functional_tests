export const PAYMENT_METHODS_MSG = `'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'`

export const BANK_COUNTRY_CODE_MSG = `'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'`

export const ACCOUNT_NAME_MSG = `Length of account_name should be between 2 and 10`

export const ACCOUNT_NAME_MISSING_MSG = `'account_name' is required`

export const ACCOUNT_NUMBER_MSG = `Length of account_number should be between 7 and 11 when bank_country_code is 'US'`
export const ACCOUNT_NUMBER_MSG_AU = `Length of account_number should be between 6 and 9 when bank_country_code is 'AU'`
export const ACCOUNT_NUMBER_MSG_CN = `Length of account_number should be between 8 and 20 when bank_country_code is 'CN'`

export const ACCOUNT_NUMBER_MISSING_MSG = `'account_number' is required`

export const BSB_CODE_MSG = `Length of 'bsb' should be 6`

export const BSB_CODE_MISSING_MSG = `'bsb' is required when bank country code is 'AU'`

export const ABA_CODE_MSG = `Length of 'aba' should be 9`

export const ABA_CODE_MISSING_MSG = `'aba' is required when bank country code is 'US'`

export const SWIFT_CODE_MSG = `Length of 'swift_code' should be either 8 or 11`

export const SWIFT_CODE_WRONG_MSG = `The swift code is not valid for the given bank country code: US`

export const SWIFT_CODE_MISSING_MSG = `'swift_code' is required when payment method is 'SWIFT'`
