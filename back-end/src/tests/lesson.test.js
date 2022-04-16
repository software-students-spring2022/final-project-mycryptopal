/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Testing /lesson routes', () => {
  describe('GET /lesson/count', () => {
    it('should respond with an object containing the total number of available lessons', async () => {
      const res = await chai.request(app).get('/lesson/count');
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'count']);
      res.body.success.should.equal(true);
      res.body.count.should.be.a('number');
      res.body.count.should.equal(11);
    });
  });

  describe('GET /lesson/id/:lessonId', () => {
    it('should respond the lesson corresponding to the specified id, given that the id is valid', async () => {
      const res = await chai.request(app).get('/lesson/id/1');
      res.should.have.status(200);
      res.should.be.a('object');
      res.body.should.have.keys(['id', 'title', 'content', 'questions']);
      res.body.id.should.equal(1);
      res.body.title.should.be.a('string');
      res.body.content.should.be.a('string');
      res.body.questions.should.be.a('array');
      res.body.questions.should.not.be.empty;
      for (const question of res.body.questions) {
        question.should.have.keys(['number', 'text', 'answer']);
        question.number.should.be.a('number');
        question.text.should.be.a('string');
        question.answer.should.be.a('string');
      }
    });
    it('should respond with a 400 status code if the specified lesson ID is invalid', async () => {
      const res = await chai.request(app).get('/lesson/id/invalidId');
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
      res.body.error.should.equal('Invalid lesson ID');
    });
    it('should respond with a 404 status code if the specified lesson ID exceeds the total number of available lessons', async () => {
      const res = await chai.request(app).get('/lesson/id/12');
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.be.keys(['success', 'error']);
      res.body.success.should.equal(false);
      res.body.error.should.be.a('string');
      res.body.error.should.equal('Lesson not found');
    });
  });
});
