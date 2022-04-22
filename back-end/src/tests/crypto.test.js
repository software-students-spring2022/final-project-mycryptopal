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

  describe('GET /api/crypto/explore', () => {
    it('should respond with an object containing the information of a single cryptocurrency when the specified limit is 1', async () => {
      const res = await chai.request(app).get('/api/crypto/explore').query({limit: 1});
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'cryptos']);
      res.body.success.should.equal(true);
      Object.keys(res.body.cryptos).should.have.lengthOf(1);
      res.body.cryptos[Object.keys(res.body.cryptos)[0]].should.have.keys(['cap', 'label', 'pic', 'supply', 'symbol', 'volume']);
    });
    it('should respond with an object containing the information of a specified number of cryptocurrencies', async () => {
      const res = await chai.request(app).get('/api/crypto/explore').query({limit: 123});
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'cryptos']);
      res.body.success.should.equal(true);
      Object.keys(res.body.cryptos).should.have.lengthOf(123);
      res.body.cryptos[Object.keys(res.body.cryptos)[0]].should.have.keys(['cap', 'label', 'pic', 'supply', 'symbol', 'volume']);
    });
    it('should respond with an object containing an error code and an error message if the specified limit is of an invalid format', async () => {
      const res = await chai.request(app).get('/api/crypto/explore').query({limit: 'invalidLimit'});
      console.log(res.body);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
    it('should respond with an object containing an error code and an error message if the specified limit exceeds the API\'s restriction', async () => {
      const res = await chai.request(app).get('/api/crypto/explore').query({limit: 5001});
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
    it('should respond with an object containing an error code and an error message if the specified limit is less than 1', async () => {
      const res = await chai.request(app).get('/api/crypto/explore').query({limit: -3});
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
  });

  describe('GET /api/crypto/explore', () => {
    const queryInterval = 30;
    it('should respond with an object containing a crypto\'s price data in a given interval, and its min and max price in this period', async () => {
      const res = await chai.request(app).get('/api/crypto/graph/btc').query({interval: queryInterval});
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'graphData']);
      res.body.success.should.equal(true);
      res.body.graphData.should.have.keys(['values', 'min', 'max']);
      res.body.graphData.values.should.be.a('array');
      res.body.graphData.values.should.have.lengthOf(queryInterval - 1);
      res.body.graphData.max.should.be.a('number');
      res.body.graphData.min.should.be.a('number');
    });
    it('should respond with an object containing a 404 error code and an error message if the provided symbol is invalid', async () => {
      const res = await chai.request(app).get('/api/crypto/graph/thisCoinDoesNotExist').query({interval: queryInterval});
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
    });
  });
});
