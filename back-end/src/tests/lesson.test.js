/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('GET /lesson/:lessonID', () => {
  it('should respond with an object containing the info of one lesson with the specified ID', (done) => {
    chai
        .request(app)
        .get('/lesson/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.keys(['id', 'title', 'content', 'questions']);
          res.body['id'].should.equal(1);
          res.body['questions'].should.be.a('array');
          res.body['questions'].should.have.lengthOf.above(0);
          res.body['questions'][0].should.be.a('object');
          res.body['questions'][0].should.have.keys(['questionNumber', 'questionText', 'answer']);
          done();
        });
  });
  it('should respond with a 404 status code if the specified lesson ID is invalid', (done) => {
    chai.request(app)
        .get('/lesson/invalidID')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.empty;
          done();
        });
  });
  it('should also respond with a 404 status code if the specified lesson ID exceeds the total number of lessons', (done) => {
    chai.request(app)
        .get('/lesson/12')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.empty;
          done();
        });
  });
});

describe('GET /lesson', () => {
  it('should respond with an object containing all lessons and their info', (done) => {
    chai.request(app)
        .get('/lesson')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          Object.keys(res.body).should.have.lengthOf(11);
          done();
        });
  });
});
