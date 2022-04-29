/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Message = require('../models/Message');
chai.use(chaiHttp);

describe('Testing /info routes', () => {
  describe('GET /info/faq', () => {
    it('It should GET all the frequent questions', async () => {
      const res = await chai.request(app).get('/info/faq');
      res.should.have.status(200);
      res.body.should.have.property('success', true);
      res.body.should.have.property('faqs');
      res.body.faqs.should.be.a('array');
    });
  });
  describe('POST /info/contact', () => {
    const contact = {
      name: 'test',
      email: 'test@example.com',
      message: `test message${process.env.CMC_ICON_URL}`,
      user_id: 1,
    };
    it('It should POST the contact information', async () => {
      const res = await chai.request(app).post('/info/contact').send(contact);
      res.should.have.status(200);
      res.body.should.have.property('success');
    });
    after(async () => {
      console.log('Removing test message from database');
      await Message.findOneAndDelete({message: contact.message});
    });
  });
});

