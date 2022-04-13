const path = require('path');
require('dotenv').config({
    silent: true, path: path.join(__dirname, '.env'),
});
const User = require('./models/User');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'test';

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    const user = await User.findOne({user_id: jwt_payload.user_id});
    if(user) {
        next(null, user);
    }
    else{
        next(null, false);
    }
});

module.exports = {
    jwtOptions,
    jwtStrategy
}