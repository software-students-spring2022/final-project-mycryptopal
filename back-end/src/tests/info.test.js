/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Testing /info routes', () => {
  describe('GET /info/faq', () => {
      it("It should GET all the frequent questions", async () => {
      const res = await chai.request(app).get('/info/faq')
      res.should.have.status(200)
      res.body.should.have.property("success")
      res.body.should.have.property("faqs")
  });
})
  //6260ecfe549f5a0ff9a33427
  describe('POST /info/contact', () => {
    it("It should POST the contact information", async () => {
      const contact = {
        name: "test",
        email:  "test@example.com",
        message: "test message",
        user_id: 1,
      }
      const res = await chai.request(app).post('/info/contact').send(contact)
      res.should.have.status(200)
      res.body.should.have.property("success")
    })
  });
});

