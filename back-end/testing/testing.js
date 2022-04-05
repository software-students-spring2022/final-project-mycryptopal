
//boilerplate mocha code from their documentation/class
// use node.js's built-in assert assertion library
const assert = require("assert")
// a set of tests of array functions
describe("Array", function () {
  // one particular unit test
  describe("#indexOf()", function () {
    // assert what should be returned
    it("should return -1 when the value is not present", function () {
      // test that assertion
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})

//boilerplate code of testing routes

describe("GET request to /foo route", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(server)
        .get("/foo")
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          res.body.should.be.a("object") // our route sends back an object
          res.body.should.have.property("success", true) // a way to check the exact value of a property of the response object
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

