/* eslint-disable max-len */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables

const passport = require('passport');
router.use(passport.initialize());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtOptions, jwtStrategy} = require('./jwt-config.js');
passport.use(jwtStrategy);

const User = require('../../models/User');
const {userValidationRules, validate} = require('./validator.js');


router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.user_id,
      username: req.user.username,
    },
    message:
      'You can access protected content',
  });
});

router.post('/register', userValidationRules(), validate, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const reenter = req.body.reenter;

  const duplicateUsers = await User.find({username: username});

  if (duplicateUsers.length > 0) {
    res.status(400).json({success: false, error: 'A user with this username already exists'});
  } else {
    if (password !== reenter) {
      res.status(401).json({success: false, error: `Re-entered password does not match`});
    } else {
      const passwordSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, passwordSalt);
      const userNum = await User.countDocuments();

      const registeredUser = new User({
        user_id: userNum + 1,
        username: username,
        password: hashedPassword,
        email: email,
        assets: {},
      });

      try {
        await registeredUser.save();
        res.json({success: true});
      } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: 'Server error'});
      }
    }
  }
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({username: username});

  if (!user) {
    res.status(401).json({success: false, error: `User not found - ${username}.`});
  } else {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const payload = {user_id: user.user_id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({success: true, username: user.username, token: token});
    } else {
      res.status(401).json({success: false, error: 'Password is incorrect'});
    }
  }
});

router.get('/logout', function(req, res) {
  res.json({
    success: true,
    message:
      'Logout successful',
  });
});

module.exports = router;
