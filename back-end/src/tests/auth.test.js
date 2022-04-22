/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const User = require('../models/User');

describe('Testing /auth routes', () => {
  describe('GET /auth/protected', () => {
    it('should return a 200 status code and an object containing the user\'s id and username, if the user has a valid authorization token', async () => {
      const testUser = await User.findOne({user_id: 1}, {__v: 0, _id: 0});
      const res = await chai.request(app).get('/auth/protected').set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.include.keys(['success', 'user']);
      res.body.success.should.equal(true);
      res.body.user.should.be.a('object');
      res.body.user.should.have.keys(['id', 'username']);
      res.body.user.id.should.equal(testUser.user_id);
      res.body.user.username.should.equal(testUser.username);
    });
    it('should return a 401 status code if the user has an invalid authorization token', async () => {
      const res = await chai.request(app).get('/auth/protected').set('Authorization', `JWT invalidToken`);
      res.should.have.status(401);
    });
  });

  describe('POST /auth/register', () => {
    let userInput;
    beforeEach(() => {
      userInput = {
        username: 'testRegisterUser',
        email: 'example@mail.com',
        password: 'Password123',
        reenter: 'Password123',
      };
    });
    it('should return a 400 status code if the format of the user provides an invalid username (length < 6)', async () => {
      userInput.username = 'short';
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('errors');
      res.body.errors.should.be.a('array');
    });
    it('should return a 400 status code if the format of the user provides an invalid email', async () => {
      userInput.email = 'invalid';
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('errors');
      res.body.errors.should.be.a('array');
    });
    it('should return a 400 status code if the format of the user provides an invalid password', async () => {
      userInput.password = '1upper1lower1numberlength6';
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('errors');
      res.body.errors.should.be.a('array');
    });
    it('should return a 400 status code if there is already another registered user with the provided username', async () => {
      userInput.username = 'testuser';
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('error', 'A user with this username already exists');
    });
    it('should return a 401 status code if the re-entered password does not match the provided password', async () => {
      userInput.reenter = 'Password1234';
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('error', 'Re-entered password does not match');
    });
    it('should return a 200 status code if a new user was successfully registered', async () => {
      const res = await chai.request(app).post('/auth/register').send(userInput);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success', true);
      const registeredUser = await User.findOne({username: userInput.username});
      registeredUser.should.be.a('object');
    });
    after(async () => {
      console.log('Remove test user from database');
      await User.findOneAndDelete({username: 'testRegisterUser'});
    });
  });

  describe('POST /auth/login', () => {
    let userInput;
    beforeEach(() => {
      userInput = {
        username: 'testuser',
        password: process.env.TEST_PASSWORD,
      };
    });
    it('should return a 200 status code, an username, and an authorization token if login was successful', async () => {
      const res = await chai.request(app).post('/auth/login').send(userInput);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success', true);
      res.body.should.include.keys(['username', 'token']);
    });
    it('should return a 401 status code if an user with the provided username does not exist', async () => {
      userInput.username = (Math.random() * 500).toString();
      const res = await chai.request(app).post('/auth/login').send(userInput);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('error');
    });
    it('should return a 401 status code if the provided password is incorrect', async () => {
      userInput.password = (Math.random() * 500).toString();
      const res = await chai.request(app).post('/auth/login').send(userInput);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('success', false);
      res.body.should.have.property('error');
    });
  });

  describe('GET /auth/logout', () => {
    it('should return a 200 status code', async () => {
      const res = await chai.request(app).get('/auth/logout');
      res.should.have.status(200);
      res.body.should.have.property('success', true);
    });
  });
});
