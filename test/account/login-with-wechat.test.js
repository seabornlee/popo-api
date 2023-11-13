const request = require("supertest");
const expect = require("chai").expect;
const Sails = require("sails").Sails;

const sails = new Sails();
describe("Login with Wechat", () => {
  before((done) => {
    sails.lift({}, (err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  after((done) => {
    // here you can clear fixtures, etc.
    sails.lower(done);
  });

  describe("without code", () => {
    it("returns 400", (done) => {
      request(sails.hooks.http.app)
        .get("/account/login-with-wechat") // replace with your actual endpoint
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          // Here you can add more assertions: expect(res.body).to...
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });

  describe("with code", () => {
    const code = "0d3jxP000eTGEQ1jTs200SIN8j2jxP0Y";
    it("returns 200", (done) => {
      request(sails.hooks.http.app)
        .get("/account/login-with-wechat?code=" + code) // replace with your actual endpoint
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body.errcode).not.to.equal(41001);
          done();
        });
    });
  });
});
