/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/User');
const should = chai.should();
chai.use(chaiHttp);

describe('Testing /user routes', () => {
  describe('GET /user/avatar', () => {
    it('should return the URL of the current user\'s profile picture if they have a valid auth token', async () => {
      const res = await chai.request(app).get('/user/avatar').set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.keys(['success', 'url']);
      res.body.success.should.equal(true);
      res.body.url.should.be.a('string');
    });
    it('should respond with a 401 status code if the user\'s token is invalid', async () => {
      const res = await chai.request(app).get('/user/avatar').set('Authorization', `JWT invalidToken`);
      res.should.have.status(401);
    });
    it('should respond with a 401 status code if the user does not have an auth token', async () => {
      const res = await chai.request(app).get('/user/avatar');
      res.should.have.status(401);
    });
  });

  describe('GET /user/info', () => {
    it('should return the info of the current user if they have a valid auth token', async () => {
      const res = await chai.request(app).get('/user/info').set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.include.keys(['username', 'email', 'assets', 'lessonProgress', 'user_id', 'avatar', 'access']);
    });
    it('should respond with a 401 status code if the user\'s token is invalid', async () => {
      const res = await chai.request(app).get('/user/info').set('Authorization', `JWT invalidToken`);
      res.should.have.status(401);
    });
    it('should respond with a 401 status code if the user does not have an auth token', async () => {
      const res = await chai.request(app).get('/user/info');
      res.should.have.status(401);
    });
  });

  describe('GET /user/assets', () => {
    let testUser; let prevAssets;
    const testAssets = {BTC: 13, ETH: 43, DOGE: 512};

    before(async () => {
      testUser = await User.findOne({user_id: 1});
      prevAssets = Object.assign({}, testUser.assets);
      testUser.assets = testAssets;
      testUser.markModified('assets');
      await testUser.save();
    });

    describe('GET /user/assets', () => {
      it('should return the assets of the current user if they have a valid auth token', async () => {
        const res = await chai.request(app).get('/user/assets').set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success', true);
        res.body.should.have.property('assets');
        res.body.assets.should.deep.equal(testAssets);
      });
      it('should respond with a 401 status code if the user\'s token is invalid', async () => {
        const res = await chai.request(app).get('/user/assets').set('Authorization', `JWT invalidToken`);
        res.should.have.status(401);
      });
      it('should respond with a 401 status code if the user does not have an auth token', async () => {
        const res = await chai.request(app).get('/user/assets');
        res.should.have.status(401);
      });
    });

    describe('GET /user/assets/:symbol', () => {
      const testSymbol = 'BTC';
      it('should return the amount of the specified symbol owned by the user if they have a valid auth token', async () => {
        const res = await chai.request(app).get(`/user/assets/${testSymbol}`).set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success', true);
        res.body.should.have.property('amount', testAssets[testSymbol]);
      });
      it('should return a 0 amount if the specified symbol is not in the user\'s assets', async () => {
        const res = await chai.request(app).get(`/user/assets/SHIB`).set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success', true);
        res.body.should.have.property('amount', 0);
      });
      it('should respond with a 401 status code if the user\'s token is invalid', async () => {
        const res = await chai.request(app).get(`/user/assets/${testSymbol}`).set('Authorization', `JWT invalidToken`);
        res.should.have.status(401);
      });
      it('should respond with a 401 status code if the user does not have an auth token', async () => {
        const res = await chai.request(app).get(`/user/assets/${testSymbol}`);
        res.should.have.status(401);
      });
    });

    after(async () => {
      console.log('Revert test user to original state');
      testUser.assets = prevAssets;
      testUser.markModified('assets');
      await testUser.save();
    });
  });

  describe('POST /user/update', () => {
    describe('POST /user/update/avatar', () => {
      it('should successfully update the logged-in user\'s profile picture, given the file uploaded is of image type', async () => {
        const res = await chai
            .request(app)
            .post('/user/update/avatar')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .field({userId: 1})
            .attach('avatar', path.join(__dirname, './resources/avatarValid.png'));
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.key('success');
        res.body.success.should.equal(true);
      });
      it('should respond with a 400 status code if the uploaded file is not an image', async () => {
        const res = await chai
            .request(app)
            .post('/user/update/avatar')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .field({userId: 1})
            .attach('avatar', path.join(__dirname, './resources/avatarInvalid.txt'));
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('Invalid filetype (not an image)');
      });
    });

    describe('POST /user/update/info', () => {
      it('should successfully modify the logged-in user\'s information if all inputs are valid', async () => {
        const userInput = {
          username: 'jsmith',
          email: 'jsmith@mail.com',
          firstName: 'John',
          lastName: 'Smith',
        };
        const res = await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.key('success');
        res.body.success.should.equal(true);
      });
      it('should successfully modify the logged-in user\'s information even if no name fields are provided', async () => {
        const userInput = {
          username: 'jsmith',
          email: 'jsmith@mail.com',
        };
        const res = await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.key('success');
        res.body.success.should.equal(true);
      });
      it('should respond with a 400 status code if the provided username is already associated with another user', async () => {
        const userInput = {
          username: 'testuser2',
          email: 'jsmith@mail.com',
        };
        const res = await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('A user with this username already exists');
      });
      it('should respond with a 400 status code if the provided username is shorter than 6 characters', async () => {
        const userInput = {
          username: 'abcde',
          email: 'jsmith@mail.com',
        };
        const res = await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('Invalid inputs');
      });
      it('should respond with a 400 status code if the provided email is of invalid format', async () => {
        const userInput = {
          username: 'jsmith',
          email: 'invalidEmail',
        };
        const res = await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('Invalid inputs');
      });
      after(async () => {
        console.log('Revert test user to original state');
        const userInput = {
          username: 'testuser',
          email: 'test@mail.com',
          firstName: 'Test',
          lastName: 'User',
        };
        await chai
            .request(app)
            .post('/user/update/info')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
      });
    });

    describe('POST /user/update/credentials', () => {
      it('should successfully modify the logged-in user\'s credentials if all inputs are valid', async () => {
        const userInput = {
          currentPassword: `${process.env.TEST_PASSWORD}`,
          newPassword: `${process.env.TEST_PASSWORD}new`,
          rePassword: `${process.env.TEST_PASSWORD}new`,
        };
        const res = await chai
            .request(app)
            .post('/user/update/credentials')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.key('success');
        res.body.success.should.equal(true);
      });
      it('should respond with a 400 status code if the provided new password is of invalid format - should have no spaces, minimum length of 6, and at least 1 uppercase letter, 1 lowercase letter, and 1 number', async () => {
        const userInput = {
          currentPassword: 'currPass1',
          newPassword: 'invalidpassword',
          rePassword: 'invalidpassword',
        };
        const res = await chai
            .request(app)
            .post('/user/update/credentials')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('Invalid format for new password. Should have no spaces, minimum length of 6, and at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
      });
      it('should respond with a 400 status code if the provided new password does not match the re-entered password', async () => {
        const userInput = {
          currentPassword: 'currPass1',
          newPassword: 'validPassword1',
          rePassword: 'validPassword2',
        };
        const res = await chai
            .request(app)
            .post('/user/update/credentials')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('New password does not match re-entered password.');
      });
      it('should respond with a 401 status code if the provided current password is incorrect', async () => {
        const userInput = {
          currentPassword: 'currPass1',
          newPassword: 'validPassword1',
          rePassword: 'validPassword1',
        };
        const res = await chai
            .request(app)
            .post('/user/update/credentials')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.keys(['success', 'error']);
        res.body.success.should.equal(false);
        res.body.error.should.be.a('string');
        res.body.error.should.equal('Entered current password is incorrect.');
      });
      after(async () => {
        console.log('Revert test user to original state');
        const userInput = {
          currentPassword: `${process.env.TEST_PASSWORD}new`,
          newPassword: `${process.env.TEST_PASSWORD}`,
          rePassword: `${process.env.TEST_PASSWORD}`,
        };
        await chai
            .request(app)
            .post('/user/update/credentials')
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
      });
    });

    describe('POST /user/update/assets/:symbol', () => {
      let testUser; let prevAssets;
      const testAssets = {BTC: 3, ETH: 4, DOGE: 5};
      const testSymbol = 'BTC';

      before(async () => {
        testUser = await User.findOne({user_id: 1});
        prevAssets = Object.assign({}, testUser.assets);
        testUser.assets = testAssets;
        testUser.markModified('assets');
        await testUser.save();
      });

      it('should increase the quantity of a user\'s asset when a postive amount is specified', async () => {
        const userInput = {amount: 2};
        const res = await chai
            .request(app)
            .post(`/user/update/assets/${testSymbol}`)
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.have.property('success', true);
        const updatedAssets = (await User.findOne({user_id: 1})).assets;
        updatedAssets[testSymbol].should.equal(testAssets[testSymbol] + userInput.amount);
      });

      it('should decrease the quantity of a user\'s asset when a negative amount is specified', async () => {
        const userInput = {amount: -2};
        const res = await chai
            .request(app)
            .post(`/user/update/assets/${testSymbol}`)
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.have.property('success', true);
        const updatedAssets = (await User.findOne({user_id: 1})).assets;
        updatedAssets[testSymbol].should.equal(testAssets[testSymbol] + userInput.amount);
      });

      it('should decrease the quantity of a user\'s asset when a negative amount is specified and remove the asset from the user\'s assets if the specified amount is equal to the owned amount', async () => {
        const userInput = {amount: -3};
        const res = await chai
            .request(app)
            .post(`/user/update/assets/${testSymbol}`)
            .set('Authorization', `JWT ${process.env.TEST_AUTH_TOKEN}`)
            .send(userInput);
        res.should.have.status(200);
        res.body.should.have.property('success', true);
        const updatedAssets = (await User.findOne({user_id: 1})).assets;
        updatedAssets.should.not.have.property(testSymbol);
      });

      afterEach(async () => {
        testUser = await User.findOne({user_id: 1});
        testUser.assets = testAssets;
        testUser.markModified('assets');
        await testUser.save();
      });

      after(async () => {
        console.log('Revert test user to original state');
        testUser.assets = prevAssets;
        testUser.markModified('assets');
        await testUser.save();
      });
    });
  });
});
