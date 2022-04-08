const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('GET /api/news', () => {
  it('should respond with an object containing an array of crypto-related news articles with a default length when no limit is specified', (done) => {
    chai
        .request(app)
        .get('/api/news')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('articles');
          res.body.articles.should.have.lengthOf(20);
          done();
        });
  });
  it('should respond with an object containing an array of a single crypto-related news article and its info when the specified limit is 1', (done) => {
    chai
        .request(app)
        .get('/api/news')
        .query({'limit': 1})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('articles');
          res.body.articles.should.have.lengthOf(1);
          done();
        });
  });
  it('should respond with an object containing an array of multiple crypto-related news articles and their info when the specified limit is > 1', (done) => {
    chai
        .request(app)
        .get('/api/news')
        .query({'limit': 100})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('articles');
          res.body.articles.should.have.lengthOf(100);
          done();
        });
  });
  it('should respond with a 400 status code and an object containing an empty array of news articles if the limit exceeds the API\'s restriction of 100 articles per request', (done) => {
    chai
        .request(app)
        .get('/api/news')
        .query({'limit': 101})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('articles');
          res.body.articles.should.have.lengthOf(0);
          done();
        });
  });
  it('should respond with an object containing an array of crypto-related news articles with a default length when the limit is of invalid format', (done) => {
    chai
        .request(app)
        .get('/api/news?')
        .query({'limit': 'invalidLimit'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('articles');
          res.body.articles.should.have.lengthOf(20);
          done();
        });
  });
});

