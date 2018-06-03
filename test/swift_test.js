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
  ACCOUNT_NUMBER_CN
} from './config';

const api = supertest(TARGET_URL);
const expect = chai.expect,
      should = chai.should;
import {
  getRandomWord
} from './utils';

function validTestcase(api, account_name, account_number, country, payload) {
  for (let i=account_name.min; i<=account_name.max; i++) {
    for (let j=account_number.min; j<=account_number.max; j++) {
      it('name_length: ' + i + ' number_length: ' + j + ' country: ' + country, (done) => {
        let valiadPayload = payload;
        valiadPayload.account_name = getRandomWord(false, i);
        valiadPayload.account_number = getRandomWord(false, j);

        api.post('/bank')
        .send(valiadPayload)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(res.error.text);
            console.log(valiadPayload);
            done(err);
          };
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.not.equal(null);
          expect(res.body.success).to.equal("Bank details saved");
          done();
        });
      });

    }
  }
};

describe('payment: SWIFT, country: US', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_US, 'US', VALID_SWIFT_PAYLOAD)})

describe('payment: SWIFT, country: AU', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_AU, 'AU', VALID_SWIFT_PAYLOAD_AU)})

describe('payment: SWIFT, country: CN', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_CN, 'CN', VALID_SWIFT_PAYLOAD_CN)})