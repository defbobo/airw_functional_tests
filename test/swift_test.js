var chai = require('chai');
var supertest = require('supertest');
var config = require('./config.json');
var api = supertest('http://preview.airwallex.com:30001');
var expect = chai.expect,
    should = chai.should;
var getRandomWord = require('./utils');

function validTestcase(api, config, country) {
  for (var i=config.accountName.length.min; i<=config.accountName.length.max; i++) {
    for (var j=config.accountNumber.length[country].min; j<=config.accountNumber.length[country].max; j++) {
      config.validSwiftCode[country].forEach((code) => {
        it('name_length: ' + i + ' number_length: ' + j + ' country: ' + country, function() {
          payload = config.validSwiftPayload[country];
          payload.account_name = getRandomWord(false, i);
          payload.account_number = getRandomWord(false, j);

          api.post('/bank')
          .send(payload)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              console.log(res.error.text);
              console.log(payload);
            };
            expect(res.body).to.have.property("success");
            expect(res.body.success).to.not.equal(null);
            expect(res.body.success).to.equal("Bank details saved");
          });
        });
      })
    }
  }
};

function invalidAcountNameTestcase(api, config) {
  for (var i=config.accountName.length.min - 1; i>=0; i--) {
    it('account name length: ' + i, function() {
      payload = config.validSwiftPayload.US;
      payload.account_name = getRandomWord(false, i);
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.error.text).to.equal(config.errorMsg.accountName)
      });
    })
  };
  for (var i=config.accountName.length.max+1; i<=config.accountName.length.max+6; i++) {
    it('account name length: ' + i, function() {
      payload = config.validSwiftPayload.CN;
      payload.account_name = getRandomWord(false, i);
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.error.text).to.equal(config.errorMsg.accountName)
      });
    });
  };
  it('account name missing', function() {
    payload = config.validSwiftPayload.AU;
    delete payload.account_name;
    api.post('/bank')
    .send(payload)
    .set('Accept', 'application/json')
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.error.text).to.equal(config.errorMsg.accountNameMissing)
    });
  });
};

function invalidAcountNumberTestcase(api, config) {
  config.bankCountryCode.value.forEach((country) => {
    for (var i=config.accountNumber.length[country].min - 1; i>=0; i--) {
      it('account number length: ' + i + ' country: ' + country, function() {
        payload = config.validSwiftPayload[country];
        payload.account_number = getRandomWord(false, i);
        api.post('/bank')
        .send(payload)
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.error.text).to.equal(config.errorMsg.accountNumber)
        });
      })
    };
    for (var i=config.accountNumber.length[country].max+1; i<=config.accountNumber.length[country].max+6; i++) {
      it('account number length: ' + i + ' country: ' + country, function() {
        payload = config.validSwiftPayload[country];
        payload.account_number = getRandomWord(false, i);
        api.post('/bank')
        .send(payload)
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.error.text).to.equal(config.errorMsg.accountNumber)
        });
      });
    };
    it('account number missing' + ' country: ' + country, function() {
      payload = config.validSwiftPayload[country];
      delete payload.account_number;
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.error.text).to.equal(config.errorMsg.accountNumberMissing)
      });
    });
  });
};

function invalidSwiftCodeTestCase(api, config, country) {
  config.swiftCode.wrongExample.forEach((code) => {
    it('wrong swift code: ' + country, function() {
      payload = config.validSwiftPayload[country];
      payload.swift_code = code;
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.log(res.error.text);
          console.log(payload);
          return done(err);
        }
        expect(res.error.text).to.equal(config.errorMsg.swiftCode + country)
      });
    });
  });
};

function invalidbsbCodeTestCase(api, config) {
  for (var i=1; i < config.bsb.length + 5; i++) {
    if (i === config.bsb.length) continue;
    it('wrong bsb length: ' + i, function() {
      payload = config.validSwiftPayload.AU;
      payload.bsb = getRandomWord(false, i)
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.log(res.error.text);
          console.log(payload);
          return done(err);
        }
        expect(res.error.text).to.equal(config.errorMsg.bsbCode)
      });
    });
  };

  it('bsbCode missing', function() {
    payload = config.validSwiftPayload.AU;
    api.post('/bank')
    .send(payload)
    .set('Accept', 'application/json')
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.error.text).to.equal(config.errorMsg.bsbCodeMissing)
    });
  })
};

function invalidabaCodeTestCase(api, config) {
  for (var i=1; i < config.aba.length + 5; i++) {
    if (i === config.aba.length) continue;
    it('wrong aba length: ' + i, function() {
      payload = config.validSwiftPayload.US;
      payload.bsb = getRandomWord(false, i)
      api.post('/bank')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.error.text).to.equal(config.errorMsg.abaCode)
      });
    });
  };

  it('abaCode missing', function() {
    payload = config.validSwiftPayload.US;
    api.post('/bank')
    .send(payload)
    .set('Accept', 'application/json')
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.error.text).to.equal(config.errorMsg.abaCodeMissing)
    });
  })
};


describe('payment: SWIFT, country: US', () => {validTestcase(api, config, 'US')})

describe('payment: SWIFT, country: AU', () => {validTestcase(api, config, 'AU')})

describe('payment: SWIFT, country: CN', () => {validTestcase(api, config, 'CN')})

describe('invalid accountName cases', () => {invalidAcountNameTestcase(api, config)})

describe('invalid accountNumber cases', () => {invalidAcountNumberTestcase(api, config)})

describe('wrong swift code, country: US', () => {invalidSwiftCodeTestCase(api, config, 'US')})

describe('wrong swift code, country: AU', () => {invalidSwiftCodeTestCase(api, config, 'AU')})

describe('wrong swift code, country: CN', () => {invalidSwiftCodeTestCase(api, config, 'CN')})

describe('wrong bsb code', () => {invalidbsbCodeTestCase(api, config)})

describe('wrong aba code', () => {invalidabaCodeTestCase(api, config)})
