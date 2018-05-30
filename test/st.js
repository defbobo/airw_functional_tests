var supertest = require('supertest');
var api = supertest('http://preview.airwallex.com:30001');

// var validUsPayload = {}
// validUsPayload.bank_country_code = 'US';
// validUsPayload.swift_code = 'ICBKCNBJ';
// validUsPayload.payment_method = 'SWIFT';
// validUsPayload.account_name = 'avddddd';
// validUsPayload.account_number = 123445555;
// validUsPayload.aba = '11122233A';
// api.post('/bank')
// .send(validUsPayload)
// .set('Accept', 'application/json')
// .expect(200)
// .end(function(err, res) {
//   console.log(res)
// })
