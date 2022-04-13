/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables

const passport = require('passport');
router.use(passport.initialize());

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { jwtOptions, jwtStrategy } = require("./jwt-config.js")
passport.use(jwtStrategy);

const User = require('../../models/User');

router.get('/protected', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      username: req.user.username,
    },
    message:
      "You can access protected content",
  })
})

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({username: username});

  if(!user) {
    res
    .status(401)
    .json({success: false, message: `user not found ${username}.`});
  }

  else{
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if(passwordsMatch) {
      const payload = {user_id: user.user_id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ success: true, username: user.username, token: token });
    } else {
      res.status(401).json({ success: false, message: "passwords did not match" });
    }
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

module.exports = router;

//const LocalStrategy = require('passport-local');
// const crypto = require('crypto');
// this SQL will need to align with our Schemas

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   mongoose.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function(err, row) {
//     if (err) {
//       return cb(err);
//     }
//     if (!row) {
//       return cb(null, false, {message: 'Incorrect username or password.'});
//     }

//     crypto.pbkdf2(password, row.salt, 310000, 32, 'bcrypt', function(err, hashedPassword) {
//       if (err) {
//         return cb(err);
//       }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, {message: 'Incorrect username or password.'});
//       }
//       return cb(null, row);
//     });
//   });
// }));
