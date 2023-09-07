const request = require('supertest');
const expect = require('chai').expect;
const sails = require('sails');

process.env.NODE_ENV = 'test';

describe('Group', () => {
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

  describe('list groups', () => {
    before(async () => {
      await Group.create({name: 'test group', tags: '["test"]', images: '[""]', location: '{"latitude": 25.59158, "longitude": 100.22976}'});
      const groups = await Group.find();
      expect(groups.length).to.equal(1);
    });

    it('returns 200', (done) => {
      request(sails.hooks.http.app)
        .get('/group') // replace with your actual endpoint
        .end((err, res) => {
          if (err) {return done(err);}
          // Here you can add more assertions: expect(res.body).to...
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });
});
