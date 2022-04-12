/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const {Router} = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

let router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables
const express = require('express');
router = express.Router();

const mongoose = require('mongoose');
// this SQL will need to align with our Schemas

passport.use(new LocalStrategy(function verify(username, password, cb) {
  mongoose.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function(err, row) {
    if (err) {
      return cb(err);
    }
    if (!row) {
      return cb(null, false, {message: 'Incorrect username or password.'});
    }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'bcrypt', function(err, hashedPassword) {
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

router.post('/login', function(req, res) {
  // brab the name and password that were submitted as POST body data
  const username = req.body.username;
  const password = req.body.password;
  // console.log(`${username}, ${password}`)
  if (!username || !password) {
    // no username or password received in the POST body... send an error
    res
        .status(401)
        .json({success: false, message: `no username or password supplied.`});
  }

  // usually this would be a database call, but here we look for a matching user in our mock data
  const user = users[_.findIndex(users, {username: username})];
  if (!user) {
    // no user found with this name... send an error
    res
        .status(401)
        .json({success: false, message: `user not found: ${username}.`});
  }

  // assuming we found the user, check the password is correct
  // we would normally encrypt the password the user submitted to check it against an encrypted copy of the user's password we keep in the database... but here we just compare two plain text versions for simplicity
  else if (req.body.password == user.password) {
    // the password the user entered matches the password in our "database" (mock data in this case)
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = {id: user.id}; // some data we'll encode into the token
    const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
    res.json({success: true, username: user.username, token: token}); // send the token to the client to store
  } else {
    // the password did not match
    res.status(401).json({success: false, message: 'passwords did not match'});
  }
});


router.get('/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    // our jwt passport config will send error responses to unauthenticated users will
    // so we only need to worry about sending data to properly authenticated users!

      res.json({
        success: true,
        user: {
          id: req.user.id,
          username: req.user.username,
        },
        message:
        'Congratulations: you have accessed this route because you have a valid JWT token!',
      });
    }
);


router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/logout', function(req, res) {
  // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
  res.json({
    success: true,
    message:
      'There is actually nothing to do on the server side... you simply need to delete your token from the browser\'s local storage!',
  });
});

module.exports = router;
