/* eslint no-unused-vars: "off", no-undef: "off", max-len: "off" */
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Testing /info routes', () => {
  describe('GET /info/faq', () => {
      it("It should GET all the frequent questions", (done) => {
        chai.request(app)
            .get("/info/faq")
            .end((err, response) => {
              response.should.have.status(200)
              response.should.have.property("success")
              response.should.have.property("faqs")
            })
            done()
      })
      
  });
  //6260ecfe549f5a0ff9a33427
  describe('POST /info/contact', async () => {
    it("It should POST the contact information", (done) => {
      const contact = {
        name: "test",
        email:  "test@example.com",
        message: "test message",
        user_id: 1,
      }
      chai.request(app)
          .post("/info/contact")
          .send(contact)
          .end((err, response) => {
            response.should.have.status(200)
            response.should.have.property("success")
          })
        done()
    })
  });
});

