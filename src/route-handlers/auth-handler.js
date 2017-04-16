const jwt       = require("jwt-simple");
const jwtConfig = require("../config/jwt-config").jwtConfig;
const User      = require("../models/user");

module.exports = {
  post(req, res) {
    User.findOne({
      username: req.body.username
    }, (error, user) => {
      if (error) {
        throw error;
      }

      if (!user) {
        res.status(401).send({
          message: "Authentication failed. User not found."
        });
      } else {

        // Compare the password provided by the user with the stored
        // password. Create and return a token if the passwords match.

        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!error && isMatch) {
            let iat = new Date().getTime() / 1000;
            let exp = iat + jwtConfig.tokenExpirationTime;

            let payload = {
              aud: jwtConfig.audience,
              iss: jwtConfig.issuer,
              iat,
              exp,
              sub: user.username
            };

            let token = jwt.encode(payload, jwtConfig.secret);
            res.json({ token: `JWT ${token}` });
          } else {
            res.status(401).send({
              message: "Authentication failed. Wrong password"
            });
          }
        });
      }
    });
  }
};
