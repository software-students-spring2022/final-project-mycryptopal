const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);


// Reserved for login/registration/authentication/etc.