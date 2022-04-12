/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const {Router} = require('express');
let router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
const {from, to, transformData} = require('../../lib');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables


const express = require('express');

router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
