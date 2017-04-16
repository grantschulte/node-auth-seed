/* jshint camelcase: false */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const jwtConfig   = require("../config/jwt-config").jwtConfig;
const User        = require("../models/user");

module.exports = (passport) => {
  let opts = {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtConfig.secret
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.sub }, (error, user) => {
      if (error) {
        return done(error, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false, "User token not found or is not matching.");
      }
    });
  }));
};
