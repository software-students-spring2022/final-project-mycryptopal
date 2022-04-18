/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Testing news route', () => {
  describe('GET /api/news/feed', () => {
    it('should respond with an object containing a specified number of news articles, sorted by date published - latest first', async () => {
      const res = await chai.request(app).get('/api/news/feed').query({'limit': 5});
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'articles']);
      res.body.success.should.equal(true);
      res.body.articles.should.be.a('array');
      res.body.articles.should.have.lengthOf(5);
    });
    it('should respond with a 400 status code and an error message if the specified limit is 0 or lower', (done) => {
      chai
          .request(app)
          .get('/api/news/feed')
          .query({'limit': -1})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.keys(['success', 'error']);
            res.body.success.should.equal(false);
            res.body.error.should.be.a('string');
            res.body.error.should.equal('Invalid limit');
            done();
          });
    });
    it('should respond with a 400 status code and an error message if the specified limit is not a number', (done) => {
      chai
          .request(app)
          .get('/api/news/feed')
          .query({'limit': 'invalidLimit'})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.keys(['success', 'error']);
            res.body.success.should.equal(false);
            res.body.error.should.be.a('string');
            res.body.error.should.equal('Invalid limit');
            done();
          });
    });
  });
});
