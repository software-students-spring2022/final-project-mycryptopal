/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const {Router} = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../routes/Auth/mongoose');

let router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables
const express = require('express');
router = express.Router();

// this SQL will need to align with our Schemas

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function(err, row) {
    if (err) {
      return cb(err);
    }
    if (!row) {
      return cb(null, false, {message: 'Incorrect username or password.'});
    }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) {
        return cb(err);
      }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, {message: 'Incorrect username or password.'});
      }
      return cb(null, row);
    });
  });
}));

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;
