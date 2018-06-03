### account name feild is '', 
> expected '\'account_name\' is required' to equal 'Length of account_name should be between 2 and 10'

### account number length invalid for AU, 
> expected 'Length of account_number should be between 7 and 11 when bank_country_code is \'US\'' to equal 'Length of account_number should be between 6 and 9 when bank_country_code is \'AU\''

### aba code is "" or missing,
> except 400, got 200

### valid case, got 1 time err
> msg as following
{"error":"Length of account_number should be between 7 and 11 when bank_country_code is 'US'"}
{ payment_method: 'SWIFT',
  bank_country_code: 'CN',
  account_name: '8L0zm;',
  account_number: 'njl|t9SL+',
  swift_code: 'ICBCCNBJ' }

{"error":"Length of account_number should be between 7 and 11 when bank_country_code is 'US'"}
{ payment_method: 'LOCAL',
  bank_country_code: 'CN',
  account_name: 'Lv',
  account_number: 'f2?QP>mlRDRt$' }