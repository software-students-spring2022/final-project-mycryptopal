/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const User = require('../../models/User');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  const user = await User.findOne({user_id: jwt_payload.user_id}, {_id: 0, __v: 0, password: 0});
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
