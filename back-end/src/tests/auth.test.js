/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const User = require('../models/User');

describe('Testing /auth routes', () => {
    let testUser;
    before(async () => {
        testUser = await User.findOne({user_id: 1}, {__v: 0, _id: 0});
    })
    describe('GET /auth/protected', () => {
        it('should return a 200 status code and an object containing the user\'s id and username, if the user has a valid authorization token', async () => {
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
    });
});