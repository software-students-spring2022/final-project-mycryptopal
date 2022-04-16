/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

// GET /user/avatar/:userId
// POST /user/update/avatar
// GET /user/info
// POST /user/update/info
// POST /user/update/credentials

// describe('GET /user/data', () => {
//   it('should respond with an object containing user information - their id, first name, last name, username, and email', (done) => {
//     chai
//         .request(app)
//         .get('/user/data')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.all.keys('id', 'firstName', 'lastName', 'username', 'email');
//           res.body['id'].should.be.a('number');
//           Object.keys(res.body).slice(1).forEach((prop) => {
//             res.body[prop].should.be.a('string');
//           });
//           done();
//         });
//   });
// });

// describe('GET /user/assets', () => {
//   it('should respond with an object containing the user\'s assets and the quantity of each asset as a number', (done) => {
//     chai
//         .request(app)
//         .get('/user/assets')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           Object.keys(res.body).forEach((asset) => {
//             res.body[asset].should.be.a('number');
//           });
//           done();
//         });
//   });
// });

// describe('POST /user/contact', () => {
//   it('should redirect the user to the contact page once the message has been received and processed by server', (done) => {
//     chai.request(app).post('/user/contact').type('form')
//         .send({
//           'contact-name': 'John Smith',
//           'contact-email': 'jsmith@mail.com',
//           'contact-message': 'This is a message.',
//         }).end((err, res) => {
//           res.should.redirectTo('http://localhost:3000/contact');
//           done();
//         });
//   });
// });

