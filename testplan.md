### API service endpoint
Post data to `/bank`

#### negative cases
- [ ] Wrong payload format: text/plain
- [ ] Invalid bank country code: wrong, missing
- [ ] Invalid account name: wrong, missing.
- [ ] Invalid account number: wrong, missing.
- [ ] Invalid aba code for US: wrong, missing.
- [ ] Invalid bsb code for AU: wrong, missing.
- [ ] Invalid swift code: wrong, missing.

### Positive cases
- [ ] Local payment: cover name number country combination
- [ ] Swift payment: cover name number country swiftcode combination
