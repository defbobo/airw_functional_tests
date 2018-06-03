import chai from 'chai';
import supertest from 'supertest';
import {
  TARGET_URL,
  VALID_SWIFT_PAYLOAD,
  VALID_SWIFT_PAYLOAD_AU,
  VALID_SWIFT_PAYLOAD_CN,
  ACCOUNT_NAME,
  ACCOUNT_NUMBER_US,
  ACCOUNT_NUMBER_AU,
  ACCOUNT_NUMBER_CN,
  BSB_CODE,
  ABA_CODE
} from './config';

import {
  BANK_COUNTRY_CODE_MSG,
  PAYMENT_METHODS_MSG,
  ACCOUNT_NAME_MSG,
  ACCOUNT_NAME_MISSING_MSG,
  ACCOUNT_NUMBER_MSG,
  ACCOUNT_NUMBER_MSG_AU,
  ACCOUNT_NUMBER_MSG_CN,
  ACCOUNT_NUMBER_MISSING_MSG,
  BSB_CODE_MSG,
  ABA_CODE_MSG,
  BSB_CODE_MISSING_MSG,
  ABA_CODE_MISSING_MSG,
  SWIFT_CODE_MSG,
  SWIFT_CODE_WRONG_MSG,
  SWIFT_CODE_MISSING_MSG
} from './error_msg';

import {
  getErrorMsg,
  getRandomWord
} from './utils';

const api = supertest(TARGET_URL);
const expect = chai.expect,
      should = chai.should;


function invalidAcountTestcase(api, payload, feild, min, max, errorMsg) {
  for (let i=min - 1; i>=0; i--) {
    it('wrong ' + feild + ' length: ' + i, (done) => {
      let wrongPayload = Object.assign({}, payload);
      wrongPayload[feild] = getRandomWord(false, i);
      // console.log(wrongPayload);
      api.post('/bank')
      .send(wrongPayload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(getErrorMsg(res.error.text)).to.equal(errorMsg);
        done();
      });
    })
  }
  for (let i=max+1; i<=max+6; i++) {
    it('wrong ' + feild + ' length: ' + i, (done) => {
      let wrongPayload = Object.assign({}, payload);
      wrongPayload[feild] = getRandomWord(false, i);
      api.post('/bank')
      .send(wrongPayload)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(getErrorMsg(res.error.text)).to.equal(errorMsg);
        done();
      });
    })
  }
}

describe('Invalid payload format', () => {
  it('reponse error msg', (done) => {
    api.post('/bank')
    .set('Content-Type', 'text/plain')
    .send('12')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(res.error.text).to.have.property("error");
      expect(res.error.text).to.not.equal(null);
      expect(res.error.text).to.equal("Invalid payload format");
      done();
    })
  })
})

describe('Invalid payment method', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  
  it('wrong payment method', (done) => {
    invalidPayload.payment_method = 'STSTS';
    api.post('/bank')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(invalidPayload)
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(PAYMENT_METHODS_MSG);
      done();
    })
  })

  it('missing payment method', (done) => {
    delete invalidPayload.payment_method;
    api.post('/bank')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(invalidPayload)
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(PAYMENT_METHODS_MSG);
      done();
    })
  })
})

describe('Invalid bank country code', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  
  it('wrong bank country code', (done) => {
    invalidPayload.bank_country_code = 'STSTS';
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(BANK_COUNTRY_CODE_MSG);
      done();
    })
  })

  it('missing bank country code', (done) => {
    delete invalidPayload.bank_country_code;
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(BANK_COUNTRY_CODE_MSG);
      done();
    })
  })
})

describe('Invalid account name', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  
  invalidAcountTestcase(api, invalidPayload, 'account_name', ACCOUNT_NAME.min, ACCOUNT_NAME.max, ACCOUNT_NAME_MSG);

  it('missing accout name', (done) => {
    delete invalidPayload.account_name;
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(ACCOUNT_NAME_MISSING_MSG);
      done();
    })
  })
})

describe('Invalid account number: US', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  
  invalidAcountTestcase(api, invalidPayload, 'account_number', ACCOUNT_NUMBER_US.min, ACCOUNT_NUMBER_US.max, ACCOUNT_NUMBER_MSG);

  it('missing accout number', (done) => {
    delete invalidPayload.account_number;
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(ACCOUNT_NUMBER_MISSING_MSG);
      done();
    })
  })
})


describe('Invalid account number: AU', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD_AU);
  
  invalidAcountTestcase(api, invalidPayload, 'account_number', ACCOUNT_NUMBER_AU.min, ACCOUNT_NUMBER_AU.max, ACCOUNT_NUMBER_MSG_AU);

  it('missing accout number', (done) => {
    delete invalidPayload.account_number;
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(ACCOUNT_NUMBER_MISSING_MSG);
      done();
    })
  })
})

describe('Invalid account number: CN', () => {
  let invalidPayload = Object.assign({}, VALID_SWIFT_PAYLOAD_CN);
  
  invalidAcountTestcase(api, invalidPayload, 'account_number', ACCOUNT_NUMBER_CN.min, ACCOUNT_NUMBER_CN.max, ACCOUNT_NUMBER_MSG_CN);

  it('missing accout number', (done) => {
    delete invalidPayload.account_number;
    api.post('/bank')
    .send(invalidPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(ACCOUNT_NUMBER_MISSING_MSG);
      done();
    })
  })
})

describe('Invalid bsb code', () => {
  let invalidBsbPayload = Object.assign({}, VALID_SWIFT_PAYLOAD_AU);
  
  invalidAcountTestcase(api, invalidBsbPayload, 'bsb', BSB_CODE, BSB_CODE, BSB_CODE_MSG);

  it('missing bsb code', (done) => {
    delete invalidBsbPayload.bsb;
    api.post('/bank')
    .send(invalidBsbPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(BSB_CODE_MISSING_MSG);
      done();
    })
  })
})

describe('Invalid aba code', () => {
  let invalidAbaPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  
  invalidAcountTestcase(api, invalidAbaPayload, 'aba', ABA_CODE, ABA_CODE, ABA_CODE_MSG);

  it('missing aba code', (done) => {
    delete invalidAbaPayload.aba;
    api.post('/bank')
    .send(invalidAbaPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(ABA_CODE_MISSING_MSG);
      done();
    })
  })
})

describe('Invalid swift code', () => {
  let invalidSwiftPayload = Object.assign({}, VALID_SWIFT_PAYLOAD);
  it('wrong swift code length: 0', (done) => {
    invalidSwiftPayload.swift_code = "";
    api.post('/bank')
    .send(invalidSwiftPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(SWIFT_CODE_MISSING_MSG);
      done();
    })
  })

  it('wrong swift code length: 1', (done) => {
    invalidSwiftPayload.swift_code = "a";
    api.post('/bank')
    .send(invalidSwiftPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(SWIFT_CODE_MSG);
      done();
    })
  })

  it('wrong swift code length: 1', (done) => {
    invalidSwiftPayload.swift_code = "ICBCCNBC";
    api.post('/bank')
    .send(invalidSwiftPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(SWIFT_CODE_WRONG_MSG);
      done();
    })
  })

  it('missing swift code', (done) => {
    delete invalidSwiftPayload.swift_code;
    api.post('/bank')
    .send(invalidSwiftPayload)
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err) {return done(err)};
      expect(getErrorMsg(res.error.text)).to.equal(SWIFT_CODE_MISSING_MSG);
      done();
    })
  })
})