/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

//  Tests for external API calls
describe('Testing /crypto routes', () => {
  describe('GET /api/crypto/data/:symbol', () => {
    it('should respond with an object containing a cryptocurrency\'s latest market quote given that the provided symbol is valid', async () => {
      const res = await chai.request(app).get('/api/crypto/data/btc');
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'cryptoData']);
      res.body.success.should.equal(true);
      res.body.cryptoData.should.be.a('object');
      res.body.cryptoData.should.include.keys(['circulating_supply', 'quote']);
      res.body.cryptoData.quote.should.have.property('USD');
      res.body.cryptoData.quote.USD.should.include.keys(['price', 'volume_24h', 'percent_change_24h', 'market_cap']);
    });
    it('should respond with an error code and an object containing an error message if the provided symbol is invalid', async () => {
      const res = await chai.request(app).get('/api/crypto/data/thisCoinDoesNotExist');
      res.should.not.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
  });

  describe('GET /api/crypto/info/:symbol', () => {
    it('should respond with an object containing a cryptocurrency\'s metadata given that the provided symbol is valid, in which the cryptocurrency\'s description can be found', async () => {
      const res = await chai.request(app).get('/api/crypto/info/btc');
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'cryptoInfo']);
      res.body.success.should.equal(true);
      res.body.cryptoInfo.should.have.property('description');
      res.body.cryptoInfo.description.should.be.a('string');
    });
    it('should respond with an error code and an object containing an error message if the provided symbol is invalid', async () => {
      const res = await chai.request(app).get('/api/crypto/info/thisCoinDoesNotExist');
      res.should.not.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
  });
});

//  describe('GET /api/crypto/explore', () => {
//    it('should respond with an object containing a default number of cryptocurrencies along with their basic information', (done) => {
//      chai.request(app).get('/api/crypto/explore')
//          .end((err, res)=>{
//            res.should.have.status(200);
//            res.body.should.be.a('object');
//            Object.keys(res.body).should.have.lengthOf(20);
//            //res.body.should.have.property("success", true); took from slides
//            res.body[Object.keys(res.body)[0]].should.include.all.keys('symbol', 'pic', 'url');
//            done();
//          });
//    });
//    it('should respond with an object containing a single cryptocurrency', (done) => {
//      chai.request(app).get('/api/crypto/explore').query({'limit': 1})
//          .end((err, res) => {
//            res.should.have.status(200);
//            res.body.should.be.a('object');
//            Object.keys(res.body).should.have.lengthOf(1);
//            //res.body.should.have.property("success", true);
//            res.body[Object.keys(res.body)[0]].should.include.all.keys('symbol', 'pic', 'url');
//            done();
//          });
//    });
//    it('should respond with an object containing a specified large number of cryptocurrencies', (done) => {
//      chai.request(app).get('/api/crypto/explore').query({'limit': 500})
//          .end((err, res) => {
//            res.should.have.status(200);
//            res.body.should.be.a('object');
//            Object.keys(res.body).should.have.lengthOf(500);
//            //res.body.should.have.property("success", true);
//            res.body[Object.keys(res.body)[0]].should.include.all.keys('symbol', 'pic', 'url');
//            done();
//          });
//    });
//    it('should respond with status code 400 and an empty object if the specified limit exceeds the API\'s restrictions', (done) => {
//      chai.request(app).get('/api/crypto/explore').query({'limit': 5001})
//          .end((err, res) => {
//            res.should.have.status(400);
//            console.log(res.body);
//            res.body.should.be.a('object');
//            //res.body.should.have.property("success", true);
//            Object.keys(res.body).should.be.empty;
//            done();
//          });
//    });
//  });


//  describe('GET /api/crypto/graph/:symbol', () => {
//    it('should respond with an object containing a cryptocurrency\'s metadata given that the provided symbol is valid, in which the cryptocurrency\'s price data and graph can be found', (done) => {
//      chai
//          .request(app)
//          .get('/api/crypto/graph/btc')
//          .end((err, res) => {
//            res.should.have.status(200);
//            res.body.should.be.a('object');
//            res.body.should.have.property('c');
//            //res.body.should.have.property("success", true);
//            expect.res.to.be.json;
//            done();
//          });
//    });
//    it('should respond with a 404 error code and an empty response object if the provided symbol is invalid', (done) => {
//      chai
//          .request(app)
//          .get('/api/crypto/graph/thisCoinDoesNotExist')
//          .end((err, res) => {
//            res.should.have.status(404);
//            res.body.should.be.a('object');
//            //res.body.should.have.property("success", true);
//            res.body.should.be.empty;
//            done();
//          });
//    });
//  });
