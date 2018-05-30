var chai = require('chai');
var supertest = require('supertest');
var config = require('./config.json');
var api = supertest('http://preview.airwallex.com:30001');
var expect = chai.expect,
    should = chai.should;

function getRandomChar() {
  var randomInt = Math.round(Math.random() * 93) + 32;
  // console.log(randomInt)
  return String.fromCharCode(randomInt);
}

function getRandomWord(randomFlag, min, max) {
  var str = '';
  var range = min;
  for (var i = 1; i < range; i++) {
    var char = getRandomChar();
    if (char != '/') {
      str += char
    } else {
      str += 'a'
    }
  }
  return str;
}

function copy(obj){
  var newobj = {};
  for ( var attr in obj) {
    newobj[attr] = obj[attr];
  }
  console.log(newobj)
  return newobj;
};


describe('payment: SWIFT', function() {
  var swiftPayload = {payment_method: 'SWIFT'}

  describe('country code: US', function() {
    usSwiftPayload = copy(swiftPayload);
    usSwiftPayload.bank_country_code = 'US';
    usSwiftPayload.swift_code = 'ICBKUSBJ';
    usSwiftPayload.payment_method = 'SWIFT';
    usSwiftPayload.aba = '11122233A';
    usSwiftPayload.account_name = 'John Smith';
    usSwiftPayload.account_number = '123';

    describe('valid account number and name', function() {
      for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
        for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
          it('account name_length: ' + i + ' number_length: ' + j, function(done) {
            validUsSwiftPayload = copy(usSwiftPayload);
            validUsSwiftPayload.account_name = getRandomWord(false, i);
            validUsSwiftPayload.account_number = getRandomWord(false, j);
            console.log(validUsSwiftPayload)

            api.post('/bank')
            .send(validUsSwiftPayload)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property("success");
              expect(res.body.success).to.not.equal(null);
              expect(res.body.success).to.equal("Bank details saved");
              done();
            });
          });
        }
      }
    });

    describe('valid 11 swift code', function() {
      for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
        for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
          it('account name_length: ' + i + ' number_length: ' + j, function(done) {
            validSFUsSwiftPayload = copy(usSwiftPayload);
            validSFUsSwiftPayload.account_name = getRandomWord(false, i);
            validSFUsSwiftPayload.account_number = getRandomWord(false, j);
            validSFUsSwiftPayload.swift_code = 'ICBKUSBJCCB';

            api.post('/bank')
            .send(validSFUsSwiftPayload)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property("success");
              expect(res.body.success).to.not.equal(null);
              expect(res.body.success).to.equal("Bank details saved");
              done();
            });
          });
        }
      }
    });

    describe('invalid account number', function() {
      for (var i = config.accountName.length.min; i >= 0; i--) {
        it('account number_length: ' + i, function(done) {
          invalidANUsSwiftPayload = copy(usSwiftPayload);
          invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
          api.post('/bank')
          .send(invalidANUsSwiftPayload )
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
            done();
          });
        }
      }
      for (var i = config.accountName.length.max; i <= config.accountName.length.max + 10; i++) {
        it('account number_length: ' + i, function(done) {
          invalidANUsSwiftPayload = copy(usSwiftPayload);
          invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
          api.post('/bank')
          .send(invalidANUsSwiftPayload )
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
            done();
          });
        }
      }
    });

    describe('account number missing', function() {
      it('account number_length: ' + i, function(done) {
        missingANUsSwiftPayload = copy(usSwiftPayload);
        delete missingANUsSwiftPayload.account_number;
        api.post('/bank')
        .send(missingANUsSwiftPayload)
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);''
          expect(res.error.text).to.equal("'account_number' is required")
          done();
        });
      }
    });

    describe('wrong swift code', function() {
      for (var i = config.accountName.length.min; i >= 0; i--) {
        it('account number_length: ' + i, function(done) {
          wrongSFUsSwiftPayload = copy(usSwiftPayload);
          wrongSFUsSwiftPayload.swift_code = ICBKCNBJ;
          api.post('/bank')
          .send(wrongSFUsSwiftPayload)
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("The swift code is not valid for the given bank country code: US")
            done();
          });
        }
      }
    });

    describe('wrong swift code length', function() {
      it('account number_length: ', function(done) {
        wrongSFLUsSwiftPayload = copy(usSwiftPayload);
        wrongSFLUsSwiftPayload.swift_code = getRandomWord(false, 10);
        api.post('/bank')
        .send(wrongSFLUsSwiftPayload)
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);''
          expect(res.error.text).to.equal("Length of 'swift_code' should be either 8 or 11")
          done();
        });
      }
    });
  });
  describe('country code: AU', function() {
      auSwiftPayload = copy(swiftPayload);
      auSwiftPayload.bank_country_code = 'US';
      auSwiftPayload.swift_code = 'ICBKUSBJ';
      auSwiftPayload.payment_method = 'SWIFT';
      auSwiftPayload.bsb = '11122A';
      auSwiftPayload.account_name = 'John Smith';
      auSwiftPayload.account_number = '123';

      describe('valid account number and name', function() {
        for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
          for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
            it('account name_length: ' + i + ' number_length: ' + j, function(done) {
              validAUSwiftPayload = copy(auSwiftPayload);
              validAUSwiftPayload.account_name = getRandomWord(false, i);
              validAUSwiftPayload.account_number = getRandomWord(false, j);
              console.log(validAUSwiftPayload)

              api.post('/bank')
              .send(validAUSwiftPayload)
              .set('Accept', 'application/json')
              .expect(200)
              .end(function(err, res) {
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.not.equal(null);
                expect(res.body.success).to.equal("Bank details saved");
                done();
              });
            });
          }
        }
      });

      describe('valid 11 swift code', function() {
        for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
          for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
            it('account name_length: ' + i + ' number_length: ' + j, function(done) {
              validSFUsSwiftPayload = copy(usSwiftPayload);
              validSFUsSwiftPayload.account_name = getRandomWord(false, i);
              validSFUsSwiftPayload.account_number = getRandomWord(false, j);
              validSFUsSwiftPayload.swift_code = 'ICBKUSBJCCB';

              api.post('/bank')
              .send(validSFUsSwiftPayload)
              .set('Accept', 'application/json')
              .expect(200)
              .end(function(err, res) {
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.not.equal(null);
                expect(res.body.success).to.equal("Bank details saved");
                done();
              });
            });
          }
        }
      });

      describe('invalid account number', function() {
        for (var i = config.accountName.length.min; i >= 0; i--) {
          it('account number_length: ' + i, function(done) {
            invalidANUsSwiftPayload = copy(usSwiftPayload);
            invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
            api.post('/bank')
            .send(invalidANUsSwiftPayload )
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
              done();
            });
          }
        }
        for (var i = config.accountName.length.max; i <= config.accountName.length.max + 10; i++) {
          it('account number_length: ' + i, function(done) {
            invalidANUsSwiftPayload = copy(usSwiftPayload);
            invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
            api.post('/bank')
            .send(invalidANUsSwiftPayload )
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
              done();
            });
          }
        }
      });

      describe('account number missing', function() {
        it('account number_length: ' + i, function(done) {
          missingANUsSwiftPayload = copy(usSwiftPayload);
          delete missingANUsSwiftPayload.account_number;
          api.post('/bank')
          .send(missingANUsSwiftPayload)
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("'account_number' is required")
            done();
          });
        }
      });

      describe('wrong swift code', function() {
        for (var i = config.accountName.length.min; i >= 0; i--) {
          it('account number_length: ' + i, function(done) {
            wrongSFUsSwiftPayload = copy(usSwiftPayload);
            wrongSFUsSwiftPayload.swift_code = ICBKCNBJ;
            api.post('/bank')
            .send(wrongSFUsSwiftPayload)
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("The swift code is not valid for the given bank country code: US")
              done();
            });
          }
        }
      });

      describe('wrong swift code length', function() {
        it('account number_length: ', function(done) {
          wrongSFLUsSwiftPayload = copy(usSwiftPayload);
          wrongSFLUsSwiftPayload.swift_code = getRandomWord(false, 10);
          api.post('/bank')
          .send(wrongSFLUsSwiftPayload)
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("Length of 'swift_code' should be either 8 or 11")
            done();
          });
        }
      });
    });
  });
  describe('country code: CN', function() {
      usSwiftPayload = copy(swiftPayload);
      usSwiftPayload.bank_country_code = 'US';
      usSwiftPayload.swift_code = 'ICBKUSBJ';
      usSwiftPayload.payment_method = 'SWIFT';
      usSwiftPayload.aba = '11122233A';
      usSwiftPayload.account_name = 'John Smith';
      usSwiftPayload.account_number = '123';

      describe('valid account number and name', function() {
        for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
          for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
            it('account name_length: ' + i + ' number_length: ' + j, function(done) {
              validUsSwiftPayload = copy(usSwiftPayload);
              validUsSwiftPayload.account_name = getRandomWord(false, i);
              validUsSwiftPayload.account_number = getRandomWord(false, j);
              console.log(validUsSwiftPayload)

              api.post('/bank')
              .send(validUsSwiftPayload)
              .set('Accept', 'application/json')
              .expect(200)
              .end(function(err, res) {
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.not.equal(null);
                expect(res.body.success).to.equal("Bank details saved");
                done();
              });
            });
          }
        }
      });

      describe('valid 11 swift code', function() {
        for (var i = config.accountName.length.min; i <= config.accountName.length.max; i++) {
          for (var j = config.accountNumber.length.US.min; j <= config.accountNumber.length.US.max; j++) {
            it('account name_length: ' + i + ' number_length: ' + j, function(done) {
              validSFUsSwiftPayload = copy(usSwiftPayload);
              validSFUsSwiftPayload.account_name = getRandomWord(false, i);
              validSFUsSwiftPayload.account_number = getRandomWord(false, j);
              validSFUsSwiftPayload.swift_code = 'ICBKUSBJCCB';

              api.post('/bank')
              .send(validSFUsSwiftPayload)
              .set('Accept', 'application/json')
              .expect(200)
              .end(function(err, res) {
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.not.equal(null);
                expect(res.body.success).to.equal("Bank details saved");
                done();
              });
            });
          }
        }
      });

      describe('invalid account number', function() {
        for (var i = config.accountName.length.min; i >= 0; i--) {
          it('account number_length: ' + i, function(done) {
            invalidANUsSwiftPayload = copy(usSwiftPayload);
            invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
            api.post('/bank')
            .send(invalidANUsSwiftPayload )
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
              done();
            });
          }
        }
        for (var i = config.accountName.length.max; i <= config.accountName.length.max + 10; i++) {
          it('account number_length: ' + i, function(done) {
            invalidANUsSwiftPayload = copy(usSwiftPayload);
            invalidANUsSwiftPayload.account_number = getRandomWord(false, i);
            api.post('/bank')
            .send(invalidANUsSwiftPayload )
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("Length of account_number should be between 7 and 11 when bank_country_code is 'US'")
              done();
            });
          }
        }
      });

      describe('account number missing', function() {
        it('account number_length: ' + i, function(done) {
          missingANUsSwiftPayload = copy(usSwiftPayload);
          delete missingANUsSwiftPayload.account_number;
          api.post('/bank')
          .send(missingANUsSwiftPayload)
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("'account_number' is required")
            done();
          });
        }
      });

      describe('wrong swift code', function() {
        for (var i = config.accountName.length.min; i >= 0; i--) {
          it('account number_length: ' + i, function(done) {
            wrongSFUsSwiftPayload = copy(usSwiftPayload);
            wrongSFUsSwiftPayload.swift_code = ICBKCNBJ;
            api.post('/bank')
            .send(wrongSFUsSwiftPayload)
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
              if (err) return done(err);''
              expect(res.error.text).to.equal("The swift code is not valid for the given bank country code: US")
              done();
            });
          }
        }
      });

      describe('wrong swift code length', function() {
        it('account number_length: ', function(done) {
          wrongSFLUsSwiftPayload = copy(usSwiftPayload);
          wrongSFLUsSwiftPayload.swift_code = getRandomWord(false, 10);
          api.post('/bank')
          .send(wrongSFLUsSwiftPayload)
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);''
            expect(res.error.text).to.equal("Length of 'swift_code' should be either 8 or 11")
            done();
          });
        }
      });
    });

  });

});

describe('local', function() {
  var payload = {payment_method: 'LOCAL'}
  describe('US', function() {
    usPayload = copy(payload);
    usPayload.bank_country_code = 'US';

  });
  describe('AU', function() {
    auPayload = copy(payload);
    auPayload.bank_country_code = 'AU';
  });
  describe('CN', function() {
    cnPayload = copy(payload);
    cnPayload.bank_country_code = 'CN';

  });

});


