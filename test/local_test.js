import chai from 'chai';
import supertest from 'supertest';
import {
  TARGET_URL,
  VALID_LOCAL_PAYLOAD,
  VALID_LOCAL_PAYLOAD_AU,
  VALID_LOCAL_PAYLOAD_CN,
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
        let validPayload = Object.assign({}, payload);;
        validPayload.account_name = getRandomWord(false, i);
        validPayload.account_number = getRandomWord(false, j);

        api.post('/bank')
        .send(validPayload)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(res.error.text);
            console.log(validPayload);
            done(err);
          };
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.not.equal(null);
          expect(res.body.success).to.equal("Bank details saved");
          done();
        });
      })
    }
  }
};

describe('payment: LOCAL, country: US', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_US, 'US', VALID_LOCAL_PAYLOAD)})

describe('payment: LOCAL, country: AU', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_AU, 'AU', VALID_LOCAL_PAYLOAD_AU)})

describe('payment: LOCAL, country: CN', () => {validTestcase(api, ACCOUNT_NAME, ACCOUNT_NUMBER_CN, 'CN', VALID_LOCAL_PAYLOAD_CN)})
