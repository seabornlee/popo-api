const request = require('supertest');
const expect = require('chai').expect;
const sails = require('sails');

describe('Login with Wechat', () => {
  before((done) => {
    sails.lift({}, (err) => {
      if (err) {return done(err);}
      done();
    });
  });

  after((done) => {
    // here you can clear fixtures, etc.
    sails.lower(done);
  });

  describe('without code', () => {
    it('returns 400', (done) => {
      request(sails.hooks.http.app)
        .get('/account/login-with-wechat') // replace with your actual endpoint
        .end((err, res) => {
          if (err) {return done(err);}
          // Here you can add more assertions: expect(res.body).to...
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
