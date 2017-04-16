const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const jwtConfig   = require("../config/jwt-config").jwtConfig;
const User        = require("../models/user");

function strategy() {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtConfig.secret
  };

  return new JwtStrategy(ops, (jwt_payload, done) => {
    console.log(`PAYLOAD: ${jwt_payload}`);

    User.findOne({ id: jwt_payload.sub }, (error, user) => {
      if (error) {
        return done(error, false);
      }
      
      if (user) {
        done(null, user);
      } else {
        done(null, false, "User token not found.");
      }
    });
  });
}

module.exports = (passport) => {
  passport.use(strategy);
};
